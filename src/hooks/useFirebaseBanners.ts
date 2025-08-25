import { useState, useEffect } from 'react';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';

interface FirebaseBanner {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  status: string;
  createdAt: any;
}

interface TransformedBanner {
  id: string;
  title: string;
  description: string;
  btnText: string;
  btnUrl: string;
  image: {
    mobile: {
      url: string;
    };
    desktop: {
      url: string;
    };
  };
  // Keep all existing banner properties for compatibility
  [key: string]: any;
}

export const useFirebaseBanners = () => {
  const [banners, setBanners] = useState<TransformedBanner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setLoading(true);
        
        // Fetch all banners first to see what's available
        const bannersRef = collection(db, 'banners');
        const querySnapshot = await getDocs(bannersRef);
        console.log('Firebase query result:', querySnapshot.size, 'documents found');
        
        const bannersData: TransformedBanner[] = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data() as FirebaseBanner;
          console.log('Banner data:', doc.id, data);
          
          // Only process banners that have the required fields AND are NOT active
          if (data.title && data.subtitle && data.imageUrl && data.status !== 'active') {
            // Transform Firebase data to match the expected banner format
            // while preserving all existing banner functionality
            const transformedBanner: TransformedBanner = {
              id: doc.id,
              title: data.title,
              description: data.subtitle,
              // Keep default button functionality
              btnText: 'Shop Now',
              btnUrl: '/',
              // Transform image to match expected structure
              image: {
                mobile: {
                  url: data.imageUrl,
                },
                desktop: {
                  url: data.imageUrl,
                },
              },
              // Add any additional Firebase fields
              status: data.status,
              createdAt: data.createdAt,
              // You can add more default values here if needed
              // For example, if you want to add more button options
              showButton: true,
              buttonStyle: 'primary',
            };
            
            console.log('Transformed banner:', transformedBanner);
            bannersData.push(transformedBanner);
          } else {
            if (!data.title || !data.subtitle || !data.imageUrl) {
              console.log('Skipping banner due to missing required fields:', doc.id, data);
            } else if (data.status === 'active') {
              console.log('Skipping banner due to active status:', doc.id, data);
            }
          }
        });
        
        console.log('Transformed banners:', bannersData);
        console.log(`Successfully processed ${bannersData.length} out of ${querySnapshot.size} banners`);
        setBanners(bannersData);
        setError(null);
      } catch (err) {
        console.error('Error fetching banners:', err);
        setError('Failed to fetch banners');
        // Fallback to empty array if Firebase fails
        setBanners([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  return { banners, loading, error };
};
