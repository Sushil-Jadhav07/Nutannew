import React from 'react';
import { FilterProvider } from '@/contexts/FilterContext';
import { Product } from '@/services/types';
import { useFilterContext } from '@/contexts/FilterContext';

// Test data
const testProducts: Product[] = [
    {
        id: '1',
        name: 'Test Product 1',
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
    },
    {
        id: '2',
        name: 'Test Product 2',
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
    },
    {
        id: '3',
        name: 'Test Product 3',
        price: 100.00,
        sale_price: 80.00,
        category: 'office',
        subcategory: 'stationery',
        color: 'red',
        size: 'XL',
        quantity: 3,
        image: '',
        description: 'Test product 3',
        slug: 'test-product-3',
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: '4',
        name: 'Test Product 4',
        price: 1200.00,
        category: 'office',
        subcategory: 'stationery',
        color: 'green',
        size: 'XXL',
        quantity: 2,
        image: '',
        description: 'Test product 4 - high price',
        slug: 'test-product-4',
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

const PriceFilterTestContent: React.FC = () => {
    const {
        filteredProducts,
        selectedFilters,
        handlePriceChange,
        MIN_PRICE,
        MAX_PRICE,
        hasAnyFilters,
        clearAllFilters,
    } = useFilterContext();

    return (
        <div className="p-4 bg-gray-100 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Price Filter Test</h3>
            
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                    Price Range: ${selectedFilters.price[0]} - ${selectedFilters.price[1]}
                </label>
                <input
                    type="range"
                    min={MIN_PRICE}
                    max={MAX_PRICE}
                    value={selectedFilters.price[1]}
                    onChange={(e) => handlePriceChange([selectedFilters.price[0], parseInt(e.target.value)])}
                    className="w-full"
                />
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
                    Showing {filteredProducts.length} of {testProducts.length} products
                </p>
                <p className="text-sm text-gray-600">
                    Price range: ${MIN_PRICE} - ${MAX_PRICE}
                </p>
                <p className="text-sm text-gray-600">
                    Has filters: {hasAnyFilters() ? 'Yes' : 'No'}
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                    <div key={product.id} className="bg-white p-3 rounded border">
                        <h4 className="font-medium">{product.name}</h4>
                        <p className="text-sm text-gray-600">
                            Price: ${product.sale_price || product.price}
                            {product.sale_price && product.sale_price < product.price && (
                                <span className="text-red-500 ml-1">(Sale!)</span>
                            )}
                        </p>
                        <p className="text-xs text-gray-500">
                            Color: {product.color} | Size: {product.size}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const PriceFilterTest: React.FC = () => {
    return (
        <FilterProvider products={testProducts}>
            <PriceFilterTestContent />
        </FilterProvider>
    );
};

export default PriceFilterTest;
