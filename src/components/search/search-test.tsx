import React from 'react';
import { useAdvancedSearch } from '@/hooks/use-advanced-search';
import { Product } from '@/services/types';

// Test data with various products
const testProducts: Product[] = [
    {
        id: '1',
        name: 'Stainless Steel Tumbler',
        price: 25.00,
        sale_price: 20.00,
        category: [{ id: 1, name: 'Drinkware', slug: 'drinkware' }],
        subcategory: 'stainlesssteeltumblers',
        brand: 'EcoBrand',
        color: 'black',
        size: 'M',
        quantity: 10,
        image: '',
        description: 'High-quality stainless steel tumbler for hot and cold drinks',
        slug: 'stainless-steel-tumbler',
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: '2',
        name: 'Office Stationery Set',
        price: 50.00,
        category: [{ id: 2, name: 'Office & Stationery', slug: 'office-stationery' }],
        subcategory: 'stationery',
        brand: 'OfficePro',
        color: 'blue',
        size: 'L',
        quantity: 5,
        image: '',
        description: 'Complete office stationery set with pens, notebooks, and folders',
        slug: 'office-stationery-set',
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: '3',
        name: 'Eco Notebook - Green',
        price: 100.00,
        sale_price: 80.00,
        category: [{ id: 3, name: 'Office & Stationery', slug: 'office-stationery' }],
        subcategory: 'notebooks',
        brand: 'EcoBrand',
        color: 'green',
        size: 'XL',
        quantity: 3,
        image: '',
        description: 'Eco-friendly notebook made from recycled materials',
        slug: 'eco-notebook-green',
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: '4',
        name: 'Tech Gadget Organizer',
        price: 75.00,
        category: [{ id: 4, name: 'Tech & Gadgets', slug: 'tech-gadgets' }],
        subcategory: 'organizers',
        brand: 'TechPro',
        color: 'black',
        size: 'M',
        quantity: 8,
        image: '',
        description: 'Organizer for tech gadgets and accessories',
        slug: 'tech-gadget-organizer',
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: '5',
        name: 'Leather Folder - Brown',
        price: 120.00,
        category: [{ id: 5, name: 'Office & Stationery', slug: 'office-stationery' }],
        subcategory: 'folders',
        brand: 'LeatherCraft',
        color: 'brown',
        size: 'L',
        quantity: 4,
        image: '',
        description: 'Premium leather folder for documents and papers',
        slug: 'leather-folder-brown',
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }
];

const SearchTest: React.FC = () => {
    const {
        query,
        setQuery,
        searchResults,
        suggestions,
        searchStats,
        handleSearch,
        clearSearch
    } = useAdvancedSearch({
        products: testProducts,
        searchIn: ['name', 'category', 'subcategory'],
        enableSuggestions: true,
        maxSuggestions: 5
    });

    return (
        <div className="p-6 bg-gray-100 rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Enhanced Search Test</h2>
            
            {/* Search Input */}
            <div className="mb-6">
                <div className="relative">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder="Search products, categories, brands..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {query && (
                        <button
                            onClick={clearSearch}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            ✕
                        </button>
                    )}
                </div>
                
                {/* Search Suggestions */}
                {suggestions.length > 0 && query.length > 1 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                        {suggestions.map((suggestion, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setQuery(suggestion);
                                    clearSearch();
                                }}
                                className="w-full text-left px-4 py-2 hover:bg-gray-100 border-b border-gray-100 last:border-b-0"
                            >
                                {suggestion}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Search Statistics */}
            <div className="mb-6 p-4 bg-white rounded-lg">
                <h3 className="font-semibold mb-2">Search Statistics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                        <span className="text-gray-600">Total Products:</span>
                        <span className="ml-2 font-semibold">{searchStats.totalProducts}</span>
                    </div>
                    <div>
                        <span className="text-gray-600">Found:</span>
                        <span className="ml-2 font-semibold">{searchStats.foundProducts}</span>
                    </div>
                    <div>
                        <span className="text-gray-600">Status:</span>
                        <span className="ml-2 font-semibold">{searchStats.searchTime}</span>
                    </div>
                    <div>
                        <span className="text-gray-600">Has Results:</span>
                        <span className="ml-2 font-semibold">{searchStats.hasResults ? 'Yes' : 'No'}</span>
                    </div>
                </div>
            </div>

            {/* Search Results */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">
                    Search Results {query && `for "${query}"`}
                </h3>
                
                {searchStats.isEmpty ? (
                    <div className="text-center py-8 text-gray-500">
                        No products found for "{query}". Try a different search term.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {searchResults.map((product) => (
                            <div key={product.id} className="bg-white p-4 rounded-lg border shadow-sm">
                                <h4 className="font-semibold text-lg mb-2">{product.name}</h4>
                                <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                                <div className="space-y-1 text-sm text-gray-500">
                                    <p><span className="font-medium">Category:</span> {product.category?.[0]?.name}</p>
                                    <p><span className="font-medium">Subcategory:</span> {product.subcategory}</p>
                                    <p><span className="font-medium">Brand:</span> {product.brand}</p>
                                    <p><span className="font-medium">Price:</span> ${product.sale_price || product.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Search Examples */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold mb-2">Try searching for:</h4>
                <div className="flex flex-wrap gap-2">
                    {['tumbler', 'stationery', 'office', 'eco', 'leather', 'tech', 'notebook', 'folder'].map((term) => (
                        <button
                            key={term}
                            onClick={() => handleSearch(term)}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors"
                        >
                            {term}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchTest;
