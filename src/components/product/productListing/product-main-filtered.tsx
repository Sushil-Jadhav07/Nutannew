import { FC, useEffect, useState } from 'react';
import ProductCard from '@/components/product/productListing/productCards/product-card';
import ProductCardLoader from '@/components/shared/loaders/product-card-loader';
import ProductCardList from '@/components/product/productListing/productCards/product-list';
import { LIMITS } from '@/services/utils/limits';
import { Product } from '@/services/types';
import { GrNext, GrPrevious } from "react-icons/gr";
import Pagination from "@/components/shared/pagination";
import Link from "@/components/shared/link";
import { ROUTES } from "@/utils/routes";
import { useFilterContext } from '@/contexts/FilterContext';

interface ProductGridFilteredProps {
    data?: Product[];
    isLoading: boolean;
    className?: string;
    viewAs: boolean;
}

export const ProductMainFiltered: FC<ProductGridFilteredProps> = ({ 
    data, 
    isLoading, 
    className = '', 
    viewAs 
}) => {
    const limit = LIMITS.PRODUCTS_LIMITS;
    const [currentPage, setCurrentPage] = useState(1);
    const countPerPage = limit;
    
    // Use the filter context
    const {
        filteredProducts,
        hasAnyFilters
    } = useFilterContext();
    
    // Paginate the filtered products
    const [paginatedProducts, setPaginatedProducts] = useState<Product[]>([]);
    
    // Update paginated products when filtered products or current page changes
    useEffect(() => {
        if (Array.isArray(filteredProducts) && filteredProducts.length > 0) {
            const to = countPerPage * currentPage;
            const from = to - countPerPage;
            setPaginatedProducts(filteredProducts.slice(from, to));
        } else {
            setPaginatedProducts([]);
        }
    }, [filteredProducts, currentPage, countPerPage]);
    
    // Reset to first page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [filteredProducts]);
    
    const updatePage = (p: number) => {
        setCurrentPage(p);
    };
    
    return (
        <>
            {isLoading ? (
                <div className={`${viewAs ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-1.5' : 'grid grid-cols-1 gap-1.5'} ${className}`}>
                    {Array.from({ length: limit }).map((_, idx) => (
                        <div className="p-2 h-full rounded bg-white" key={`product--key-${idx}`}>
                            <ProductCardLoader uniqueKey={`product--key-${idx}`} />
                        </div>
                    ))}
                </div>
            ) : (
                !filteredProducts?.length ? (
                    <div className="w-full flex flex-col items-center justify-center py-16 lg:py-30 bg-white rounded-md">
                        <h2 className="text-xl font-semibold text-brand-dark mb-4">
                            {hasAnyFilters() ? 'No products match your filters' : 'No products available'}
                        </h2>
                        <p className="text-gray-600 mb-6 text-center max-w-md">
                            {hasAnyFilters() 
                                ? 'Try adjusting your filters to see more products.'
                                : 'There are currently no products in this category.'
                            }
                        </p>
                        <Link to={ROUTES.HOME} variant={"button-primary"} className={"min-w-60"}>
                            Continue shopping
                        </Link>
                    </div>
                ) : (
                    <div className={`${viewAs ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-1.5' : 'grid grid-cols-1 gap-1.5'} ${className}`}>
                        {paginatedProducts.map((product: Product) => (
                            viewAs ? (
                                <ProductCard
                                    key={`product--key-${product.id}`}
                                    product={product}
                                />
                            ) : (
                                <ProductCardList
                                    key={`product--key-${product.id}`}
                                    product={product}
                                />
                            )
                        ))}
                    </div>
                )
            )}
            
            {/* Pagination */}
            {filteredProducts.length > 0 && (
                <Pagination
                    current={currentPage}
                    onChange={updatePage}
                    pageSize={countPerPage}
                    total={filteredProducts.length}
                    prevIcon={<GrPrevious size={14} className={`m-auto my-1.5 rtl:rotate-180`} />}
                    nextIcon={<GrNext size={14} className={`m-auto my-1.5 rtl:rotate-180`} />}
                    className="blog-pagination bg-white rounded xs:mt-2"
                />
            )}
        </>
    );
};
