import { formatLocation } from '@/utils/format-location';
import Heading from '@/components/shared/heading';
import { IoClose } from 'react-icons/io5';
import { DEFAULT_CURRENCY } from '@/utils/currency';
import OrderStatus from './order-status';
import { DeliveryFee, DiscountPrice, SubTotalPrice, TotalPrice } from '@/components/orders/price';
import usePrice from '@/services/product/use-price';
import { OrderDetailsContent } from '@/components/orders/order-details-content';
import { useModalAction, useModalState } from '@/components/common/modal/modalContext';

const OrderDetailsModal: React.FC = () => {
  const { data } = useModalState();
  const { closeModal } = useModalAction();
  const shipping_address = data?.shipping_address;
  const drop = data?.dropoff_location?.address;
  const addressLine = drop
    ? [drop.address, drop.city, drop.region, drop.zip].filter(Boolean).join(', ')
    : (typeof shipping_address === 'string' ? shipping_address : formatLocation(shipping_address));

  // Subtotal should reflect orderTotal from order (fallback to total)
  const orderSubtotalAmount = typeof data?.orderTotal === 'number' ? data.orderTotal : (typeof data?.total === 'number' ? data.total : 0);
  const { price: orderSubtotal } = usePrice({ amount: orderSubtotalAmount, currencyCode: DEFAULT_CURRENCY });
  const deliveryCostAmount = typeof data?.deliveryCost === 'number' ? data.deliveryCost : (typeof data?.delivery_fee === 'number' ? data.delivery_fee : 0);
  const totalCostAmount = orderSubtotalAmount + deliveryCostAmount;
  const { price: totalCost } = usePrice({ amount: totalCostAmount, currencyCode: DEFAULT_CURRENCY });

  if (!data) return null;

  return (
    <div className="bg-white rounded-md w-full max-w-3xl">
      <div className="relative flex items-center justify-between w-full border-b px-5 md:px-7 border-border-base">
        <Heading variant="titleMedium">Order details</Heading>
        <button
          className="flex items-center justify-center px-4 py-6 text-2xl transition-opacity md:px-6 lg:py-7 focus:outline-none text-brand-dark hover:opacity-60"
          onClick={closeModal}
          aria-label="close"
        >
          <IoClose />
        </button>
      </div>
      <div className="p-5 md:p-8">
        <div className="text-[14px] opacity-70 mb-3 text-brand-dark">Shipping Address</div>
        <div className="rounded border border-solid min-h-[90px] bg-gray-100 p-4 border-border-two text-[12px] md:text-[14px]">
          <p className="text-brand-dark opacity-70">{addressLine}</p>
        </div>
        <OrderStatus status={data?.status?.serial} />
        <div className="grid grid-cols-12 bg-gray-300 py-3 rounded-[3px] text-brand-dark text-[12px] md:text-[14px]">
          <div className="col-span-2"></div>
          <div className="col-span-5">Items Name</div>
          <div className="col-span-3 text-center md:ltr:text-left md:rtl:text-right">Quantity</div>
          <div className="col-span-2">Price</div>
        </div>
        {data?.products?.map((item: any, index: string) => (
          <OrderDetailsContent key={index} item={item} />
        ))}
        <div className="mt-3 ltr:text-right rtl:text-left">
          <div className="text-black inline-flex flex-col text-[12px] md:text-[14px]">
            <div className="pb-1 mb-2 border-b border-border-base ltr:pl-20 rtl:pr-20">
              <p className="flex justify-between mb-1">
                <span className="ltr:mr-8 rtl:ml-8">Sub total: </span>
                <span className="font-medium">{orderSubtotal}</span>
              </p>
              {typeof data?.discount === 'number' && (
                <p className="flex justify-between mb-2">
                  <span className="ltr:mr-8 rtl:ml-8">Discount: </span>
                  <span className="font-medium">
                    <DiscountPrice discount={data?.discount} />
                  </span>
                </p>
              )}
              {typeof data?.delivery_fee === 'number' && (
                <p className="flex justify-between mb-2">
                  <span className="ltr:mr-8 rtl:ml-8">Delivery Fee:</span>
                  <span className="font-medium">
                    <DeliveryFee delivery={data?.delivery_fee} />
                  </span>
                </p>
              )}
            </div>
            <p className="flex justify-between mb-2 ltr:pl-20 rtl:pr-20">
              <span className="ltr:mr-8 rtl:ml-8">Total Cost:</span>
              <span className="font-medium">{totalCost}</span>
            </p>
          </div>
        </div>
        <div className="mt-8 flex items-center justify-end gap-3">
          <button
            onClick={closeModal}
            className="py-2.5 px-4 text-[12px] md:text-[14px] text-black font-medium bg-white rounded border border-solid border-[#DEE5EA] hover:border-[#333] transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
