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
        if (!data?.variation_options || !Array.isArray(data.variation_options)) {
            return {};
        }

        // Create variations object from Firebase data
        const variationsObj: any = {};
        
        // Handle color variations
        if (data.variation_options.some(v => v.color)) {
            const colorOptions = data.variation_options
                .filter(v => v.color)
                .map((v, index) => ({
                    id: index + 1,
                    attribute_id: 1,
                    value: v.color!,
                    image: v.options?.[0]?.image || ''
                }));
            
            if (colorOptions.length > 0) {
                variationsObj['color'] = {
                    type: 'rectangleColor',
                    options: colorOptions
                };
            }
        }

        // Handle size variations
        if (data.variation_options.some(v => v.options && v.options.length > 0)) {
            const sizeOptions = data.variation_options
                .flatMap(v => v.options || [])
                .filter((option, index, arr) => 
                    arr.findIndex(o => o.value === option.value) === index
                )
                .map((option, index) => ({
                    id: index + 1,
                    attribute_id: 2,
                    value: option.value,
                    image: option.image || ''
                }));
            
            if (sizeOptions.length > 0) {
                variationsObj['size'] = {
                    type: 'rectangle', // Changed from 'dropdown' to 'rectangle' for better visual layout
                    options: sizeOptions
                };
            }
        }

        return variationsObj;
    }, [data?.variation_options]);

    const isSelected = !isEmpty(variations)
        ? !isEmpty(attributes) && Object.keys(variations).every((variation) => attributes.hasOwnProperty(variation))
        : true;

    const sortedAttributeValues = useMemo(() => Object.values(attributes).sort(), [attributes]);

    useEffect(() => {
        if (!isSelected) return;
        setErrorAttributes(false);

        // Find the selected variation based on Firebase data
        if (data?.variation_options && Array.isArray(data.variation_options)) {
            let selectedVariationData: any = null;
            
            // Debug: Log the variation data
            console.log('🔍 Firebase variation data:', data.variation_options);
            console.log('🎯 Selected attributes:', attributes);
            
            // Find variation that matches selected attributes
            for (const variation of data.variation_options) {
                let matches = true;
                
                if (attributes.color && variation.color !== attributes.color) {
                    matches = false;
                }
                
                if (attributes.size && variation.options && !variation.options.some(opt => opt.value === attributes.size)) {
                    matches = false;
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