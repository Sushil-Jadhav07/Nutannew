import React from "react";
import Link from "@/components/shared/link";
import { Product } from "@/services/types";
import { ROUTES } from "@/utils/routes";
import useCompareProductStatus from "@/hooks/use-compare-product-status";

const AddToCart = React.lazy(() => import("@/components/product/add-to-cart"));

interface CompareActionsProps {
    product: Product;
}

const CompareActions: React.FC<CompareActionsProps> = ({ product }) => {
    const { product_type, slug, quantity } = product ?? {};
    const { outOfStock } = useCompareProductStatus(product);

    return (
        <div className="px-4 md:px-6 pb-4 text-center justify-items-center w-full">
            {outOfStock || quantity < 1 ? null : product_type === "variable" ? (
                <Link
                    variant="button-detail"
                    to={`${ROUTES.PRODUCTS}/${slug}`}
                    className="lg:min-w-[200px]"
                >
                    Choose Options
                </Link>
            ) : (
                <AddToCart
                    data={product}
                    variant="mercury"
                    className="lg:min-w-[200px]"
                />
            )}
        </div>
    );
};

export default CompareActions;