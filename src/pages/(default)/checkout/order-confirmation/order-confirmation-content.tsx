

import OrderInformation from '@/components/orders/order-information';
import Container from '@/components/shared/container';
import { useResetCart } from '@/contexts/cart/cartActions';
import { useEffect } from 'react';

export default function OrderConfirmationContent() {
  const resetCart = useResetCart();
  useEffect(() => {
    resetCart();
  }, [resetCart]);
  return (
      <Container>
          <OrderInformation />
      </Container>
  );
}
