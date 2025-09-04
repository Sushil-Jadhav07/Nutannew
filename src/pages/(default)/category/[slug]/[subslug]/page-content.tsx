import { Element } from 'react-scroll';
import { useState } from 'react';
import TopBar from '@/components/category/top-bar';
import Filters from '@/components/filter/filters';
import DrawerFilter from '@/components/category/drawer-filter';
import { LIMITS } from '@/services/utils/limits';
import { ProductMain } from '@/components/product/productListing/product-main';
import { useFirebaseProductsBySubCategory } from '@/hooks/useFirebaseProducts';
import { useParams } from 'react-router-dom';

export default function SubCategoryContent() {
  const [viewAs, setViewAs] = useState(Boolean(true));
  const { slug, subslug } = useParams();

  // Map subslug to Firebase productSubCategory
  const slugToSubCategory: Record<string, string> = {
    // Bags & Carry Items subcategories
    'laptop-bags': 'laptopbags',
    'tote-bags': 'totebags',
    'tech-organizers': 'techorganizers',
    'drawstring-pouches': 'drawstringpouches',
    'welcome-kit-bags': 'welcomekitbags',
    
    // Tech & Gadgets subcategories
    'wireless-chargers': 'wirelesschargers',
    'charging-cables': 'chargingcables',
    'wireless-mice': 'wirelessmice',
    'tech-gift-sets': 'techgiftsets',
    'usb-essentials': 'usbessentials',
    
    // Office & Stationery subcategories
    'eco-notebooks': 'econotebooks',
    'leather-folders': 'leatherfolders',
    'sticky-notes-memo-pads': 'stickynotesmemopads',
    'eco-pens-writing-tools': 'ecopenswritingtools',
    'executive-stationery': 'executivestationery',
    
    // Drinkware subcategories
    'reusable-bottles': 'reusablebottles',
    'eco-mugs-with-lids': 'ecomugswithlids',
    'stainless-steel-tumblers': 'stainlesssteeltumblers',
    'sippers-with-straps': 'sipperswithstraps',
    
    // Gift Sets & Kits subcategories
    'welcome-kits': 'welcomekits',
    'festive-gift-sets': 'festivegiftsets',
    'corporate-combo-packs': 'corporatecombopacks',
    'custom-bundles': 'custombundles',
    
    // Eco Lifestyle subcategories
    'bamboo-cutlery-sets': 'bamboocutlerysets',
    'eco-coasters': 'ecocoasters',
    'cork-wheat-straw-accessories': 'corkwheatstrawaccessories',
    'recycled-material-goods': 'recycledmaterialgoods',
    
    // Events & Conference Essentials subcategories
    'biodegradable-lanyards': 'biodegradablelanyards',
    'name-card-holders': 'namecardholders',
    'eco-folders': 'ecofolders',
    'conference-giveaways': 'conferencegiveaways',
  };

  const firebaseSubCategory = slugToSubCategory[String(subslug || '').toLowerCase()] || '';
  const limit = LIMITS.PRODUCTS_LIMITS;
  
  // Debug logging
  console.log('🔍 Subcategory Page Debug:', {
    slug,
    subslug,
    firebaseSubCategory,
    limit
  });
  
  const { data, isLoading } = useFirebaseProductsBySubCategory(firebaseSubCategory, limit);
  
  // Debug the data
  console.log('🔍 Subcategory Data:', {
    data,
    isLoading,
    dataLength: data?.length || 0
  });

  return (
    <Element name="subcategory" className="flex products-category">
      <div className="sticky hidden lg:block h-full shrink-0 ltr:pr-7 rtl:pl-7   w-[300px] top-16 ">
        <Filters />
      </div>
      <div className="w-full">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-brand-dark capitalize">{String(subslug).replace(/-/g,' ')}</h2>
        </div>
        <DrawerFilter />
        <TopBar viewAs={viewAs} setViewAs={setViewAs} />
        <ProductMain data={data} isLoading={isLoading} viewAs={viewAs} />
      </div>
    </Element>
  );
}


