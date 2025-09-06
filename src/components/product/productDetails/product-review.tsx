import type { FC } from 'react';
import ReviewCard from '@/components/cards/review-card';
import ReviewForm from "@/components/product/productDetails/review-form";
import { useReviewManager } from '@/hooks/useProductReviews';
import { ProductReview as ProductReviewType } from '@/services/reviews/firebase-reviews';
import Loading from '@/components/shared/loading';
import Text from '@/components/shared/text';
import Heading from '@/components/shared/heading';

interface ProductReviewProps {
  productId: string;
}

const ProductReview: FC<ProductReviewProps> = ({ productId }) => {
  const {
    reviews,
    reviewsLoading,
    reviewsError,
    rating,
    ratingLoading,
    refetchReviews,
    refetchRating
  } = useReviewManager(productId, { limit: 10, realtime: true });

  const handleReviewAdded = () => {
    // Refetch both reviews and rating when a new review is added
    refetchReviews();
    refetchRating();
  };

  if (reviewsLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        <Loading />
      </div>
    );
  }

  if (reviewsError) {
    return (
      <div className="text-center py-10">
        <Text className="text-red-500">
          Error loading reviews: {reviewsError.message}
        </Text>
      </div>
    );
  }

  // If no reviews exist, show only the review form centered with encouraging heading
  if (reviews.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <div className="text-center mb-8">
          <Heading className="text-xl md:text-2xl font-semibold text-brand-dark mb-2">
            Be the first one to review this product
          </Heading>
          <Text className="text-gray-600">
            Share your experience and help others make informed decisions
          </Text>
        </div>
        <ReviewForm
          productId={productId}
          onReviewAdded={handleReviewAdded}
          className="w-full max-w-lg"
        />
      </div>
    );
  }

  // If reviews exist, show both reviews and form side by side
  return (
    <div className="lg:flex">
      <div className="pt-2 basis-1/2">
        {/* Rating Summary */}
        {!ratingLoading && rating && rating.totalReviews > 0 && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl font-bold text-brand-dark">
                {rating.averageRating}
              </span>
              <div className="flex">
                {[...Array(5)].map((_, idx) => (
                  <span
                    key={idx}
                    className={`text-lg ${
                      idx < Math.round(rating.averageRating) 
                        ? 'text-yellow-400' 
                        : 'text-gray-300'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <Text className="text-sm text-gray-600">
              Based on {rating.totalReviews} review{rating.totalReviews !== 1 ? 's' : ''}
            </Text>
          </div>
        )}

        {/* Reviews List */}
        {reviews.map((review: ProductReviewType) => (
          <ReviewCard 
            item={{
              id: review.id,
              rating: review.rating,
              description: review.description,
              author: review.author,
              createdAt: review.createdAt
            }} 
            key={`review-key-${review.id}`} 
          />
        ))}
      </div>
      <ReviewForm
        productId={productId}
        onReviewAdded={handleReviewAdded}
        className="basis-1/2 lg:ps-10 xl:ps-14 3xl:ps-20 shrink-0 pt-10"
      />
    </div>
  );
};

export default ProductReview;
