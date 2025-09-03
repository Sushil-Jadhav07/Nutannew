import { useEffect, useState } from 'react';
import { fetchActiveCoupons, CouponRecord } from '@/services/coupon/firebase-coupon';

const CouponSuggestions: React.FC<{ onApply: (code: string) => void; appliedCode?: string; }>
  = ({ onApply, appliedCode }) => {
  const [coupons, setCoupons] = useState<CouponRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const list = await fetchActiveCoupons();
        if (mounted) setCoupons(list.slice(0, 5));
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  if (loading) return null;
  if (!coupons.length) return null;

  return (
    <div className="mt-3 bg-gray-100 rounded-md p-3">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="text-sm underline text-gray-800"
      >
        {open ? 'Hide Coupons' : 'Show Coupons'}
      </button>
      {open && (
        <div className="mt-3 space-y-2">
          {coupons.map((c, idx) => {
            const isPercent = String(c.couponAmountDetails).toLowerCase() === 'percentage' || String(c.couponAmountDetails).toLowerCase() === 'percent';
            const offText = isPercent ? `${c.couponAmount}% off` : `$${c.couponAmount} off`;
            const isApplied = appliedCode && appliedCode.toLowerCase() === String(c.couponCode).toLowerCase();
            return (
              <div key={idx} className="flex items-center justify-between bg-white rounded-md px-4 py-3 border">
                <div>
                  <div className="text-sm font-semibold text-gray-900">{c.couponCode}</div>
                  <div className="text-xs text-gray-600">{offText}</div>
                </div>
                <button
                  type="button"
                  onClick={() => onApply(String(c.couponCode))}
                  disabled={!!isApplied}
                  className={`px-3 py-1.5 text-xs rounded ${isApplied ? 'bg-gray-300 text-gray-700' : 'bg-[#3B3310] text-white hover:bg-black/90'}`}
                >
                  {isApplied ? 'Applied' : 'Apply'}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CouponSuggestions;


