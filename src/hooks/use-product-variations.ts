import { useEffect, useMemo, useState } from "react";
import { Product, VariationOption } from "@/services/types";
import isEmpty from "lodash/isEmpty";
import isEqual from "lodash/isEqual";

// Define types for variations and attributes
interface Attributes {
    [key: string]: string;
}

const useProductVariations = (data?: Product) => {
    const [attributes, setAttributes] = useState<Attributes>({});
    const [errorAttributes, setErrorAttributes] = useState<boolean>(false);
    const [selectedVariation, setSelectedVariation] = useState<VariationOption | undefined>(undefined);

    // Handle Firebase variation data structure
    const variations = useMemo(() => {
        console.log('🔧 Creating variations from Firebase data...');
        console.log('🔧 variation_options:', data?.variation_options);
        console.log('🔧 variation:', data?.variation);
        
        // Check both variation_options and variation fields
        const variationData = data?.variation_options || data?.variation;
        
        if (!variationData || !Array.isArray(variationData)) {
            console.log('❌ No variation data found or not array');
            return {};
        }

        // Create variations object from Firebase data
        const variationsObj: any = {};
        
        // Handle color variations
        if (variationData.some((v: any) => v.color)) {
            const colorOptions = variationData
                .filter((v: any) => v.color)
                .map((v: any, index: number) => ({
                    id: index + 1,
                    attribute_id: 1,
                    value: v.color, // Keep the exact color value from Firebase
                    image: v.img || v.options?.[0]?.image || '' // Use v.img for Firebase format
                }));
            
            if (colorOptions.length > 0) {
                console.log('🎨 ==> COLOR OPTIONS CREATED <==');
                console.log('🎨 Available colors from Firebase:', colorOptions.map(opt => ({color: opt.value, image: opt.image})));
                console.log('🎨 These will be the clickable color buttons');
                variationsObj['color'] = {
                    type: 'rectangleColor',
                    options: colorOptions
                };
            }
        }

        // Handle size variations
        const sizeData = variationData.filter((v: any) => v.size);
        if (sizeData.length > 0) {
            const allSizes = sizeData.flatMap((v: any) => {
                if (Array.isArray(v.size)) {
                    return v.size;
                } else if (typeof v.size === 'string' && v.size.trim()) {
                    return [v.size];
                } else if (typeof v.size === 'object' && v.size !== null) {
                    return Object.values(v.size).filter(Boolean);
                }
                return [];
            });
            
            // Remove duplicates
            const uniqueSizes = [...new Set(allSizes)];
            
            if (uniqueSizes.length > 0) {
                const sizeOptions = uniqueSizes.map((size: any, index: number) => ({
                    id: index + 1,
                    attribute_id: 2,
                    value: size,
                    image: ''
                }));
                
                console.log('📏 Created size options:', sizeOptions);
                variationsObj['size'] = {
                    type: 'rectangle',
                    options: sizeOptions
                };
            }
        }

        console.log('✅ Final variations object:', variationsObj);
        return variationsObj;
    }, [data?.variation_options, data?.variation]);

    // Allow partial selection - as long as we have at least one attribute selected
    const isSelected = !isEmpty(variations)
        ? !isEmpty(attributes) // Just need at least one attribute selected
        : true;

    const sortedAttributeValues = useMemo(() => Object.values(attributes).sort(), [attributes]);

    useEffect(() => {
        console.log('🚀 useEffect triggered - isSelected:', isSelected, 'attributes:', attributes);
        if (!isSelected) {
            console.log('❌ Not selected, skipping variation matching');
            return;
        }
        setErrorAttributes(false);

        // Find the selected variation based on Firebase data
        const variationData = data?.variation_options || data?.variation;
        if (variationData && Array.isArray(variationData)) {
            let selectedVariationData: any = null;
            
            // Debug: Log the variation data
            console.log('🔍 Firebase variation data:', variationData);
            console.log('🎯 Selected attributes:', attributes);
            
            // Find variation that matches selected attributes
            for (const variation of variationData) {
                let matches = true;
                
                // Check color match if color is selected
                if (attributes.color && variation.color && variation.color !== attributes.color) {
                    matches = false;
                }
                
                // Check size match if size is selected
                if (attributes.size && variation.options && variation.options.length > 0 && !variation.options.some(opt => opt.value === attributes.size)) {
                    matches = false;
                }
                
                // If only color is selected and variation has that color, it's a match
                if (attributes.color && !attributes.size && variation.color === attributes.color) {
                    matches = true;
                }
                
                if (matches) {
                    console.log('✅ Found matching variation:', variation);
                    selectedVariationData = {
                        id: 1, // Use a default ID since Firebase variations don't have an id field
                        title: `${attributes.color || ''} ${attributes.size || ''}`.trim(),
                        price: variation.price || data.price,
                        sale_price: variation.price || data.price,
                        quantity: Number(variation.quantity) || 0, // Convert to number and use variation array quantity
                        is_disable: Number(variation.quantity) === 0 ? 1 : 0,
                        sku: data.sku || '',
                        options: Object.entries(attributes).map(([key, value]) => ({
                            name: key,
                            value: value
                        }))
                    };
                    console.log('🎯 Created selectedVariationData:', selectedVariationData);
                    break;
                }
            }
            
            setSelectedVariation(selectedVariationData);
        }
    }, [isSelected, data, attributes, sortedAttributeValues]);

    return {
        attributes,
        setAttributes,
        variations,
        selectedVariation,
        isSelected,
        errorAttributes,
        setErrorAttributes,
    };
};

export default useProductVariations;