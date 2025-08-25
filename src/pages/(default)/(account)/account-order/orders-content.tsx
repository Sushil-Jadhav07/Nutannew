

import OrderTable from '@/components/orders/order-table';
import { useOrdersQuery } from '@/services/order/get-all-orders';
import cn from "classnames";
import {colorMap} from "@/data/color-settings";
import {usePanel} from "@/contexts/usePanel";

export default function OrdersContent() {
  const { data, isLoading } = useOrdersQuery({});
  const { selectedColor } = usePanel();
  if (isLoading) return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className={cn("animate-spin rounded-full h-12 w-12 border-4 border-t-transparent",colorMap[selectedColor].border)}></div>
      </div>
  );
  
  return <OrderTable orders={data?.data} />;
}
