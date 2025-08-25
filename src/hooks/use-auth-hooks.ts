'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLoginMutation, LoginInputType } from '@/services/auth/use-login';
import { useSignUpMutation, SignUpInputType } from '@/services/auth/use-signup';
import { useModalAction } from '@/components/common/modal/modalContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { ROUTES } from '@/utils/routes'; // Ensure ROUTES contains the home page route

type ForgetPasswordInputType = {
    email: string;
};

export const useLoginForm = (isPopup: boolean = true) => {
    const { mutate: loginMutation } = useLoginMutation();
    const [loginError, setLoginError] = useState<string | null>(null);
    const { closeModal } = useModalAction();
    const navigate = useNavigate(); // Initialize navigate
    
    const formMethods = useForm<LoginInputType>({
        mode: 'all',
        defaultValues: {
            email: 'guest@demo.com',
            password: 'admin',
            remember_me: true,
        },
    });
    
    const onSubmit = ({ email, password, remember_me }: LoginInputType) => {
        setLoginError(null);
        loginMutation (
            { email, password, remember_me },
            {
                onSuccess: () => {
                    if (isPopup) {
                        closeModal();
                    } else {
                        navigate(ROUTES.HOME);
                    }
                    formMethods.reset();
                },
                onError: (err) => {
                    setLoginError(err.message || 'Login failed. Please check your credentials.');
                },
            }
        );
    };
    
    return {
        formMethods,
        loginError,
        handleSubmit: formMethods.handleSubmit(onSubmit),
    };
};

export const useSignUpForm = () => {
    const { mutate: signUp } = useSignUpMutation();
    const [signUpError, setSignUpError] = useState<string | null>(null);
    const { closeModal } = useModalAction();
    
    const formMethods = useForm<SignUpInputType>({
        mode: 'all',
        defaultValues: {
            name: '',
            email: '',
            password: '',
            remember_me: false,
        },
    });
    
    const onSubmit = ({ name, email, password, remember_me }: SignUpInputType) => {
        setSignUpError(null);
        signUp(
            { name, email, password, remember_me },
            {
                onSuccess: () => {
                    closeModal();
                    formMethods.reset();
                },
                onError: (err) => {
                    setSignUpError(err.message || 'Registration failed. Please try again.');
                },
            }
        );
    };
    
    return {
        formMethods,
        signUpError,
        handleSubmit: formMethods.handleSubmit(onSubmit),
    };
};

export const useForgetPasswordForm = () => {
    const [formError, setFormError] = useState<string | null>(null);
    const { closeModal } = useModalAction();
    
    const formMethods = useForm<ForgetPasswordInputType>({
        mode: 'all',
        defaultValues: {
            email: '',
        },
    });
    
    const onSubmit = async ({ email }: ForgetPasswordInputType) => {
        setFormError(null);
        try {
            console.log({ email }, 'Sending password reset request');
            closeModal();
            formMethods.reset();
        } catch (err: any) {
            setFormError(err.message || 'Failed to send reset password email. Please try again.');
        }
    };
    
    return {
        formMethods,
        formError,
        handleSubmit: formMethods.handleSubmit(onSubmit),
    };
};

export const useSocialLogin = () => {
    const { mutate: login } = useLoginMutation();
    const { closeModal } = useModalAction();
    const { reset } = useForm<LoginInputType>();
    const navigate = useNavigate(); // Initialize navigate
    
    const handleSocialLogin = (isPopup: boolean = true) => { // Add isPopup parameter
        login(
            {
                email: 'guest@demo.com',
                password: 'admin',
                remember_me: true,
            },
            {
                onSuccess: () => {
                    if (isPopup) {
                        closeModal();
                    } else {
                        navigate(ROUTES.HOME);
                    }
                    reset();
                },
            }
        );
    };
    
    return { handleSocialLogin };
};

export const useAuthModal = () => {
    const { openModal,closeModal } = useModalAction();
    
    const handleForgetPassword = () => {
        openModal('FORGET_PASSWORD');
    };
    
    const handleSignUp = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        openModal('SIGNUP_VIEW');
    };
    
    const handleLogin = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        openModal('LOGIN_VIEW');
    };
    
    const handleCloseModal = () => {
        closeModal();
    };
    
    return { handleForgetPassword, handleSignUp, handleLogin,handleCloseModal };
};