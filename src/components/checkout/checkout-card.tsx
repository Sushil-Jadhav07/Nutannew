
import usePrice from '@/services/product/use-price';
import cn from 'classnames';
import {useCart} from '@/contexts/useCart';
import Button from '@/components/shared/button';
import {CheckoutItem} from '@/components/checkout/checkout-card-item';
import {CheckoutCardFooterItem} from './checkout-card-footer-item';
import CouponSuggestions from '@/components/checkout/coupon-suggestions';
import { useCheckout } from '@/contexts/CheckoutContext';
import { AuthContext } from '@/contexts/AuthProvider';
import { DEFAULT_CURRENCY } from '@/utils/currency';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/config/firebase';
import {useIsMounted} from '@/utils/use-is-mounted';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from "@/components/shared/loading";
import {ROUTES} from "@/utils/routes";

// Define interfaces for TypeScript
// Cart item type inferred from cart context

// Footer item type removed; footer built inline

interface UsePriceReturn {
    price: string;
}

// (kept for reference) UseCartReturn

// Define the component with TypeScript
const CheckoutCard: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { formData, isCheckoutComplete } = useCheckout();
    const cartState = useCart();
    const { items, total, isEmpty } = cartState;
    const [couponCode, setCouponCode] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState<any | null>(null);
    const [couponError, setCouponError] = useState<string>('');
    const [isCreatingOrder, setIsCreatingOrder] = useState(false);
    
    // UsePrice hook with typed props and return
    const discountAmount = (() => {
        if (!appliedCoupon) return 0;
        const type = String(appliedCoupon.couponAmountDetails || '').toLowerCase();
        const amt = Number(appliedCoupon.couponAmount || 0);
        if (!isFinite(amt) || amt <= 0) return 0;
        if (type === 'percentage' || type === 'percent') return Math.max(0, Math.min(total, (total * amt) / 100));
        return Math.max(0, Math.min(total, amt));
    })();

    const payable = Math.max(0, total - discountAmount);

    const { price: subtotal } = usePrice({
        amount: payable,
        currencyCode: DEFAULT_CURRENCY,
    }) as UsePriceReturn;
    const { price: originalTotalPrice } = usePrice({
        amount: total,
        currencyCode: DEFAULT_CURRENCY,
    }) as UsePriceReturn;
    const { price: discountPrice } = usePrice({
        amount: -discountAmount,
        currencyCode: DEFAULT_CURRENCY,
    }) as UsePriceReturn;
    
    // Apply coupon
    const onApplyCoupon = async () => {
        setCouponError('');
        setAppliedCoupon(null);
        if (!couponCode.trim()) return;
        try {
            const { fetchCouponByCode, isCouponActive } = await import('@/services/coupon/firebase-coupon');
            const c = await fetchCouponByCode(couponCode.trim());
            if (!c || !isCouponActive(c)) {
                setCouponError('Invalid or inactive coupon');
                return;
            }
            setAppliedCoupon(c);
        } catch (e) {
            setCouponError('Unable to validate coupon');
        }
    };

    const onRemoveCoupon = () => {
        setAppliedCoupon(null);
        setCouponError('');
    };

    // Create order in Firebase
    const createOrder = async () => {
        if (!isCheckoutComplete || !user?.uid) {
            alert('Please complete all checkout steps first');
            return;
        }

        setIsCreatingOrder(true);
        try {
            // Validate required data before creating order
            if (items.length === 0) {
                throw new Error('Cart is empty');
            }
            
            if (!formData.contact?.email && !user?.email) {
                throw new Error('Customer email is required');
            }
            
            if (!formData.shipping?.address) {
                throw new Error('Shipping address is required');
            }
            
            console.log('Creating order with cart items:', items);
            console.log('Applied coupon:', appliedCoupon);
            console.log('Discount amount:', discountAmount);
            console.log('Payable amount:', payable);
            
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
                    
                    // Use the already clean product name (color names are now handled separately)
                    const cleanName = item.name || 'Unknown Product';
                    
                    const imgThumb = item?.image?.thumbnail || item?.image?.url || item?.imageUrl || item?.thumbnail || (Array.isArray(item?.images) ? (item.images[0]?.thumbnail || item.images[0]?.url) : undefined) || (typeof item?.image === 'string' ? item.image : undefined) || '';
                    return {
                        p_name: cleanName,
                        p_price: item.price.toString(),
                        p_qty: (item.quantity || 1).toString(),
                        p_size: size,
                        p_color: item.color || '#000000',
                        // Preserve all color information for order confirmation
                        color: item.color || '',
                        colorName: item.colorName || '',
                        colorDisplayName: item.colorDisplayName || item.colorName || '',
                        image: imgThumb ? { thumbnail: imgThumb, original: imgThumb } : undefined,
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
                customerEmail: formData.contact?.email || user?.email || '',
                customerPhone: formData.contact?.phone || '',
                paymentMethod: formData.payment?.paymentMethod || 'cod',
                shippingType: formData.shipping?.addressType || 'home',
                orderTotal: payable,
                total: total, // Add original total
                discount: discountAmount,
                coupon: appliedCoupon ? {
                    code: appliedCoupon.couponCode,
                    amount: appliedCoupon.couponAmount,
                    type: appliedCoupon.couponAmountDetails,
                } : null,
                itemsCount: items.length,
                // Add user ID for better tracking
                userId: user?.uid || ''
            };

            // Add order to Firebase
            await setDoc(doc(db, 'Order', orderData.OrderID), orderData);
            
            console.log('Order created successfully with ID:', orderData.OrderID);
            
            // Navigate to order confirmation with order in state
            navigate(ROUTES.ORDER, { state: { order: orderData } });
            
        } catch (error) {
            console.error('Error creating order:', error);
            console.error('Order data that failed:', orderData);
            
            // Provide more specific error messages
            let errorMessage = 'Failed to create order. Please try again.';
            if (error instanceof Error) {
                console.error('Error details:', error.message);
                // You can add more specific error handling based on error types
                if (error.message.includes('permission')) {
                    errorMessage = 'Permission denied. Please check your login status.';
                } else if (error.message.includes('network')) {
                    errorMessage = 'Network error. Please check your connection.';
                }
            }
            
            alert(errorMessage);
        } finally {
            setIsCreatingOrder(false);
        }
    };
    
    // Removed old static footer; totals computed dynamically below
    
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
                    {/* Coupon */}
                    <div className="mt-2 py-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Have a coupon?</h4>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                                placeholder="Enter coupon code"
                                className="flex-1 border border-[#E3E8EC] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#3B3310] focus:ring-1 focus:ring-[#3B3310]"
                            />
                            {!appliedCoupon ? (
                                <button
                                    type="button"
                                    className="px-4 py-2 text-sm rounded bg-[#333] text-white hover:bg-[#333]/90"
                                    onClick={onApplyCoupon}
                                >
                                    Apply
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    className="px-4 py-2 text-sm rounded bg-[#F35C5C] text-white hover:bg-[#e14e4e]"
                                    onClick={onRemoveCoupon}
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                        {couponError && <p className="text-xs text-[#F35C5C] mt-2">{couponError}</p>}
                        {appliedCoupon && (
                            <div className="text-xs text-green-700 mt-2">
                                Applied {appliedCoupon.couponName} ({appliedCoupon.couponCode}) — {String(appliedCoupon.couponAmountDetails).toLowerCase()==='percentage' ? `${appliedCoupon.couponAmount}%` : `$${appliedCoupon.couponAmount}`} off
                            </div>
                        )}
                        <CouponSuggestions onApply={(code) => { setCouponCode(code); onApplyCoupon(); }} appliedCode={appliedCoupon?.couponCode} />
                    </div>
                    <div className="space-y-2 pt-5 border-t border-border-base">
                        <CheckoutCardFooterItem item={{ id: 1, name: 'Subtotal', price: originalTotalPrice }} />
                        {appliedCoupon && (
                          <CheckoutCardFooterItem item={{ id: 2, name: 'Discount', price: discountPrice }} />
                        )}
                        <CheckoutCardFooterItem item={{ id: 3, name: 'Order total', price: subtotal }} />
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
