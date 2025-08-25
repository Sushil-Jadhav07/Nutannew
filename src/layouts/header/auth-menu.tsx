import Link from '@/components/shared/link';
import cn from "classnames";
import React, {useCallback, useContext, useState, useEffect, useRef} from "react";
import {ROUTES} from "@/utils/routes";
import {AuthContext} from "@/contexts/AuthProvider";
import {signOut} from "firebase/auth";
import {auth} from "@/config/firebase";
import {User, ShoppingBag, Heart, HelpCircle, LogOut} from 'lucide-react';
import { useToast } from '@/contexts/ToastContext';

interface Props {
    className?: string;
}

export default function AuthMenu({
  className,
  children,
}: React.PropsWithChildren<Props>) {
  const { user, isAuthenticated, loading } = useContext(AuthContext);
  const { showToast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleLogout = useCallback(async () => {
    try {
      await signOut(auth);
      setIsOpen(false);
      showToast('Successfully logged out!', 'success');
    } catch (error: any) {
      console.error('Logout failed:', error.message);
      showToast('Logout failed. Please try again.', 'error');
    }
  }, [showToast]);

  const handleNavigation = useCallback((route: string) => {
    setIsOpen(false);
    // Navigation will be handled by Link components
  }, []);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <button
        className={cn(
          'flex items-center focus:outline-none group',
          className
        )}
        disabled
      >
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
      </button>
    );
  }

  if (!isAuthenticated) {
    return (
      <Link
        to={ROUTES.LOGIN}
        className={cn(
          'flex items-center focus:outline-none group',
          className
        )}
      >
        {children}
      </Link>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className={cn(
          'flex items-center focus:outline-none group',
          className
        )}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="User menu"
      >
        {children}
      </button>
      
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute bottom-full right-0 mb-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              {user?.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt={user.displayName || user.email || 'User'} 
                  className="w-12 h-12 rounded-full object-cover" 
                />
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
          </div>
          
          <div className="py-1">
            <Link to={ROUTES.ACCOUNT} onClick={() => setIsOpen(false)}>
              <MenuItem 
                icon={<User className="w-5 h-5" />} 
                label="My Account" 
              />
            </Link>
            <Link to={ROUTES.ORDERS} onClick={() => setIsOpen(false)}>
              <MenuItem 
                icon={<ShoppingBag className="w-5 h-5" />} 
                label="My Order" 
              />
            </Link>
            <Link to={ROUTES.SAVELISTS} onClick={() => setIsOpen(false)}>
              <MenuItem 
                icon={<Heart className="w-5 h-5" />} 
                label="Wishlist" 
              />
            </Link>
          </div>
          
          <div className="border-t border-gray-100 py-2">
            <Link to={ROUTES.CONTACT} onClick={() => setIsOpen(false)}>
              <MenuItem 
                icon={<HelpCircle className="w-5 h-5" />} 
                label="Help" 
              />
            </Link>
            <div 
              onClick={handleLogout}
              className="cursor-pointer"
            >
              <MenuItem 
                icon={<LogOut className="w-5 h-5" />} 
                label="Log out" 
              />
            </div>
          </div>
        </div>
        </>
      )}
    </div>
  );
}

function MenuItem({ 
  icon, 
  label 
}: { 
  icon: React.ReactNode; 
  label: string; 
}) {
  return (
    <div className="flex items-center w-full px-4 py-3 text-sm text-body hover:bg-gray-50 transition-colors cursor-pointer">
      <span className="me-3">{icon}</span>
      <span>{label}</span>
    </div>
  );
}
