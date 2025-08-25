import {Blog} from "@/services/types";
import React from "react";
import Link from "@/components/shared/link";
import {ROUTES} from "@/utils/routes";
import cn from "classnames";
import {colorMap} from "@/data/color-settings";
import {usePanel} from "@/contexts/usePanel";

interface BlogProps {
    blog: Blog;
    variant?: string;
    useCategory?: boolean;
    useDescription?: boolean;
}
const BlogHeading: React.FC<BlogProps> = ({ blog, variant="default",useDescription,useCategory }) => {
    const {title, category, slug,shortDescription} = blog;
    const { selectedColor } = usePanel();
    return (
        <>
            {useCategory && (
                <div className="text-sm font-semibold  mb-2.5 text-gray-500">{category}</div>
            )}

            <h4 className={cn("font-semibold   ",{
                "text-md mb-3.5  lg:min-h-[47px]": variant === "default",
                "text-xl  mb-4": variant === "big" || variant === "list",
            }
            )}>
                <Link
                    to={`${ROUTES.BLOG}/${slug}`}
                    className={cn("text-brand-dark line-clamp-2", colorMap[selectedColor].hoverLink)}
                >
                    {title}
                </Link>
            </h4>
            {useDescription && (
                <div className="text-15px leading-6 mb-4 text-gray-500">
                    {shortDescription}
                </div>
            )}
        </>
    );
}
export default BlogHeading;