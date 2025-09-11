import React, { useState, useEffect } from 'react';
import { useFirebaseAllProducts } from '@/hooks/useFirebaseProducts';
import { advancedSearchProducts } from '@/utils/search-filter';

const SearchDebug: React.FC = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const { data: allProducts, isLoading } = useFirebaseAllProducts(100);

    useEffect(() => {
        if (query.length >= 2 && allProducts) {
            console.log('Debug search for:', query);
            console.log('Available products:', allProducts.length);
            
            const searchResults = advancedSearchProducts(allProducts, query);
            console.log('Search results:', searchResults);
            
            setResults(searchResults.map(r => r.product));
        } else {
            setResults([]);
        }
    }, [query, allProducts]);

    return (
        <div className="p-4 bg-yellow-100 border border-yellow-300 rounded-lg m-4">
            <h3 className="text-lg font-bold mb-4">Search Debug Component</h3>
            
            <div className="mb-4">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Type to search (e.g., 'RE', 'tumbler', 'office')"
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                />
            </div>

            <div className="mb-4">
                <p><strong>Query:</strong> "{query}"</p>
                <p><strong>Products loaded:</strong> {allProducts?.length || 0}</p>
                <p><strong>Results found:</strong> {results.length}</p>
                <p><strong>Loading:</strong> {isLoading ? 'Yes' : 'No'}</p>
            </div>

            {results.length > 0 && (
                <div>
                    <h4 className="font-semibold mb-2">Search Results:</h4>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                        {results.map((product, index) => (
                            <div key={product.id || index} className="p-2 bg-white rounded border">
                                <p><strong>Name:</strong> {product.name}</p>
                                <p><strong>Category:</strong> {product.category?.[0]?.name || 'N/A'}</p>
                                <p><strong>Subcategory:</strong> {product.subcategory || 'N/A'}</p>
                                <p><strong>Brand:</strong> {product.brand || 'N/A'}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {allProducts && allProducts.length > 0 && (
                <div className="mt-4">
                    <h4 className="font-semibold mb-2">Sample Products (first 5):</h4>
                    <div className="space-y-1 text-sm">
                        {allProducts.slice(0, 5).map((product, index) => (
                            <div key={product.id || index} className="p-1 bg-gray-100 rounded">
                                {product.name} - {product.category?.[0]?.name || 'No category'}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchDebug;
