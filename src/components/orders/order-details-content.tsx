import usePrice from '@/services/product/use-price';
import { DEFAULT_CURRENCY } from '@/utils/currency';
import Image from '@/components/shared/image';

export const OrderDetailsContent: React.FC<{ item?: any }> = ({ item }) => {
  const { price } = usePrice({
    amount: item.price,
    currencyCode: DEFAULT_CURRENCY,
  });
  return (
    <div className="relative grid grid-cols-12 py-2 pb-0 border-b border-solid border-border-base text-[12px] md:text-[14px]">
      <div className="self-center col-span-2">
        <Image
          src={item?.image?.thumbnail}
          alt={item?.name || 'Product Image'}
          width={60}
          height={60}
          className="object-cover"
        />
      </div>
      <div className="self-center col-span-5">
        <div className="flex flex-col gap-1">
          <h2 className="text-brand-dark">{item.name}</h2>
          {/* Show color name and circle if the item has color variation */}
          {item?.color && (
            <div className="flex items-center gap-2">
              <span
                className="inline-block w-3 h-3 rounded-full border border-brand-dark/10"
                style={{ backgroundColor: item.color.toLowerCase() }}
              />
              <span className="text-xs text-gray-500">
                {item?.colorDisplayName || item?.colorName || item.color}
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="self-center col-span-3 text-center md:ltr:text-left md:rtl:text-right">
        {typeof item.quantity === 'number' && <p>{item.quantity} x</p>}
      </div>
      <div className="self-center col-span-2">
        {typeof item.price === 'number' && <p>{price}</p>}
      </div>
    </div>
  );
};
