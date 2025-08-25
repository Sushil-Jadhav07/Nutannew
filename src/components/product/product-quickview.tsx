
import {useModalAction, useModalState,} from '@/components/common/modal/modalContext';
import CloseButton from '@/components/shared/close-button';
import { useState } from 'react';
import { useFirebaseProduct } from "@/hooks/useFirebaseProduct";
import Loading from '@/components/shared/loading';
import { IoExpandOutline } from 'react-icons/io5';
import { Shield, Check } from 'lucide-react';

import ProductGallery from "@/components/product/productDetails/product-gallery";
import ProductView from "@/components/product/productDetails/product-view";

export default function ProductQuickview() {
    const {data: modalData} = useModalState();
    const {closeModal} = useModalAction();
    const [selectedVariation, setSelectedVariation] = useState<any>(null);
    const [isFullScreen, setIsFullScreen] = useState(false);

    // Fetch complete product data including variations from Firebase
    const {data: productData, isLoading, error} = useFirebaseProduct(modalData?.id || '');

    // Use Firebase data if available, otherwise fall back to modal data
    const data = productData || modalData;

    const toggleFullScreen = () => {
        setIsFullScreen(!isFullScreen);
    };

    if (isLoading) {
        return (
            <div className="md:w-[600px] lg:w-[940px] xl:w-[1180px] mx-auto p-3 lg:p-7 bg-white rounded-md">
                <CloseButton onClick={closeModal}/>
                <div className="flex items-center justify-center h-64">
                    <Loading />
                </div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="md:w-[600px] lg:w-[940px] xl:w-[1180px] mx-auto p-3 lg:p-7 bg-white rounded-md">
                <CloseButton onClick={closeModal}/>
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <p className="text-red-500 mb-2">Error loading product details</p>
                        <p className="text-gray-500 text-sm">Please try again later</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`${isFullScreen ? 'fixed inset-0 z-50' : 'md:w-[600px] lg:w-[940px] xl:w-[1180px] mx-auto'} p-3 lg:p-7 bg-white rounded-md transition-all duration-300`}>
           
                <CloseButton onClick={closeModal}/>

            <div className="grid-cols-12 lg:grid gap-7 2xl:gap-10">
                <ProductGallery 
                    data={data} 
                    className={"col-span-6 "}
                    selectedVariation={selectedVariation}
                />
                <div className="col-span-6">
                    <ProductView 
                        data={data} 
                        className={""} 
                        variant={"quickview"}
                        onVariationChange={setSelectedVariation}
                    />
                    
                   
                </div>
            </div>
        </div>
    );
}
