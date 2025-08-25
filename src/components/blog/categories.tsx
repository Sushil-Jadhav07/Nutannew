
import { ChevronDown } from "lucide-react";
import SectionHeader from "@/components/common/section-header";
import { usePanel } from "@/contexts/usePanel";
import { colorMap } from "@/data/color-settings";
import cn from "classnames";
import Link from "@/components/shared/link";

// Define the category type
type Category = {
    name: string;
    hasDropdown: boolean;
    link: string;
}

// Create the categories array
export const categories: Category[] = [
    { name: "Design", hasDropdown: false, link: "/blog",  },
    { name: "Events", hasDropdown: false, link: "/blog" },
    { name: "Inspirations", hasDropdown: false, link: "/blog" },
    { name: "Links & Quotes", hasDropdown: false, link: "/blog" },
    { name: "News", hasDropdown: false, link: "/blog" },
    { name: "Social", hasDropdown: false, link: "/blog" },
    { name: "Uncategorized", hasDropdown: false, link: "/blog",  },
    { name: "Tips & Tricks", hasDropdown: false, link: "/blog" },
]

interface CategoriesSidebarProps {
    categories?: Category[]
}

const CategoriesSidebar: React.FC<CategoriesSidebarProps> = ({
         categories: propCategories = categories,
     }) => {
    const { selectedColor } = usePanel();
    return (
        <div className={`w-full p-4 bg-gray-50 bg-white rounded-md`}>
           
                <SectionHeader
                    sectionHeading={"All Categories"}
                    className="mb-3 block-title uppercase"
                />
                
                <div className="space-y-0 text-sm md:text-15px">
                    {propCategories.map((category: Category, index: number) => (
                        <div key={`category-${index}`} className="border-b last:border-0 border-gray-200/50 flex justify-between items-center">
                            <Link
                                to={category.link}
                                className={cn("py-3 text-gray-700 block ",colorMap[selectedColor].hoverLink)}
                            >
                                {category.name}
                            </Link>
                            {category.hasDropdown && <ChevronDown className="h-4 w-4 text-gray-400" />}
                        </div>
                    ))}
                </div>
           
        </div>
    )
}

export default CategoriesSidebar
