
import Modal from '@/components/common/modal/modal';
import {
  useModalAction,
  useModalState,
} from '@/components/common/modal/modalContext';
import React from "react";
// const LoginForm = React.lazy(() => import('@/components/auth/login-form'));
// const SignUpForm = React.lazy(() => import('@/components/auth/register-form'));
// const ForgetPasswordForm = React.lazy(() => import('@/components/auth/forget-password-form'));
const ProductQuickview = React.lazy(() => import('@/components/product/product-quickview'));
const ProductVideo = React.lazy(() => import('@/components/product/productDetails/product-video'));
const OrderDetailsModal = React.lazy(() => import('@/components/orders/order-details-modal'));
const ConfirmCancelOrderModal = React.lazy(() => import('@/components/orders/confirm-cancel-modal'));
const ReportOrderModal = React.lazy(() => import('@/components/orders/report-order-modal'));

export default function ModalManaged() {
  const { isOpen, view } = useModalState();
  const { closeModal } = useModalAction();

  return (
    <Modal open={isOpen} onClose={closeModal}>
      {/* {view === 'LOGIN_VIEW' && <LoginForm/>}
      {view === 'SIGNUP_VIEW' && <SignUpForm />}
      {view === 'FORGET_PASSWORD' && <ForgetPasswordForm />} */}
      {view === 'PRODUCT_VIEW' && <ProductQuickview/>}
      {view === 'PRODUCT_VIDEO' && <ProductVideo/>}
      {view === 'ORDER_DETAILS' && <OrderDetailsModal/>}
      {view === 'CONFIRM_CANCEL_ORDER' && <ConfirmCancelOrderModal/>}
      {view === 'REPORT_ORDER' && <ReportOrderModal/>}
    </Modal>
  );
}
