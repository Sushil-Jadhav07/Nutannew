import { collection, getDocs, query, where, DocumentData, QuerySnapshot, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/config/firebase';

// Types expected by UI components (order-table and order-drawer)
export interface OrderProductItem {
  id: string | number;
  name: string;
  image: { thumbnail: string; original?: string; original2?: string };
  price: number;
  quantity: number;
}

export interface OrderStatusType {
  name: string;
  color?: string;
  serial?: number;
}

export interface UserOrder {
  id: string;
  tracking_number: string;
  status?: OrderStatusType;
  created_at?: string | number | Date;
  delivery_time?: string;
  products: OrderProductItem[];
  total: number;
  orderTotal?: number;
  shipping_fee?: number; // For price totals component
  delivery_fee?: number; // Drawer also reads delivery_fee
  discount?: number;
  payment_gateway?: string;
  shipping_address?: any; // string or object (for formatLocation helper)
  customer?: { id?: string | number; email?: string };
  orderStatus?: string;
  dropoff_location?: any;
  deliveryCost?: number;
  hiddenForUser?: boolean;
}

// Transform a Firestore order doc to the shape our UI expects
const transformOrder = (doc: DocumentData): UserOrder => {
  const data = doc.data() || {};

  // Handle createdAt (Timestamp | number | string)
  let createdAt: string | number | Date | undefined = undefined;
  const rawCreated = data.createdAt ?? data.created_at;
  if (rawCreated?.toDate) {
    createdAt = rawCreated.toDate();
  } else if (typeof rawCreated === 'number') {
    createdAt = new Date(rawCreated);
  } else if (typeof rawCreated === 'string') {
    createdAt = rawCreated;
  }

  // Normalize products
  const products: OrderProductItem[] = Array.isArray(data.products)
    ? data.products.map((p: any, idx: number) => ({
      id: p.id ?? `${doc.id}-${idx}`,
      name: p.name ?? 'Product',
      image: {
        thumbnail: p.image?.thumbnail ?? p.imageUrl ?? p.thumbnail ?? '',
        original: p.image?.original ?? p.imageUrl ?? p.thumbnail ?? '',
        original2: p.image?.original2 ?? p.imageUrl ?? p.thumbnail ?? '',
      },
      price: Number(p.price ?? 0),
      quantity: Number(p.quantity ?? 1),
    }))
    : [];

  const shippingFee = Number(data.shipping_fee ?? data.delivery_fee ?? data.deliveryCost ?? 0);
  const orderTotal = Number(data.orderTotal ?? data.total ?? 0);
  const orderStatus = data.orderStatus ?? data.status?.name ?? undefined;

  // Build shipping address from dropoff_location if present
  let shippingAddress: any = data.shipping_address ?? data.shippingAddress ?? undefined;
  // Prefer dropoff_location.address fields
  const dlAddress = data.dropoff_location?.address;
  if (dlAddress) {
    const parts = [dlAddress.address, dlAddress.city, dlAddress.region, dlAddress.zip].filter(Boolean);
    const line = parts.join(', ');
    shippingAddress = line || shippingAddress;
  } else if (shippingAddress && typeof shippingAddress === 'string') {
    // Normalize plain string to object if needed by consumers
    shippingAddress = { street_address: shippingAddress };
  }

  return {
    id: doc.id,
    tracking_number: data.trackingNumber ?? data.tracking_number ?? doc.id,
    status: data.status ? {
      name: data.status.name ?? String(data.status),
      color: data.status.color,
      serial: data.status.serial,
    } : undefined,
    created_at: createdAt,
    delivery_time: data.delivery_time ?? data.deliveryTime ?? '',
    products,
    total: Number(data.total ?? 0),
    orderTotal,
    shipping_fee: shippingFee,
    delivery_fee: shippingFee, // keep both keys for UI compatibility
    deliveryCost: Number(data.deliveryCost ?? shippingFee),
    discount: typeof data.discount === 'number' ? data.discount : undefined,
    payment_gateway: data.payment_gateway ?? data.paymentGateway,
    shipping_address: shippingAddress,
    customer: data.customer ?? { id: data.userId, email: data.userEmail },
    orderStatus,
    dropoff_location: data.dropoff_location,
    hiddenForUser: data.hiddenForUser === true,
  };
};

// Fetch orders for a specific user (by uid)
export const fetchOrdersByUser = async (userId: string): Promise<UserOrder[]> => {
  try {
    const ordersRef = collection(db, 'Order');
    // Avoid composite index requirement by sorting client-side
    const snapshot: QuerySnapshot = await getDocs(query(ordersRef, where('userId', '==', userId)));

    if (snapshot.empty) return [];

    const orders: UserOrder[] = [];
    snapshot.forEach((d) => orders.push(transformOrder(d)));

    // Sort by created_at desc (handles Date/string/number)
    orders.sort((a, b) => {
      const ta = (a.created_at instanceof Date) ? a.created_at.getTime() : new Date(a.created_at as any).getTime();
      const tb = (b.created_at instanceof Date) ? b.created_at.getTime() : new Date(b.created_at as any).getTime();
      return tb - ta;
    });

    // Hide orders that user cancelled
    const visibleOrders = orders.filter((o) => o.hiddenForUser !== true);

    return visibleOrders;
  } catch (err) {
    console.error('Error fetching user orders from Firebase:', err);
    return [];
  }
};

// Fetch orders for a specific customer email (preferred for this app)
export const fetchOrdersByCustomerEmail = async (email: string): Promise<UserOrder[]> => {
  try {
    console.log('[orders] fetching by email from collection "Order":', email);
    const ordersRef = collection(db, 'Order');
    const fields = ['customerEmail', 'userEmail', 'email', 'customer.email'];

    const orders: UserOrder[] = [];

    // Try each field until one returns results
    let matched = false;
    for (const field of fields) {
      const snap = await getDocs(query(ordersRef, where(field as any, '==', email)));
      console.log(`[orders] queried Order where ${field}==${email}; count=${snap.size}`);
      if (!snap.empty) {
        snap.forEach((d) => orders.push(transformOrder(d)));
        matched = true;
        break;
      }
    }

    if (!matched) return [];

    // Sort by created_at desc on client
    orders.sort((a, b) => {
      const ta = (a.created_at instanceof Date) ? a.created_at.getTime() : new Date(a.created_at as any).getTime();
      const tb = (b.created_at instanceof Date) ? b.created_at.getTime() : new Date(b.created_at as any).getTime();
      return tb - ta;
    });

    const visibleOrders = orders.filter((o) => o.hiddenForUser !== true);

    return visibleOrders;
  } catch (err) {
    console.error('Error fetching orders by customerEmail from Firebase:', err);
    return [];
  }
};

// Mark an order as cancelled and hide it from the user's list (but keep in Firestore)
export const cancelOrder = async (orderId: string): Promise<boolean> => {
  try {
    const ref = doc(db, 'Order', orderId);
    await updateDoc(ref, {
      orderStatus: 'cancelled',
      status: { name: 'cancelled', color: '#F35C5C', serial: 999 },
      hiddenForUser: true,
      cancelledAt: serverTimestamp(),
    });
    return true;
  } catch (err) {
    console.error('Error cancelling order in Firebase:', err);
    return false;
  }
};

// Create a return/report request for an order
export const createOrderReturnRequest = async (payload: {
  orderId: string;
  tracking_number: string;
  reason: string;
  notes?: string;
  images?: string[];
  type?: 'return' | 'issue';
}): Promise<boolean> => {
  try {
    const col = collection(db, 'OrderReturnRequests');
    // We use add with auto-id
    const docRef = await import('firebase/firestore').then(m => m.addDoc(col, {
      createdAt: serverTimestamp(),
      orderId: payload.orderId,
      tracking_number: payload.tracking_number,
      reason: payload.reason,
      notes: payload.notes ?? '',
      images: Array.isArray(payload.images) ? payload.images : [],
      status: 'requested',
      type: payload.type ?? 'return',
    }));
    return !!docRef;
  } catch (err) {
    console.error('Error creating OrderReturnRequests entry:', err);
    return false;
  }
};
