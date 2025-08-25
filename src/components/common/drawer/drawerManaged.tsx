
import React, {  useEffect } from 'react';
import {useUI} from '@/contexts/useUI';
import {Drawer} from '@/components/common/drawer/drawer';
import motionProps from '@/components/common/drawer/motion';
import {usePanel} from "@/contexts/usePanel"; // Adjust path as needed

const CartDrawer = React.lazy(() => import('@/components/cart/cart-drawer'));
const OrderDetails = React.lazy(() => import('@/components/orders/order-drawer'));
const CompareDrawer = React.lazy(() => import('@/components/compare/compare-drawer'));
const PanelCustomizer = React.lazy(() => import('@/components/panel/panel-drawer'));

export default function DrawerManaged() {
    const {displayDrawer, closeDrawer, drawerView} = useUI();
    const { selectedDirection } = usePanel();
    const dir = selectedDirection;
    const contentWrapperCSS = dir === 'ltr' ? {right: 0} : {left: 0};
    
    // Hide scrollbar when pane is open and restore when closed
    useEffect(() => {
        if (displayDrawer) {
            document.body.style.overflow = 'hidden';
            document.body.style.width = '100%';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [displayDrawer]);
    
    return (
        <Drawer
            rootClassName={
                drawerView === 'ORDER_DETAILS' ? 'order-details-drawer' : ''
            }
            open={displayDrawer}
            placement={
                drawerView === 'COMPARE_SIDEBAR' ? 'bottom' : dir === 'rtl' ? 'left' : 'right'
            }
            onClose={closeDrawer}
            style={contentWrapperCSS}
            {...motionProps}
        >
            {drawerView === 'CART_SIDEBAR' && <CartDrawer />}
            {drawerView === 'ORDER_DETAILS' && <OrderDetails/>}
            {drawerView === 'PANEL_SIDEBAR' && <PanelCustomizer/>}
            {drawerView === 'COMPARE_SIDEBAR' && <CompareDrawer/>}
        </Drawer>
    );
}
