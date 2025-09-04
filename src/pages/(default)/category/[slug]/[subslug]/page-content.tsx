import { Element } from 'react-scroll';
import { useState } from 'react';
import TopBar from '@/components/category/top-bar';
import Filters from '@/components/filter/filters';
import DrawerFilter from '@/components/category/drawer-filter';
import { LIMITS } from '@/services/utils/limits';
import { ProductMain } from '@/components/product/productListing/product-main';
import { useProductsQuery } from '@/services/product/get-all-products';
import { useLocation, useParams } from 'react-router-dom';
import useQueryParam from '@/utils/use-query-params';

export default function SubCategoryContent() {
  const [viewAs, setViewAs] = useState(Boolean(true));
  const { pathname, search } = useLocation();
  const { slug, subslug } = useParams();
  const { getParams } = useQueryParam(`${pathname}${search}`);

  const newQuery: { sort_by?: string } = getParams(
    `${import.meta.env.VITE_PUBLIC_WEBSITE_URL}${pathname}${search}`,
  );

  const limit = LIMITS.PRODUCTS_LIMITS;
  const { data, isLoading } = useProductsQuery({
    limit,
    sort_by: newQuery.sort_by,
  });

  return (
    <Element name="subcategory" className="flex products-category">
      <div className="sticky hidden lg:block h-full shrink-0 ltr:pr-7 rtl:pl-7   w-[300px] top-16 ">
        <Filters />
      </div>
      <div className="w-full">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-brand-dark capitalize">{String(subslug).replace(/-/g,' ')}</h2>
        </div>
        <DrawerFilter />
        <TopBar viewAs={viewAs} setViewAs={setViewAs} />
        <ProductMain data={data} isLoading={isLoading} viewAs={viewAs} />
      </div>
    </Element>
  );
}


