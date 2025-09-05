import usePrice from '@/services/product/use-price';
import { calculateTotal } from '@/contexts/cart/cartUtils';
import { DEFAULT_CURRENCY } from '@/utils/currency';

export const TotalPrice: React.FC<{ items?: any }> = ({ items }) => {
  const { price } = usePrice({
    amount: Math.round(
      calculateTotal(items?.products) + items?.delivery_fee - items?.discount,
    ),
    currencyCode: DEFAULT_CURRENCY,
  });
  return <span className="total_price">{price}</span>;
};

export const DiscountPrice = (discount: any) => {
  const { price } = usePrice({
    amount: discount?.discount,
    currencyCode: DEFAULT_CURRENCY,
  });
  return <>-{price}</>;
};

export const DeliveryFee = (delivery: any) => {
  const { price } = usePrice({
    amount: delivery?.delivery,
    currencyCode: DEFAULT_CURRENCY,
  });
  return <>{price}</>;
};

export const SubTotalPrice: React.FC<{ items?: any }> = ({ items }) => {
  const { price } = usePrice({
    amount: calculateTotal(items),
    currencyCode: DEFAULT_CURRENCY,
  });
  return <>{price}</>;
};
