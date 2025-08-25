// ManagedUIContext.tsx
import React from 'react';
import { CartProvider } from '@/contexts/cart/cartContext';
import { ModalProvider } from '@/components/common/modal/modalContext';
import { WishlistProvider } from '@/contexts/wishlist/wishlistProvider';
import { CompareProvider } from '@/contexts/compare/compareProvider';
import { PanelProvider } from '@/contexts/panel/panel.context';
import { UIProvider } from '@/contexts/ui/uiContext';

export function ManagedUI({ children }: React.PropsWithChildren<object>) {
    return (
        <CartProvider>
            <WishlistProvider>
            <CompareProvider>
                <PanelProvider>
                    <UIProvider>
                        <ModalProvider>{children}</ModalProvider>
                    </UIProvider>
                </PanelProvider>
            </CompareProvider>
            </WishlistProvider>
        </CartProvider>
    );
}
