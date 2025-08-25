
import usePrice from '@/services/product/use-price';
import cn from 'classnames';
import {useCart} from '@/contexts/useCart';
import Button from '@/components/shared/button';
import {CheckoutItem} from '@/components/checkout/checkout-card-item';
import {CheckoutCardFooterItem} from './checkout-card-footer-item';

import {useIsMounted} from '@/utils/use-is-mounted';
import React from 'react';
import Loading from "@/components/shared/loading";
import {ROUTES} from "@/utils/routes";

// Define interfaces for TypeScript
interface CartItem {
    id: string | number;
    price: number; // Added price property to match expected Item type
    [key: string]: any; // Allows additional properties for flexibility
}

interface FooterItem {
    id: number;
    name: string;
    price: string;
}


interface UsePriceReturn {
    price: string;
}

interface UseCartReturn {
    items: CartItem[];
    total: number;
    isEmpty: boolean;
}

// Define the component with TypeScript
const CheckoutCard: React.FC = () => {
    // UseCart hook with typed return
    const { items, total, isEmpty } = useCart() as UseCartReturn;
    
    // UsePrice hook with typed props and return
    const { price: subtotal } = usePrice({
        amount: total,
        currencyCode: 'USD',
    }) as UsePriceReturn;
    
    // Handle navigation programmatically (replace Next.js router)
    const handleOrder = () => {
        if (!isEmpty) {
            // In a standard React app, you might use window.location or a client-side router like react-router
            window.location.href = ROUTES.ORDER; // Adjust based on your routing setup
        }
    };
    
    // Mock checkout footer data
    const checkoutFooter: FooterItem[] = [
        {
            id: 1,
            name: 'Subtotal',
            price: subtotal,
        },
        {
            id: 2,
            name: 'Shipping',
            price: '$0',
        },
        {
            id: 3,
            name: 'Order total',
            price: subtotal,
        },
    ];
    
    // Custom hook to check if component is mounted
    const mounted = useIsMounted();
    
    // Render loading state if not mounted
    if (!mounted) {
        return (
            <div className="bg-white p-5 md:p-8 border rounded-md border-border-base">
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-border-base">
                    <h2 className="text-lg font-medium text-brand-dark">Order Summary</h2>
                </div>
                <Loading />
            </div>
        );
    }
    
    return (
        <div className="bg-white p-5 md:p-8 border rounded-md border-border-base">
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-border-base">
                <h2 className="text-lg font-medium text-brand-dark">Order Summary</h2>
            </div>
            
            <div className="space-y-4 pb-5">
                {isEmpty ? (
                    <p className="py-4">Your cart is empty.</p>
                ) : (
                    items.map((item) => <CheckoutItem item={item} key={item.id} />)
                )}
            </div>
            
            {!isEmpty && (
                <>
                    <div className="space-y-2 pt-5 border-t border-border-base">
                        {checkoutFooter.map((item) => (
                            <CheckoutCardFooterItem item={item} key={item.id} />
                        ))}
                    </div>
                    
                    <Button
                        variant="dark"
                        className={cn(
                            'w-full mt-8  rounded font-semibold px-4 py-3 transition-all',
                        )}
                        onClick={handleOrder}
                    >
                        Order Now
                    </Button>
                </>
            )}
        </div>
    );
};

export default CheckoutCard;
