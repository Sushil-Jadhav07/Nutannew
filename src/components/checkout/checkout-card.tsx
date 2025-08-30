
import usePrice from '@/services/product/use-price';
import cn from 'classnames';
import {useCart} from '@/contexts/useCart';
import Button from '@/components/shared/button';
import {CheckoutItem} from '@/components/checkout/checkout-card-item';
import {CheckoutCardFooterItem} from './checkout-card-footer-item';
import { useCheckout } from '@/contexts/CheckoutContext';
import { AuthContext } from '@/contexts/AuthProvider';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/config/firebase';
import {useIsMounted} from '@/utils/use-is-mounted';
import React, { useState, useContext } from 'react';
import Loading from "@/components/shared/loading";
import {ROUTES} from "@/utils/routes";

// Define interfaces for TypeScript
interface CartItem {
    id: string | number;
    price: number;
    name: string;
    quantity: number;
    [key: string]: any;
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
    const { user } = useContext(AuthContext);
    const { formData, isCheckoutComplete } = useCheckout();
    const cartState = useCart();
    const { items, total, isEmpty } = cartState;
    const [isCreatingOrder, setIsCreatingOrder] = useState(false);
    
    // UsePrice hook with typed props and return
    const { price: subtotal } = usePrice({
        amount: total,
        currencyCode: 'USD',
    }) as UsePriceReturn;
    
    // Create order in Firebase
    const createOrder = async () => {
        if (!isCheckoutComplete || !user?.uid) {
            alert('Please complete all checkout steps first');
            return;
        }

        setIsCreatingOrder(true);
        try {
            // Prepare order data according to your Firebase structure
            const orderData = {
                OrderID: Date.now().toString(), // Generate unique order ID
                createdAt: serverTimestamp(),
                customerName: formData.contact?.email || user.email || 'Unknown',
                
                // Product dimensions array
                dimensions: items.map(item => {
                    // Extract size from product name (e.g., "Giftset Product - M" -> size: "M")
                    const sizeMatch = item.name?.match(/- ([A-Z]+)$/);
                    const size = sizeMatch ? sizeMatch[1] : 'Standard';
                    
                    // Remove size from product name (e.g., "Giftset Product - M" -> "Giftset Product")
                    const cleanName = item.name?.replace(/- [A-Z]+$/, '').trim() || 'Unknown Product';
                    
                    return {
                        p_name: cleanName,
                        p_price: item.price.toString(),
                        p_qty: (item.quantity || 1).toString(),
                        p_size: size,
                        p_color: item.color || '#000000'
                    };
                }),
                
                // Dropoff location (shipping address)
                dropoff_location: {
                    address: formData.shipping?.address || '',
                    city: formData.shipping?.city || '',
                    companyName: '',
                    consignee: formData.shipping?.firstName || '',
                    phone: formData.contact?.phone || '',
                    region: formData.shipping?.state || '',
                    zip: formData.shipping?.postalCode || ''
                },
                
                // Return address (same as shipping for now)
                return_address: {
                    address: formData.shipping?.address || '',
                    city: formData.shipping?.city || '',
                    companyName: '',
                    consignee: formData.shipping?.firstName || '',
                    phone: formData.contact?.phone || '',
                    region: formData.shipping?.state || '',
                    zip: formData.shipping?.postalCode || ''
                },
                
                ident: '',
                
                // Invoice information
                invoices: [{
                    ewaybill: '',
                    ident: Date.now().toString(),
                    n_value: total
                }],
                
                // Order activity tracking
                orderActivity: [{
                    location: '',
                    remark: 'Order has been Created',
                    status: 'Order Created',
                    time: new Date()
                }],
                
                orderStatus: 'new',
                
                // Additional checkout information
                customerEmail: formData.contact?.email || '',
                customerPhone: formData.contact?.phone || '',
                paymentMethod: formData.payment?.paymentMethod || 'cod',
                shippingType: formData.shipping?.addressType || 'home',
                orderTotal: total,
                itemsCount: items.length
            };

            // Add order to Firebase
            await setDoc(doc(db, 'Order', orderData.OrderID), orderData);
            
            console.log('Order created successfully with ID:', orderData.OrderID);
            
            // Show success message
            alert('Order placed successfully! Order ID: ' + orderData.OrderID);
            
            // Redirect to order confirmation or home page
            window.location.href = ROUTES.HOME;
            
        } catch (error) {
            console.error('Error creating order:', error);
            alert('Failed to create order. Please try again.');
        } finally {
            setIsCreatingOrder(false);
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
                    
                    {/* Checkout Status */}
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Checkout Progress</h4>
                        <div className="space-y-2 text-sm">
                            <div className={`flex items-center ${formData.contact ? 'text-green-600' : 'text-gray-500'}`}>
                                <span className="mr-2">{formData.contact ? '✓' : '○'}</span>
                                Contact Information
                            </div>
                            <div className={`flex items-center ${formData.shipping ? 'text-green-600' : 'text-gray-500'}`}>
                                <span className="mr-2">{formData.shipping ? '✓' : '○'}</span>
                                Shipping Address
                            </div>
                            <div className={`flex items-center ${formData.payment ? 'text-green-600' : 'text-gray-500'}`}>
                                <span className="mr-2">{formData.payment ? '✓' : '○'}</span>
                                Payment Method
                            </div>
                        </div>
                    </div>
                    
                    <Button
                        variant="dark"
                        className={cn(
                            'w-full mt-8 rounded font-semibold px-4 py-3 transition-all',
                            !isCheckoutComplete && 'opacity-50 cursor-not-allowed'
                        )}
                        onClick={createOrder}
                        disabled={!isCheckoutComplete || isCreatingOrder}
                    >
                        {isCreatingOrder ? (
                            <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Creating Order...
                            </div>
                        ) : (
                            'Place Order'
                        )}
                    </Button>
                    
                    {!isCheckoutComplete && (
                        <p className="text-sm text-gray-500 text-center mt-2">
                            Please complete all checkout steps to place your order
                        </p>
                    )}
                </>
            )}
        </div>
    );
};

export default CheckoutCard;
