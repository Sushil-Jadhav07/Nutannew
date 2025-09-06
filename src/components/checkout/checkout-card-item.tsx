import { Item } from '@/contexts/cart/cartUtils';
import Image from '@/components/shared/image';
import usePrice from '@/services/product/use-price';
import { DEFAULT_CURRENCY } from '@/utils/currency';
import React from "react";

export const CheckoutItem: React.FC<{ item: Item }> = ({ item }) => {
  const { price } = usePrice({
    amount: item.itemTotal,
    currencyCode: DEFAULT_CURRENCY,
  });
  return (
    <div className="flex items-center  ">
      <div className="flex w-16 h-16 border rounded-md border-border-base shrink-0">
        <Image
          src={item.image}
          alt={'item image'}
          className="rounded-md"
          width={64}
          height={64}
        />
      </div>
        <h6 className="font-normal text-15px text-brand-dark ltr:pl-3 rtl:pr-3">
            <span className="font-medium">{item.quantity} x </span>
            <div className="flex flex-col gap-1">
                <span>{item.name}</span>
                {/* Show color name and circle if the item has color variation */}
                {item?.color && (
                    <div className="flex items-center gap-1">
                        <span
                            className="inline-block w-2 h-2 rounded-full border border-brand-dark/10"
                            style={{ backgroundColor: item.color.toLowerCase() }}
                        />
                        <span className="text-xs text-gray-500">
                            {item?.colorDisplayName || item?.colorName || item.color}
                        </span>
                    </div>
                )}
            </div>
        </h6>
        <div className="w-24 text-end font-semibold ltr:ml-auto rtl:mr-auto text-15px text-brand-dark ltr:pl-2 rtl:pr-2 shrink-0">
        {price}
      </div>
    </div>
  );
};
