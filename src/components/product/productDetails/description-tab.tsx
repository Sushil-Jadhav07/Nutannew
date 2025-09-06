"use client";
import {Tab, TabGroup, TabList, TabPanel, TabPanels} from '@headlessui/react';
import cn from 'classnames';
import {usePanel} from "@/contexts/usePanel";
import {colorMap} from "@/data/color-settings";
import descriptionData from './description-data';
import { Product } from '@/services/types';
import React from 'react';
import ProductReview from './product-review';

interface DescriptionTabProps {
    data?: Product;
}

export default function DescriptionTab({ data }: DescriptionTabProps) {
    const { selectedColor } = usePanel();
    
    // Helper function to safely render HTML content
    const renderHTMLContent = (htmlContent: string) => {
        if (!htmlContent || typeof htmlContent !== 'string') {
            return '';
        }
        
        // Basic safety: remove potentially dangerous content
        let sanitized = htmlContent
            // Remove script tags and their content
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            // Remove iframe tags and their content
            .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
            // Remove object tags and their content
            .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
            // Remove embed tags and their content
            .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '')
            // Remove javascript: protocol
            .replace(/javascript:/gi, '')
            // Remove data: protocol (potential data URIs)
            .replace(/data:/gi, '')
            // Remove event handlers
            .replace(/on\w+\s*=/gi, '')
            // Remove style attributes that might contain dangerous CSS
            .replace(/style\s*=\s*["'][^"']*["']/gi, '')
            // Remove any remaining potentially dangerous attributes
            .replace(/\s+(on\w+|javascript|vbscript|expression)\s*=/gi, '');
        
        return sanitized;
    };
    
    // Debug: Log the data being received
    React.useEffect(() => {
        if (data) {
            console.log('🔍 DescriptionTab received data:', {
                productDimension: data.productDimension,
                customDimensions: data.customDimensions,
                variation_options: data.variation_options,
                description: data.description,
                descriptionType: typeof data.description
            });
        }
    }, [data]);
    
    // Create dynamic description data based on Firebase product data
    const getDynamicDescriptionData = () => {
        if (!data) return descriptionData;
        
        return {
            Description: (
                <div className="text-sm sm:text-15px text-brand-muted leading-[2em] space-y-4 lg:space-y-5">
                    {data.description ? (
                        <div 
                            dangerouslySetInnerHTML={{ __html: renderHTMLContent(data.description) }}
                            className="html-content"
                            style={{
                                lineHeight: '1.8',
                                fontSize: '14px'
                            }}
                        />
                    ) : (
                        <p>
                            iPad Air with a vibrant 10.9-inch Liquid Retina display. Breakthrough Apple M1 chip for
                            faster performance, making iPad Air super-powerful for creativity and mobile gaming. Get Touch ID, an
                            advanced camera, lightning-fast 5G2 and Wi-Fi 6, a USB-C port, and support for the Magic Keyboard and Apple Pencil (2nd generation).
                        </p>
                    )}
                    
                    {/* Firebase banner images instead of gallery */}
                    {data.bannerImageOne && typeof data.bannerImageOne === 'string' && data.bannerImageOne.trim() !== "" && (
                        <img
                            src={data.bannerImageOne}
                            alt={`${data.name} - Banner 1`}
                            className="object-cover w-full max-w-4xl rounded-lg shadow-md"
                        />
                    )}
                    
                    {data.bannerImageTwo && typeof data.bannerImageTwo === 'string' && data.bannerImageTwo.trim() !== "" && (
                        <img
                            src={data.bannerImageTwo}
                            alt={`${data.name} - Banner 2`}
                            className="object-cover w-full max-w-4xl rounded-lg shadow-md mt-4"
                        />
                    )}
                    
                    
                </div>
            ),
            Additional_Information: (
                <table className="w-full text-sm">
                    <tbody>
                    
                    
                    {/* Firebase productDimension fields */}
                    {data.productDimension && Array.isArray(data.productDimension) && data.productDimension.length > 0 && (
                        <>
                            {/* Display all productDimension entries */}
                            {data.productDimension.map((dimension: any, index: number) => (
                                <React.Fragment key={index}>
                                    {dimension.color && (
                                        <tr className={index % 2 === 0 ? '' : 'bg-gray-50'}>
                                            <td className="py-3 px-4 text-brand-dark font-medium w-1/4">
                                                {index === 0 ? 'Color' : `Color ${index + 1}`}
                                            </td>
                                            <td className="py-3 px-4">{dimension.color}</td>
                                        </tr>
                                    )}
                                    {dimension.dimensions && (
                                        <tr className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                                            <td className="py-3 px-4 text-brand-dark font-medium w-1/4">
                                                {index === 0 ? 'Dimensions' : `Dimensions ${index + 1}`}
                                            </td>
                                            <td className="py-3 px-4">{dimension.dimensions}</td>
                                        </tr>
                                    )}
                                    {dimension.materials && (
                                        <tr className={index % 2 === 0 ? '' : 'bg-gray-50'}>
                                            <td className="py-3 px-4 text-brand-dark font-medium w-1/4">
                                                {index === 0 ? 'Materials' : `Materials ${index + 1}`}
                                            </td>
                                            <td className="py-3 px-4">{dimension.materials}</td>
                                        </tr>
                                    )}
                                    {dimension.weight && (
                                        <tr className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                                            <td className="py-3 px-4 text-brand-dark font-medium w-1/4">
                                                {index === 0 ? 'Weight' : `Weight ${index + 1}`}
                                            </td>
                                            <td className="py-3 px-4">{dimension.weight}</td>
                                        </tr>
                                    )}
                                    {dimension.note && dimension.note.trim() !== '' && (
                                        <tr className={index % 2 === 0 ? '' : 'bg-gray-50'}>
                                            <td className="py-3 px-4 text-brand-dark font-medium w-1/4">
                                                {index === 0 ? 'Note' : `Note ${index + 1}`}
                                            </td>
                                            <td className="py-3 px-4">{dimension.note}</td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </>
                    )}
                    
                    {/* Firebase customDimensions fields */}
                    {data.customDimensions && Array.isArray(data.customDimensions) && data.customDimensions.length > 0 && (
                        <>
                            {data.customDimensions.map((customDim: any, index: number) => (
                                <tr key={index} className={index % 2 === 0 ? '' : 'bg-gray-50'}>
                                    <td className="py-3 px-4 text-brand-dark font-medium w-1/4">
                                        {customDim.title || `Custom ${index + 1}`}
                                    </td>
                                    <td className="py-3 px-4">
                                        {customDim.value || 'N/A'}
                                    </td>
                                </tr>
                            ))}
                        </>
                    )}
                    </tbody>
                </table>
            ),
            Return_Policies: descriptionData.Return_Policies,
            Review_Rating: (
                <ProductReview productId={data?.id?.toString() || ''} />
            )
        };
    };

    const dynamicDescriptionData = getDynamicDescriptionData();

    return (
        <div className="w-full p-5 md:p-7 bg-white rounded mb-8 lg:mb-10">
            <TabGroup>
                <TabList className=" border-b border-border-base flex flex-wrap gap-2">
                    {Object.entries(dynamicDescriptionData).map(([key]) => (
                        <Tab
                            key={key}
                            className={({selected}) =>
                                cn(
                                    colorMap[selectedColor].hoverLink,
                                    'relative inline-block border-b-2 transition-all text-base font-semibold uppercase leading-5  focus:outline-none pb-2 md:pb-4 mt-2 xs:mt-0  me-5 xl:me-10 ',
                                    selected
                                        ? `text-brand-dark  ${colorMap[selectedColor].border}`
                                        : ' border-transparent'
                                )
                            }
                        >
                            {key.split('_').join(' ')}
                        </Tab>
                    ))}
                </TabList>
                <TabPanels className="mt-6 lg:mt-9">
                    {Object.entries(dynamicDescriptionData).map(([key, content]) => (
                        <TabPanel key={key}>
                            {content}
                        </TabPanel>
                    ))}
                </TabPanels>
            </TabGroup>
        </div>
    );
}