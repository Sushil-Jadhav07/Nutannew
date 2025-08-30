import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ContactData {
    phone: string;
    email: string;
    receiveNews: boolean;
}

interface ShippingData {
    firstName: string;
    address: string;
    city: string;
    country: string;
    state: string;
    postalCode: string;
    addressType: "home" | "office";
}

interface PaymentData {
    paymentMethod: "card" | "cod";
    cardDetails?: any;
    message?: string;
}

interface CheckoutFormData {
    contact: ContactData | null;
    shipping: ShippingData | null;
    payment: PaymentData | null;
}

interface CheckoutContextType {
    formData: CheckoutFormData;
    updateContact: (data: ContactData) => void;
    updateShipping: (data: ShippingData) => void;
    updatePayment: (data: PaymentData) => void;
    isCheckoutComplete: boolean;
    resetCheckout: () => void;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export const useCheckout = () => {
    const context = useContext(CheckoutContext);
    if (context === undefined) {
        throw new Error('useCheckout must be used within a CheckoutProvider');
    }
    return context;
};

interface CheckoutProviderProps {
    children: ReactNode;
}

export const CheckoutProvider: React.FC<CheckoutProviderProps> = ({ children }) => {
    const [formData, setFormData] = useState<CheckoutFormData>({
        contact: null,
        shipping: null,
        payment: null,
    });

    const updateContact = (data: ContactData) => {
        setFormData(prev => ({ ...prev, contact: data }));
    };

    const updateShipping = (data: ShippingData) => {
        setFormData(prev => ({ ...prev, shipping: data }));
    };

    const updatePayment = (data: PaymentData) => {
        setFormData(prev => ({ ...prev, payment: data }));
    };

    const isCheckoutComplete = !!(formData.contact && formData.shipping && formData.payment);

    const resetCheckout = () => {
        setFormData({
            contact: null,
            shipping: null,
            payment: null,
        });
    };

    const value: CheckoutContextType = {
        formData,
        updateContact,
        updateShipping,
        updatePayment,
        isCheckoutComplete,
        resetCheckout,
    };

    return (
        <CheckoutContext.Provider value={value}>
            {children}
        </CheckoutContext.Provider>
    );
};
