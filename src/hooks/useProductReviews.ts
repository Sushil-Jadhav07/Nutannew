import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  fetchProductReviews, 
  addReviewToFirebase, 
  subscribeToProductReviews,
  getProductAverageRating,
  ProductReview,
  ReviewFormData 
} from '@/services/reviews/firebase-reviews';

// Hook for fetching product reviews
export const useProductReviews = (productId: string, limit?: number) => {
  return useQuery<ProductReview[], Error>({
    queryKey: ['product-reviews', productId, limit],
    queryFn: () => fetchProductReviews(productId, limit),
    enabled: !!productId,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook for real-time product reviews
export const useProductReviewsRealtime = (productId: string, limit?: number) => {
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!productId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const unsubscribe = subscribeToProductReviews(
      productId,
      (updatedReviews) => {
        setReviews(updatedReviews);
        setLoading(false);
      },
      limit
    );

    // Cleanup subscription on unmount
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [productId, limit]);

  return { reviews, loading, error };
};

// Hook for adding a review
export const useAddReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addReviewToFirebase,
    onSuccess: (data, variables) => {
      // Invalidate and refetch reviews for this product
      queryClient.invalidateQueries({ 
        queryKey: ['product-reviews', variables.productId] 
      });
      queryClient.invalidateQueries({ 
        queryKey: ['product-rating', variables.productId] 
      });
    },
    onError: (error) => {
      console.error('Failed to add review:', error);
    },
  });
};

// Hook for getting product average rating
export const useProductRating = (productId: string) => {
  return useQuery({
    queryKey: ['product-rating', productId],
    queryFn: () => getProductAverageRating(productId),
    enabled: !!productId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Combined hook for review management
export const useReviewManager = (productId: string, options?: { limit?: number; realtime?: boolean }) => {
  const { limit = 10, realtime = false } = options || {};
  
  const staticQuery = useProductReviews(productId, limit);
  const realtimeData = useProductReviewsRealtime(productId, limit);
  const addReviewMutation = useAddReview();
  const ratingQuery = useProductRating(productId);

  // Choose between static and realtime data
  const reviewsData = realtime ? realtimeData : staticQuery;

  const addReview = async (reviewData: Omit<ReviewFormData, 'productId'>) => {
    try {
      await addReviewMutation.mutateAsync({
        ...reviewData,
        productId
      });
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to add review' 
      };
    }
  };

  return {
    // Review data
    reviews: reviewsData.reviews || [],
    reviewsLoading: reviewsData.loading || staticQuery.isLoading,
    reviewsError: reviewsData.error || staticQuery.error,
    
    // Rating data
    rating: ratingQuery.data,
    ratingLoading: ratingQuery.isLoading,
    ratingError: ratingQuery.error,
    
    // Actions
    addReview,
    addReviewLoading: addReviewMutation.isPending,
    addReviewError: addReviewMutation.error,
    
    // Refetch functions
    refetchReviews: staticQuery.refetch,
    refetchRating: ratingQuery.refetch,
  };
};
