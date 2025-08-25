import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/config/firebase';

export interface FirebaseCategory {
  id: string | number;
  name: string;
  slug: string;
  image?: {
    id: string;
    thumbnail: string;
    original: string;
  };
  children?: FirebaseCategory[];
  productCount?: number;
  type?: string;
}

export interface TransformedCategory {
  id: string | number;
  name: string;
  slug: string;
  image?: {
    id: string;
    thumbnail: string;
    original: string;
  };
  children?: TransformedCategory[];
  productCount?: number;
  type?: string;
}

// Transform Firebase category data to match the expected interface
export const transformFirebaseCategory = (firebaseCategory: any): TransformedCategory => {
  return {
    id: firebaseCategory.id || '',
    name: firebaseCategory.name || '',
    slug: firebaseCategory.slug || '',
    image: firebaseCategory.image || undefined,
    children: firebaseCategory.children || undefined,
    productCount: firebaseCategory.productCount || 0,
    type: firebaseCategory.type || 'default',
  };
};

// Fetch all categories from Firebase
export const fetchCategoriesFromFirebase = async (): Promise<TransformedCategory[]> => {
  try {
    console.log('🔄 Fetching categories from Firebase...');
    
    const categoriesRef = collection(db, 'Categories');
    const q = query(categoriesRef, orderBy('name'));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      console.log('⚠️ No categories found in Firebase, using fallback categories');
      return getFallbackCategories();
    }
    
    const categories: TransformedCategory[] = [];
    querySnapshot.forEach((doc) => {
      const categoryData = doc.data();
      const transformedCategory = transformFirebaseCategory({
        id: doc.id,
        ...categoryData,
      });
      categories.push(transformedCategory);
    });
    
    console.log('✅ Categories fetched from Firebase:', categories.length);
    return categories;
  } catch (error) {
    console.error('❌ Error fetching categories from Firebase:', error);
    console.log('⚠️ Using fallback categories due to error');
    return getFallbackCategories();
  }
};

// Fallback categories that match the Firebase productCategory values
const getFallbackCategories = (): TransformedCategory[] => {
  return [
    {
      id: 1,
      name: 'Product Categories',
      slug: 'product-categories',
      image: {
        id: '1',
        thumbnail: '/assets/images/category/collection_1.jpg',
        original: '/assets/images/category/collection_1.jpg',
      },
      children: [
        {
          id: 1,
          name: 'Bags & Carry Items',
          slug: 'bags-carry-items',
          // This maps to productCategory: "bag" in Firebase
        },
        {
          id: 2,
          name: 'Gift Sets & Kits',
          slug: 'gift-sets-kits',
          // This maps to productCategory: "giftsets" in Firebase
        },
        {
          id: 3,
          name: 'Drinkware',
          slug: 'drinkware',
          // This maps to productCategory: "drinkware" in Firebase
        },
        {
          id: 4,
          name: 'Tech & Gadgets',
          slug: 'tech-gadgets',
          // This maps to productCategory: "technology" in Firebase
        },
        {
          id: 5,
          name: 'Office & Stationery',
          slug: 'office-stationery',
          // This maps to productCategory: "office" in Firebase
        },
        {
          id: 6,
          name: 'Eco Lifestyle',
          slug: 'eco-lifestyle',
          // This maps to productCategory: "lifestyle" in Firebase
        },
        {
          id: 7,
          name: 'Eco Events & Conference Essentials',
          slug: 'eco-events-conference-essentials',
          // This maps to productCategory: "events" in Firebase
        },
      ],
      productCount: 200,
      type: 'mega',
    },
  ];
};
