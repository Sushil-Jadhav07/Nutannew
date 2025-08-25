
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
    </Modal>
  );
}
