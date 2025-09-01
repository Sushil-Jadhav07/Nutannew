

import OrderTable from '@/components/orders/order-table';
// import { useOrdersQuery } from '@/services/order/get-all-orders';
import cn from "classnames";
import {colorMap} from "@/data/color-settings";
import {usePanel} from "@/contexts/usePanel";
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthProvider';
import { useFirebaseOrdersByEmail, useFirebaseUserOrders } from '@/hooks/useFirebaseOrders';

export default function OrdersContent() {
  const { user } = useContext(AuthContext);
  const { data: byEmail, isLoading: loadingByEmail } = useFirebaseOrdersByEmail(user?.email);
  const { data: byUid, isLoading: loadingByUid } = useFirebaseUserOrders(user?.uid);
  const isLoading = loadingByEmail || loadingByUid;
  const orders = (byEmail && byEmail.length > 0) ? byEmail : (byUid || []);
  const { selectedColor } = usePanel();
  if (isLoading) return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className={cn("animate-spin rounded-full h-12 w-12 border-4 border-t-transparent",colorMap[selectedColor].border)}></div>
      </div>
  );
  
  return <OrderTable orders={orders} />;
}
