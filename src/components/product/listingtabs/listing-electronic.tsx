"use client";
import ListingTabs from "@/components/product/listingtabs/listing-ui/listing-tabs";
import ProductListing from "@/components/product/listingtabs/listing-ui/product-listing";
import { useFirebaseProductsByCategory } from "@/hooks/useFirebaseProducts";
import { useFirebaseCategories } from "@/hooks/useFirebaseProducts";
import Loading from "@/components/shared/loading";
import {LIMITS} from "@/services/utils/limits";
import {useListingTabs} from "@/hooks/use-listing-tabs";
import React from "react";

interface Props {
     variant?: string;
};

const ListingElectronic: React.FC<Props> = ({variant='default'}) => {
    const { activeTab, isPending, handleTabClick } = useListingTabs();
    
    // Fetch categories from Firebase
    const { data: categories, isLoading: categoriesLoading } = useFirebaseCategories();
    

    
    // Get the active category name based on activeTab
    const getActiveCategoryName = () => {
        if (!categories || !categories[0]?.children) return 'stationary';
        
        const activeChild = categories[0].children[activeTab - 1];
        const categoryName = activeChild?.name || 'Office & Stationery';
        
        // Map the display names to Firebase productCategory values
        const categoryMapping: { [key: string]: string } = {
            'Bags & Carry Items': 'bag',
            'Gift Sets & Kits': 'giftsets',
            'Drinkware': 'drinkware',
            'Tech & Gadgets': 'technology',
            'Office & Stationery': 'office',
            'Eco Lifestyle': 'lifestyle',
            'Eco Events & Conference Essentials': 'events'
        };
        
        const firebaseCategory = categoryMapping[categoryName] || 'stationary';
        console.log(`🎯 Tab: ${activeTab}, Display: "${categoryName}", Firebase: "${firebaseCategory}"`);
        
        return firebaseCategory;
    };
    
    const activeCategory = getActiveCategoryName();
    
    // Fetch products by category from Firebase
    const {
        data: products,
        isLoading: productsLoading,
        error
    } = useFirebaseProductsByCategory(activeCategory, LIMITS.ELETRONIC_PRODUCTS_LIMITS);
    
    // Debug: Log the products data to see if productID links are working
    React.useEffect(() => {
        if (products && products.length > 0) {
            console.log('🔍 Listing Electronic - Products received:', {
                category: activeCategory,
                productCount: products.length,
                firstProduct: products[0],
                productIds: products.map(p => p.id),
                productNames: products.map(p => p.name)
            });
        }
    }, [products, activeCategory]);
    

    
    return (
        <div className="mb-8 lg:mb-12">
            <div className="listing-tabs">
                <ListingTabs 
                    variant={variant} 
                    data={categories?.[0]} 
                    onNavClick={handleTabClick} 
                    activeTab={activeTab}
                />
                {isPending || categoriesLoading ? <Loading/>
                    : (
                    <ProductListing 
                        data={products || []} 
                        isLoading={productsLoading} 
                        variant={variant}
                    />
                )}
                
            </div>
        </div>
    );
}
export default ListingElectronic;
