import { useOrderStatusQuery } from '@/services/order/order-status';
import ProgressBox from './progress-box';

interface Props {
  status?: number;
  statusStr?: string;
}

const normalize = (s?: string) => (s || '').toLowerCase().trim();

const mapStatusStringToName = (statusStr?: string): string | undefined => {
  const s = normalize(statusStr);
  switch (s) {
    case 'new':
      return 'Order Received';
    case 'in-process':
    case 'in_process':
    case 'processing':
      return 'Order placed';
    case 'on-the-way':
    case 'ontheway':
    case 'on_the_way':
      return 'On the way';
    case 'delivered':
      return 'Delivered';
    case 'cancelled':
    case 'canceled':
      return 'Cancelled';
    default:
      return undefined;
  }
};

const OrderStatus = ({ status, statusStr }: Props) => {
  const { data, isLoading } = useOrderStatusQuery();

  if (isLoading) return <div>Loading...</div>;

  // Normalize backend list to unique, ordered serials we control
  const list = (data?.data || []) as Array<any>;
  const serialNameMap: Record<string, number> = {
    'order received': 1,
    'order placed': 2,
    'on the way': 3,
    'delivered': 4,
  };
  const normalizedList = list.map((it, idx) => {
    const key = normalize(it?.name);
    const serial = serialNameMap[key] ?? idx + 1;
    return { ...it, serial };
  });

  // Compute current step serial from either number or string
  let serial = typeof status === 'number' ? status : undefined;
  if (serial === undefined) {
    const desiredName = mapStatusStringToName(statusStr);
    const key = normalize(desiredName);
    if (key && serialNameMap[key]) {
      serial = serialNameMap[key];
    } else if (desiredName) {
      const idx = normalizedList.findIndex((it: any) => normalize(it?.name) === key);
      if (idx >= 0) serial = idx + 1;
    }
  }

  if (serial === undefined) serial = 1;

  return <ProgressBox data={{ data: normalizedList }} status={serial} />;
};

export default OrderStatus;
