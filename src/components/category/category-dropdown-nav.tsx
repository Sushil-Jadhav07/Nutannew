import Alert from '@/components/shared/alert';
import CategoryListCardLoader from '@/components/shared/loaders/category-list-card-loader';
import {useCategoriesQuery} from '@/services/category/get-all-categories';
import cn from 'classnames';
import Link from '@/components/shared/link';
import { IoIosArrowForward, IoIosAddCircleOutline } from 'react-icons/io';

interface CategoryDropdownProps {
    className?: string;
    categoriesLimit?: number;
}

// New custom dropdown menu component
function CategoryDropdownMenu() {
    // Static category data
    const categories = [
        { name: "Bags & Carry Items", link: "/category/audio-music", hasArrow: false },
        { name: "Tech & Gadgets", link: "/category/phones-tablets", hasArrow: false },
        { name: "Office & Stationery", link: "/category/fashion-clothing", hasArrow: false },
        { name: "Drinkware", link: "/category/garden-kitchen", hasArrow: false },
        { name: "Gift Sets & Kits", link: "/category/tv-video", hasArrow: false },
        { name: "Eco Lifestyle", link: "/category/beauty-health", hasArrow: false },
        { name: "Events & Conference Essentials", link: "/category/jewelry-watches", hasArrow: false },

    ];

    return (
        <div className="w-full bg-white rounded-b-md category-dropdown-menu shadow-lg">
            {/* Menu Header */}
            {/* <div className="flex items-center px-4 py-3 border-b border-gray-200">
                <div className="w-6 h-6 mr-3">
                    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                </div>
                <span className="text-lg font-semibold text-gray-800">All Categories</span>
            </div> */}

            {/* Category List */}
            <div className="py-2">
                {categories.map((category, index) => (
                    <div key={category.link}>
                        <Link
                            to={category.link}
                            className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors duration-200"
                        >
                            <span className="text-gray-700 font-medium">{category.name}</span>
                            {category.hasArrow && (
                                <IoIosArrowForward className="text-gray-400 text-sm" />
                            )}
                        </Link>
                        {index < categories.length - 1 && (
                            <div className="border-b border-gray-100 mx-4"></div>
                        )}
                    </div>
                ))}
            </div>

            {/* Browse All Categories Button */}
            <div className="border-t border-gray-200">
                <Link
                    to="/categories"
                    className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors duration-200"
                >
                    <IoIosAddCircleOutline className="text-gray-600 text-xl mr-3" />
                    <span className="text-gray-700 font-medium">Browse All Categories</span>
                </Link>
            </div>
        </div>
    );
}

export default function CategoryDropdownNav({
         className,
         categoriesLimit = 9,
     }: CategoryDropdownProps) {
    const {
        data : categories,
        isLoading: loading,
        error,
    } = useCategoriesQuery({
        limit: 9,
    });

    return (
        <div className={cn('absolute z-30 w-72 lg:w-full', className)}>
            <div className="max-h-full">
                {error ? (
                    <div className="2xl:ltr:pr-4 2xl:rtl:pl-4">
                        <Alert message={error.message}/>
                    </div>
                ) : loading ? (
                    
                    <div className={'w-full bg-white rounded-b-md category-dropdown-menu'} >
                        {Array.from({length: 7}).map((_, idx) => (
                            <CategoryListCardLoader
                                key={`category-list-${idx}`}
                                uniqueKey="category-list-card-loader"
                            />
                        ))}
                    </div>
                ) : (
                    <CategoryDropdownMenu />
                )}
            </div>
        </div>
    );
}
