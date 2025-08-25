import {FC} from 'react';

import Button from '@/components/shared/button';
import ProductCard from '@/components/product/productListing/productCards/product-card';
import ProductCardLoader from '@/components/shared/loaders/product-card-loader';
import ProductCardList from '@/components/product/productListing/productCards/product-list';
import {LIMITS} from '@/services/utils/limits';
import {Product} from '@/services/types';

// Define proper type for data
interface PageData {
	data: Product[];
}
interface ProductGridProps {
	data?:{ pages: PageData[] }; // Adjust based on your actual data structure
	isLoading?: boolean;
	className?: string;
	fetchNextPage?: () => void;
	hasNextPage?: boolean;
	loadingMore?: boolean;
	viewAs: boolean;
}

export const ProductLoadmore: FC<ProductGridProps> = ({data,isLoading,fetchNextPage,hasNextPage,loadingMore,className = '', viewAs}) => {
	const limit = LIMITS.PRODUCTS_LIMITS || 15;
	
	return (
		<>
			<div
				className={`${viewAs ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-1.5' : 'grid grid-cols-1 gap-1.5'} ${className}`}
			>
				{isLoading  ? (
					Array.from({length: limit}).map((_, idx) => (
						<div className={"p-2 h-full rounded bg-white"} key={`product--key-${idx}`}>
							<ProductCardLoader
								uniqueKey={`product--key-${idx}`}
							/>
						</div>
					))
				) : (
					data?.pages?.map((page: PageData) => {
						if (viewAs) {
							return page?.data?.slice(0, limit).map((product: Product) => (
								<ProductCard
									key={`product--key-${product.id}`}
									product={product}
								/>
							));
						} else {
							return page?.data?.slice(0, limit).map((product: Product) => (
								<ProductCardList
									key={`product--key-${product.id}`}
									product={product}
								/>
							));
						}
					})
				)}
				{/* end of error state */}
			</div>
			
			{hasNextPage && (
				<div className="mt-1.5 py-5 text-center bg-white rounded">
					<Button
						loading={loadingMore}
						disabled={loadingMore}
						onClick={() => fetchNextPage?.()}
						className={'w-60 xs:capitalize'}
						variant={'primary'}
					>
						Load More
					</Button>
				</div>
			)}
		</>
	);
};
