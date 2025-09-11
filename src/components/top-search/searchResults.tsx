// SearchResults.tsx

import Scrollbar from '@/components/shared/scrollbar';
import SearchCard from '@/components/top-search/search-card';
import SearchResultLoader from '@/components/shared/loaders/search-result-loader';

const SearchResults = ({ queryText, searchResults, isLoading, onClear }: any) => {
    // Show results for queries with 2 or more characters
    if (!queryText || queryText.length < 2) return null;

    return (
        <div className="w-full absolute top-[50px] ltr:left-0 rtl:right-0 bg-white rounded-md overflow-hidden drop-shadow-dropDown z-10">
            <Scrollbar>
                <div className="w-full max-h-[384px]">
                    {isLoading ? (
                        Array.from({ length: 5 }).map((_, idx) => (
                            <div
                                key={`search-form-loader-key-${idx}`}
                                className="py-3 ltr:pl-5 rtl:pr-5 ltr:pr-10 rtl:pl-10"
                            >
                                <SearchResultLoader
                                    key={idx}
                                    uniqueKey={`search-form-${idx}`}
                                />
                            </div>
                        ))
                    ) : !searchResults || searchResults.length === 0 ? (
                        <div className="text-center py-8 px-4">
                            <div className="text-gray-500 text-sm mb-2">
                                No products found for "{queryText}"
                            </div>
                            <div className="text-xs text-gray-400">
                                Try searching for product names, categories, or brands
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="px-4 py-2 text-xs text-gray-500 border-b border-gray-100">
                                {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
                            </div>
                            {searchResults.map((item: any, index: number) => (
                                <div
                                    key={`search-form-key-${index}`}
                                    className="py-3 ps-4 pe-10 border-b border-black/5 hover:bg-gray-100 cursor-pointer"
                                    onClick={onClear}
                                >
                                    <SearchCard product={item} key={index} />
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </Scrollbar>
        </div>
    );
};

export default SearchResults;
