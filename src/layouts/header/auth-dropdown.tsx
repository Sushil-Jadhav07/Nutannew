import React, { useRef, useState, useCallback, useContext } from 'react';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { User, ShoppingBag, Heart, HelpCircle, LogOut } from 'lucide-react';
import AccountIcon from '@/components/icons/account-icon';
import { ROUTES } from '@/utils/routes';
import { usePanel } from '@/contexts/usePanel';
import { colorMap } from '@/data/color-settings';
import cn from 'classnames';
import { Link, useNavigate } from 'react-router-dom';
import { useModalAction } from '@/components/common/modal/modalContext';
import { AuthContext } from '@/contexts/AuthProvider';
import { signOut } from 'firebase/auth';
import { auth } from '@/config/firebase';

interface UserDropdownProps {
    hideLabel?: boolean;
    userName?: string;
    userLocation?: string;
    userImage?: string;
    variant?: Variant;
}

type Variant = 'Border' | 'Border-white' | 'Normal';

const AuthDropdown = React.memo(
    ({
         variant = 'Normal',
         hideLabel,
         userName = 'Luhan Nguyen',
         userLocation = 'Los Angeles, CA',
         userImage = '/assets/images/support/3.png',
     }: UserDropdownProps) => {
        const [isOpen, setIsOpen] = useState(false);
        const buttonRef = useRef<HTMLButtonElement>(null);
        const navigate = useNavigate();
        const { selectedColor } = usePanel();
        const { openModal } = useModalAction();
        const { user, isAuthenticated, loading } = useContext(AuthContext);

        const isLoggedIn = isAuthenticated;

        const handleNavigation = useCallback(
            (route: string) => {
                setIsOpen(false);
                buttonRef.current?.click();
                navigate(route);
            },
            [navigate]
        );

        const handleLogout = useCallback(async () => {
            try {
                setIsOpen(false);
                buttonRef.current?.click();
                await signOut(auth);
                // Success - user will be redirected automatically via AuthProvider
            } catch (error: any) {
                console.error('Logout failed:', error.message);
            }
        }, []);

        const handleLogin = useCallback(() => {
            openModal('LOGIN_VIEW');
        }, [openModal]);

        const sizeIcon =
            variant === 'Border'
                ? `w-5 h-5 ${colorMap[selectedColor].text}`
                : variant === 'Border-white'
                    ? `w-5 h-5 text-brand-light`
                    : '';

        // Show loading state while checking authentication
        if (loading) {
            return (
                <button
                    className={cn(
                        'hidden lg:flex items-center focus:outline-none group',
                        hideLabel ? '' : 'text-sm font-normal'
                    )}
                    disabled
                >
                    <div className="cart-button border-brand-light/20 w-11 h-11 flex justify-center items-center rounded-full border-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                    </div>
                    {!hideLabel && <span className="text-sm font-normal ms-2">Loading...</span>}
                </button>
            );
        }

        if (!isLoggedIn) {
            return (
                <Link
                    to={ROUTES.LOGIN}
                    className={cn(
                        'hidden lg:flex items-center focus:outline-none group',
                        hideLabel ? '' : 'text-sm font-normal'
                    )}
                >
                    <div
                        className={cn(
                            'cart-button',
                            {
                                [`${colorMap[selectedColor].groupHoverBorder} w-11 h-11 flex justify-center items-center rounded-full border-2`]:
                                variant === 'Border',
                                [`${colorMap[selectedColor].groupHoverBorder} w-11 h-11 flex justify-center items-center rounded-full border-2 xs:border-brand-light`]:
                                variant === 'Border-white',
                            },
                            'border-brand-light/20'
                        )}
                    >
                        
                        <AccountIcon className={sizeIcon} />
                    </div>
                    {!hideLabel && <span className="text-sm font-normal ms-2">Sign in</span>}
                </Link>
            );
        }

        return (
            <Popover className="relative">
                <PopoverButton
                    ref={buttonRef}
                    className={`hidden lg:flex items-center focus:outline-none group`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div
                        className={cn(
                            'cart-button',
                            {
                                [`${colorMap[selectedColor].groupHoverBorder} w-11 h-11 flex justify-center items-center rounded-full border-2`]:
                                variant === 'Border',
                                [`${colorMap[selectedColor].groupHoverBorder} w-11 h-11 flex justify-center items-center rounded-full border-2 xs:border-brand-light`]:
                                variant === 'Border-white',
                            },
                            isOpen ? `${colorMap[selectedColor].border}` : 'border-brand-light/20'
                        )}
                    >
                        <AccountIcon className={sizeIcon} />
                    </div>
                    {!hideLabel && (
                        <span className="text-sm font-normal ms-2">
                            {user?.displayName || user?.email?.split('@')[0] || 'My Account'}
                        </span>
                    )}
                </PopoverButton>

                <PopoverPanel
                    transition
                    className="absolute right-0 z-10 mt-4 w-70 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition duration-200 ease-in-out"
                >
                    <div className="pt-4">
                        <div className="flex items-center gap-3 px-4 pb-4 border-b border-gray-100">
                            {user?.photoURL ? (
                                <img src={user.photoURL} alt={user.displayName || user.email || 'User'} className="w-12 h-12 rounded-full object-cover" />
                            ) : (
                                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                                    <span className="text-white text-lg font-bold">
                                        {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                                    </span>
                                </div>
                            )}
                            <div>
                                <h3 className="font-medium text-brand-dark">
                                    {user?.displayName || user?.email?.split('@')[0] || 'User'}
                                </h3>
                                <p className="text-sm text-gray-500">{user?.email || 'No email'}</p>
                            </div>
                        </div>

                        <div className="py-1">
                            <MenuItem icon={<User className="w-5 h-5" />} label="My Account" onClick={() => handleNavigation(ROUTES.ACCOUNT)} />
                            <MenuItem icon={<ShoppingBag className="w-5 h-5" />} label="My Order" onClick={() => handleNavigation(ROUTES.ORDERS)} />
                            <MenuItem icon={<Heart className="w-5 h-5" />} label="Wishlist" onClick={() => handleNavigation(ROUTES.SAVELISTS)} />
                        </div>

                        <div className="border-t border-gray-100 py-2">
                            <MenuItem icon={<HelpCircle className="w-5 h-5" />} label="Help" />
                            <MenuItem icon={<LogOut className="w-5 h-5" />} label="Log out" onClick={handleLogout} />
                        </div>
                    </div>
                </PopoverPanel>
            </Popover>
        );
    }
);

function MenuItem({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick?: () => void }) {
    const { selectedColor } = usePanel();
    return (
        <button
            className={`flex items-center w-full px-4 py-3 text-sm text-body hover:bg-gray-50 ${colorMap[selectedColor].hoverLink}`}
            onClick={onClick}
        >
             <span className="me-3 ">{icon}</span>
            <span>{label}</span>
        </button>
    );
}

export default AuthDropdown;