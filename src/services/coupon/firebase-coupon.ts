import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import { db } from '@/config/firebase';

export type CouponRecord = {
  couponID?: string;
  couponCode: string;
  couponName?: string;
  couponAmount: string | number; // stored as string in Firestore
  couponAmountDetails: 'percentage' | 'fixed' | string;
  couponExpireDate?: string; // e.g., YYYY-MM-DD
  couponStatus: 'Active' | 'Inactive' | string;
};

export async function fetchCouponByCode(code: string): Promise<CouponRecord | null> {
  const couponsRef = collection(db, 'Coupon');
  const q = query(couponsRef, where('couponCode', '==', code), limit(1));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0].data() as CouponRecord;
  return d || null;
}

export function isCouponActive(coupon?: CouponRecord | null): boolean {
  if (!coupon) return false;
  if (String(coupon.couponStatus).toLowerCase() !== 'active') return false;
  if (coupon.couponExpireDate) {
    try {
      const today = new Date();
      const end = new Date(coupon.couponExpireDate);
      if (isFinite(end.getTime()) && end.getTime() < today.setHours(0, 0, 0, 0)) {
        return false;
      }
    } catch (_) {
      // ignore invalid dates
    }
  }
  return true;
}

export function computeCouponDiscount(orderTotal: number, coupon: CouponRecord): number {
  const amount = Number(coupon.couponAmount || 0);
  const type = String(coupon.couponAmountDetails || '').toLowerCase();
  if (!isFinite(amount) || amount <= 0) return 0;
  if (type === 'percentage' || type === 'percent') {
    return Math.max(0, Math.min(orderTotal, (orderTotal * amount) / 100));
  }
  // fixed amount
  return Math.max(0, Math.min(orderTotal, amount));
}

export async function fetchActiveCoupons(): Promise<CouponRecord[]> {
  const couponsRef = collection(db, 'Coupon');
  const q = query(couponsRef, where('couponStatus', '==', 'Active'));
  const snap = await getDocs(q);
  const list: CouponRecord[] = [];
  snap.forEach((d) => list.push(d.data() as CouponRecord));
  // Filter by active and not expired using helper
  return list.filter((c) => isCouponActive(c));
}


