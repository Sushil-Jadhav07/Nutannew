import cn from 'classnames';
import {ROUTES} from '@/utils/routes';
import { FaChevronRight } from "react-icons/fa6";
import Link from "@/components/shared/link";
import {usePanel} from "@/contexts/usePanel";
import {colorMap} from "@/data/color-settings";

interface Props {
    className?: string;
    data: any;
}

const SupperCategoryList: React.FC<Props> = ({ className = 'mb-12 pb-0.5', data}) => {
    const {selectedColor} = usePanel();

    return (
        <div
            className={cn('flex items-center block-title mb-1.5 px-3 lg:px-5 py-3 rounded bg-white gap-2 min-h-[48px]', className)}>
            <h3 className="text-[16px] uppercase text-brand-dark font-bold border-0 hover:text-skin-primary basis-[70%]">
                {data?.name}
            </h3>
            <div className="ltabs-tabs-wrap flex flex-wrap justify-end basis-[30%]">
                <ul key="content" className="text-[14px]">
                    <li className={cn(colorMap[selectedColor].hoverLink, "flex items-center font-medium ")}>
                        <Link
                            to={`${ROUTES.CATEGORY}/${data?.slug}`}
                        >
                                <span className="inline-flex me-1">
                                View More
                                </span>
                        </Link>
                        <FaChevronRight className="text-sm rtl:rotate-180"/>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SupperCategoryList;
