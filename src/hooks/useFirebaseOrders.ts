import { useQuery } from '@tanstack/react-query';
import { fetchOrdersByUser, fetchOrdersByCustomerEmail, UserOrder } from '@/services/order/firebase-orders';

export const useFirebaseUserOrders = (userId?: string) => {
  return useQuery<UserOrder[], Error>({
    queryKey: ['firebase-user-orders', userId],
    queryFn: async () => {
      if (!userId) return [];
      return fetchOrdersByUser(userId);
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useFirebaseOrdersByEmail = (email?: string | null) => {
  return useQuery<UserOrder[], Error>({
    queryKey: ['firebase-user-orders-by-email', email],
    queryFn: async () => {
      if (!email) return [];
      return fetchOrdersByCustomerEmail(email);
    },
    enabled: !!email,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
