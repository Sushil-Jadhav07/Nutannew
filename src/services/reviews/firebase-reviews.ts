import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit as firestoreLimit,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  Timestamp
} from 'firebase/firestore';
import { db } from '@/config/firebase';

export interface ProductReview {
  id?: string;
  productId: string;
  author: string;
  email: string;
  description: string;
  rating: number;
  createdAt: Timestamp;
  updatedAt?: Timestamp;
}

export interface ReviewFormData {
  name: string;
  email: string;
  message: string;
  rating: number;
  productId: string;
}

const REVIEWS_COLLECTION = 'ProductReviews';

// Add a new review to Firebase
export const addReviewToFirebase = async (reviewData: ReviewFormData): Promise<string> => {
  try {
    const review: Omit<ProductReview, 'id'> = {
      productId: reviewData.productId,
      author: reviewData.name,
      email: reviewData.email,
      description: reviewData.message,
      rating: reviewData.rating,
      createdAt: Timestamp.now()
    };

    const docRef = await addDoc(collection(db, REVIEWS_COLLECTION), review);
    console.log('Review added successfully with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding review:', error);
    throw new Error('Failed to add review. Please try again.');
  }
};

// Fetch reviews for a specific product
export const fetchProductReviews = async (productId: string, limit?: number): Promise<ProductReview[]> => {
  try {
    if (!productId || productId.trim() === '') {
      console.warn('⚠️ Firebase - Empty productId provided');
      return [];
    }

    const reviewsRef = collection(db, REVIEWS_COLLECTION);
    let reviewQuery = query(
      reviewsRef,
      where('productId', '==', productId),
      orderBy('createdAt', 'desc')
    );

    if (limit) {
      reviewQuery = query(reviewQuery, firestoreLimit(limit));
    }

    const querySnapshot = await getDocs(reviewQuery);
    const reviews: ProductReview[] = [];

    querySnapshot.forEach((doc) => {
      const reviewData = {
        id: doc.id,
        ...doc.data()
      } as ProductReview;
      reviews.push(reviewData);
    });

    console.log(`✅ Firebase - Fetched ${reviews.length} reviews for product ${productId}`);
    return reviews;
  } catch (error) {
    console.error('❌ Firebase - Error fetching reviews:', error);
    throw new Error('Failed to fetch reviews. Please try again.');
  }
};

// Get real-time updates for product reviews
export const subscribeToProductReviews = (
  productId: string,
  callback: (reviews: ProductReview[]) => void,
  limit?: number
) => {
  if (!productId || productId.trim() === '') {
    console.warn('⚠️ Firebase - Empty productId for subscription');
    callback([]);
    return () => {}; // Return empty unsubscribe function
  }

  const reviewsRef = collection(db, REVIEWS_COLLECTION);
  let reviewQuery = query(
    reviewsRef,
    where('productId', '==', productId),
    orderBy('createdAt', 'desc')
  );

  if (limit) {
    reviewQuery = query(reviewQuery, firestoreLimit(limit));
  }

  return onSnapshot(reviewQuery, (querySnapshot) => {
    const reviews: ProductReview[] = [];
    querySnapshot.forEach((doc) => {
      const reviewData = {
        id: doc.id,
        ...doc.data()
      } as ProductReview;
      reviews.push(reviewData);
    });
    console.log(`✅ Firebase - Real-time: ${reviews.length} reviews for product ${productId}`);
    callback(reviews);
  }, (error) => {
    console.error('❌ Firebase - Error in reviews subscription:', error);
  });
};

// Update an existing review
export const updateReview = async (reviewId: string, updateData: Partial<ProductReview>): Promise<void> => {
  try {
    const reviewRef = doc(db, REVIEWS_COLLECTION, reviewId);
    await updateDoc(reviewRef, {
      ...updateData,
      updatedAt: Timestamp.now()
    });
    console.log('Review updated successfully');
  } catch (error) {
    console.error('Error updating review:', error);
    throw new Error('Failed to update review. Please try again.');
  }
};

// Delete a review
export const deleteReview = async (reviewId: string): Promise<void> => {
  try {
    const reviewRef = doc(db, REVIEWS_COLLECTION, reviewId);
    await deleteDoc(reviewRef);
    console.log('Review deleted successfully');
  } catch (error) {
    console.error('Error deleting review:', error);
    throw new Error('Failed to delete review. Please try again.');
  }
};

// Get average rating for a product
export const getProductAverageRating = async (productId: string): Promise<{ averageRating: number; totalReviews: number }> => {
  try {
    const reviews = await fetchProductReviews(productId);
    
    if (reviews.length === 0) {
      return { averageRating: 0, totalReviews: 0 };
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = Math.round((totalRating / reviews.length) * 10) / 10; // Round to 1 decimal place

    return {
      averageRating,
      totalReviews: reviews.length
    };
  } catch (error) {
    console.error('Error calculating average rating:', error);
    return { averageRating: 0, totalReviews: 0 };
  }
};
