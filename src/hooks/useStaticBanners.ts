import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';

interface FirebaseStaticBanner {
  id: string;
  bannerId: number;
  title?: string; // Optional
  subtitle?: string; // Optional
  imageUrl: string; // Required
  path: string; // Required for navigation
  status: string; // Required
  createdAt: any;
}

interface TransformedStaticBanner {
  id: string;
  title: string;
  slug: string;
  image: {
    mobile: {
      url: string;
      width: number;
      height: number;
    };
    desktop: {
      url: string;
      width: number;
      height: number;
    };
  };
  // Keep all existing banner properties for compatibility
  [key: string]: any;
}

export const useStaticBanners = () => {
  const [banners, setBanners] = useState<TransformedStaticBanner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStaticBanners = async () => {
      try {
        setLoading(true);
        
        // Fetch all static banners from Firebase
        const staticBannersRef = collection(db, 'staticBanners');
        const q = query(staticBannersRef, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        
        console.log('Firebase staticBanners query result:', querySnapshot.size, 'documents found');
        
        const bannersData: TransformedStaticBanner[] = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data() as FirebaseStaticBanner;
          console.log('Static banner data:', doc.id, data);
          
          // Only process banners that have imageUrl, path, and are published (title and subtitle are optional)
          if (data.imageUrl && data.path && data.status === 'published') {
            // Transform Firebase data to match the expected banner format
            const transformedBanner: TransformedStaticBanner = {
              id: doc.id,
              title: data.title || 'Banner', // Default title if not provided
              slug: data.path, // Use the path from Firebase for navigation
              // Transform image to match expected structure
              image: {
                mobile: {
                  url: data.imageUrl,
                  width: 541, // Default mobile width
                  height: 220, // Default mobile height
                },
                desktop: {
                  url: data.imageUrl,
                  width: 441, // Default desktop width
                  height: 185, // Default desktop height
                },
              },
              // Add any additional Firebase fields
              subtitle: data.subtitle || '', // Default empty string if not provided
              status: data.status,
              createdAt: data.createdAt,
              bannerId: data.bannerId,
            };
            
            console.log('Transformed static banner:', transformedBanner);
            bannersData.push(transformedBanner);
          } else {
            if (!data.imageUrl) {
              console.log('Skipping static banner due to missing imageUrl:', doc.id, data);
            } else if (!data.path) {
              console.log('Skipping static banner due to missing path:', doc.id, data);
            } else if (data.status !== 'published') {
              console.log('Skipping static banner due to non-published status:', doc.id, data);
            }
          }
        });
        
        console.log('Transformed static banners:', bannersData);
        console.log(`Successfully processed ${bannersData.length} out of ${querySnapshot.size} static banners`);
        setBanners(bannersData);
        setError(null);
      } catch (err) {
        console.error('Error fetching static banners:', err);
        setError('Failed to fetch static banners');
        // Fallback to empty array if Firebase fails
        setBanners([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStaticBanners();
  }, []);

  return { banners, loading, error };
};
