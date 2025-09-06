

import Container from '@/components/shared/container';
import { useResetCart } from '@/contexts/cart/cartActions';
import { useEffect, useMemo, useRef } from 'react';
import Link from '@/components/shared/link';
import dayjs from 'dayjs';
import { ROUTES } from '@/utils/routes';
import { useLocation } from 'react-router-dom';
import { IoPrint } from 'react-icons/io5';
import { DEFAULT_CURRENCY, DEFAULT_LOCALE } from '@/utils/currency';

export default function OrderConfirmationContent() {
  const resetCart = useResetCart();
  useEffect(() => {
    resetCart();
  }, [resetCart]);
  // Pull order data from navigation state if available
  const location = useLocation() as any;
  const order = location?.state?.order || {};

  const orderId: string = order?.OrderID || order?.id || '';
  const rawProducts: any[] = Array.isArray(order?.dimensions)
    ? order.dimensions
    : (Array.isArray(order?.products) ? order.products : []);

  const products = (rawProducts || []).map((p: any) => {
    const qty = Number(p.p_qty ?? p.quantity ?? 1);
    const price = Number(p.p_price ?? p.price ?? 0);
    return {
      name: p.p_name ?? p.name ?? 'Product',
      qty: isFinite(qty) ? qty : 1,
      price: isFinite(price) ? price : 0,
      image: p.image?.thumbnail || p.image?.original || p.imageUrl || p.thumbnail || '',
      // Preserve color information from cart items
      color: p.color || '',
      colorName: p.colorName || '',
      colorDisplayName: p.colorDisplayName || p.colorName || '',
    };
  });

  const createdAt = order?.createdAt?.toDate ? order.createdAt.toDate() : (order?.createdAt || new Date());
  const deliveryTimeStr = useMemo(() => dayjs(createdAt).add(7, 'day').format('D MMM, YYYY'), [createdAt]);

  const computedSubtotal = products.reduce((sum: number, p: any) => sum + p.price * p.qty, 0);
  const subtotal = typeof order?.total === 'number' ? order.total : computedSubtotal;
  const shipping = typeof order?.delivery_fee === 'number' ? order.delivery_fee : 0;
  const orderTotal = typeof order?.orderTotal === 'number' ? order.orderTotal : Math.max(0, subtotal - (Number(order?.discount) || 0));

  const format = (n: number) => n.toLocaleString(DEFAULT_LOCALE, { style: 'currency', currency: DEFAULT_CURRENCY });
  const customerName: string = order?.dropoff_location?.consignee || 'Customer';
  const summaryRef = useRef<HTMLDivElement | null>(null);
  const onPrint = () => {
    const node = summaryRef.current;
    if (!node) { try { window.print(); } catch (_) {} return; }
    const printWindow = window.open('', '_blank', 'width=900,height=1000');
    if (!printWindow) return;
    const html = `<!doctype html><html><head><title>Order Summary ${orderId ? `#${orderId}` : ''}</title>
      <meta charset="utf-8" />
      <style>
        body{font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,\"Noto Sans\",sans-serif;color:#111827;padding:24px}
        .card{max-width:720px;margin:0 auto}
        img{border-radius:6px;object-fit:cover}
      </style>
    </head><body><div class="card">${node.innerHTML}</div></body></html>`;
    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
      <Container>
      <div className="py-10">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-6">
          {/* Left - Thank You */}
          <div className="bg-white border border-border-base rounded-md p-6 md:p-8">
            <h1 className="text-xl md:text-2xl font-semibold text-brand-dark mb-2">Thank you {customerName}!</h1>
            {orderId && (
              <p className="text-sm text-brand-dark/80 mb-6">
                Your order number is <span className="font-medium">{orderId}</span>
              </p>
            )}
            <p className="text-sm leading-7 text-brand-dark/80 mb-10">
              An email will be sent containing information about your purchase. If you have any questions about your
              purchase, email us at <a href="mailto:yourexample@email.com" className="text-[#3B3310] hover:underline">nutanoverseas@email.com</a>
              {' '}or call us at <a href="tel:(1800)-000-6890" className="text-[#3B3310] hover:underline">(1800)-000-6890</a>.
            </p>
            <div className="mt-2">
              <Link to={ROUTES.HOME} className="py-3 px-4 ml-3 bg-[#3B3310] text-white hover:text-white rounded-lg">CONTINUE SHOPPING</Link>
              <Link to={ROUTES.ORDERS} className="py-3 px-4 ml-3 border-gray-300 border-1 text-black hover:text-black rounded-lg">My Orders</Link>
            </div>
          </div>

          {/* Right - Order Summary */}
          <div ref={summaryRef} className="bg-white border border-border-base rounded-md p-0">
            <div className="flex items-center justify-between w-full border-b px-5 md:px-6 py-3 border-border-base">
              <h2 className="text-base font-medium text-brand-dark">Order Summary</h2>
              <button onClick={onPrint} className="text-sm px-3 py-1 rounded bg-[#3B3310] text-white inline-flex items-center"><IoPrint className="w-4 h-4 mr-2"/>Print</button>
            </div>
            <div className="p-5 md:p-6 space-y-4">
              {products.map((p: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {p.image ? (
                      <img src={p.image} alt={p.name} width={48} height={48} className="w-12 h-12 rounded object-cover" />
                    ) : (
                      <div className="w-12 h-12 rounded bg-gray-200"/>
                    )}
                    <div className="text-sm text-brand-dark">
                      <div className="font-medium">{p.qty} x {p.name}</div>
                      {/* Show color name and circle if the item has color variation */}
                      {p.color && (
                        <div className="flex items-center gap-1 mt-1">
                          <span
                            className="inline-block w-2 h-2 rounded-full border border-brand-dark/10"
                            style={{ backgroundColor: p.color.toLowerCase() }}
                          />
                          <span className="text-xs text-gray-500">
                            {p.colorDisplayName || p.colorName || p.color}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-brand-dark">{format(p.price * p.qty)}</div>
                </div>
              ))}

              <div className="border-t pt-4 space-y-2 text-brand-dark">
                <div className="flex justify-between">
                  <span className="opacity-70">Subtotal</span>
                  <span className="font-medium">{format(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-70">Shipping</span>
                  <span className="font-medium">{format(shipping)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-70">Delivery time</span>
                  <span className="font-medium">{deliveryTimeStr}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold">Order total</span>
                  <span className="text-2xl font-bold">{format(orderTotal)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </Container>
  );
}
