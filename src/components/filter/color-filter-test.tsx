import React from 'react';
import { FilterProvider } from '@/contexts/FilterContext';
import { Product } from '@/services/types';
import { useFilterContext } from '@/contexts/FilterContext';

// Test data with color variations including hex color codes (like from Firebase)
const testProductsWithColors: Product[] = [
    {
        id: '1',
        name: 'Stainless Steel Tumbler - Dark Blue',
        price: 25.00,
        sale_price: 20.00,
        category: 'office',
        subcategory: 'stationery',
        color: 'black',
        size: 'M',
        quantity: 10,
        image: '',
        description: 'Test product 1',
        slug: 'test-product-1',
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        variation: [
            {
                color: '#0e2a5d', // Dark blue hex code from Firebase
                colorName: 'Dark Blue',
                img: 'https://firebasestorage.googleapis.com/v0/b/nutandev-f7518.firebasestorage.app/o/imagevariant%2Fotg_flask_e704alt=media&token=ca9052c8-ae3e-4ac3-bf00-1817da242784',
                price: 25,
                quantity: 10,
                size: 'M',
                status: 'Available'
            },
            {
                color: '#FFFFFF', // White hex code
                colorName: 'White',
                img: '',
                price: 25,
                quantity: 5,
                size: 'M',
                status: 'Available'
            }
        ]
    },
    {
        id: '2',
        name: 'Office Stationery Set - Blue',
        price: 50.00,
        category: 'office',
        subcategory: 'stationery',
        color: 'blue',
        size: 'L',
        quantity: 5,
        image: '',
        description: 'Test product 2',
        slug: 'test-product-2',
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        variation: [
            {
                color: '#3b82f6', // Light blue hex code
                colorName: 'Light Blue',
                img: '',
                price: 50,
                quantity: 5,
                size: 'L',
                status: 'Available'
            },
            {
                color: '#ef4444', // Red hex code
                colorName: 'Red',
                img: '',
                price: 50,
                quantity: 3,
                size: 'L',
                status: 'Available'
            }
        ]
    },
    {
        id: '3',
        name: 'Eco Notebook - Green',
        price: 100.00,
        sale_price: 80.00,
        category: 'office',
        subcategory: 'stationery',
        color: 'green',
        size: 'XL',
        quantity: 3,
        image: '',
        description: 'Test product 3',
        slug: 'test-product-3',
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        variation: [
            {
                color: '#10b981', // Green hex code
                colorName: 'Green',
                img: '',
                price: 100,
                quantity: 3,
                size: 'XL',
                status: 'Available'
            }
        ]
    },
    {
        id: '4',
        name: 'Multi Color Pen Set',
        price: 75.00,
        category: 'office',
        subcategory: 'stationery',
        color: 'orange',
        size: 'M',
        quantity: 8,
        image: '',
        description: 'Test product 4 with multiple colors',
        slug: 'test-product-4',
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        variation_options: [
            {
                quantity: '5',
                price: 75,
                color: '#f59e0b', // Amber hex code
                status: 'active',
                options: []
            },
            {
                quantity: '3',
                price: 75,
                color: '#8b5cf6', // Purple hex code
                status: 'active',
                options: []
            }
        ]
    }
];

const ColorFilterTestContent: React.FC = () => {
    const {
        filteredProducts,
        selectedFilters,
        availableColors,
        handleFilterChange,
        hasAnyFilters,
        clearAllFilters,
    } = useFilterContext();

    return (
        <div className="p-4 bg-gray-100 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Color Filter Test</h3>
            
            <div className="mb-4">
                <h4 className="font-medium mb-2">Available Colors:</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                    {availableColors.map((color) => (
                        <div key={color.id} className="flex items-center gap-2">
                            <div 
                                className="w-4 h-4 rounded-full border border-gray-300"
                                style={{ backgroundColor: color.hex }}
                            />
                            <span className="text-sm">
                                {color.label} ({color.count})
                            </span>
                            <input
                                type="checkbox"
                                checked={selectedFilters.colors[color.id] || false}
                                onChange={(e) => handleFilterChange('colors', color.id, e.target.checked)}
                                className="ml-2"
                            />
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="mb-4">
                <button
                    onClick={clearAllFilters}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Clear All Filters
                </button>
            </div>
            
            <div className="mb-4">
                <p className="text-sm text-gray-600">
                    Showing {filteredProducts.length} of {testProductsWithColors.length} products
                </p>
                <p className="text-sm text-gray-600">
                    Has filters: {hasAnyFilters() ? 'Yes' : 'No'}
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredProducts.map((product) => (
                    <div key={product.id} className="bg-white p-3 rounded border">
                        <h4 className="font-medium">{product.name}</h4>
                        <p className="text-sm text-gray-600">
                            Price: ${product.sale_price || product.price}
                            {product.sale_price && product.sale_price < product.price && (
                                <span className="text-red-500 ml-1">(Sale!)</span>
                            )}
                        </p>
                        <div className="text-xs text-gray-500 mt-1">
                            <p>Base Color: {product.color}</p>
                            {product.variation && product.variation.length > 0 && (
                                <p>Variations: {product.variation.map(v => v.colorName || v.color).join(', ')}</p>
                            )}
                            {product.variation_options && product.variation_options.length > 0 && (
                                <p>Options: {product.variation_options.map(v => v.color).join(', ')}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ColorFilterTest: React.FC = () => {
    return (
        <FilterProvider products={testProductsWithColors}>
            <ColorFilterTestContent />
        </FilterProvider>
    );
};

export default ColorFilterTest;
