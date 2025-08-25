import cn from 'classnames';
import {ROUTES} from '@/utils/routes';
import Link from "@/components/shared/link";

interface Props {
    className?: string;
    data: any;
}

const SupperCategoryList: React.FC<Props> = ({className = 'mb-12 pb-0.5', data}) => {
    return (
        <div className={cn('flex flex-col items-center block-title gap-2', className)}>
            <h3 className="text-brand-dark  lg:leading-8 text-xl md:text-[24px] mb-1.5 font-semibold">
                <Link to={`${ROUTES.CATEGORY}/${data?.slug}`}>
                    {data?.name}
                </Link>
            </h3>
            {Array.isArray(data?.children) ? (
                <div className="ltabs-tabs-wrap flex flex-wrap ">
                    <ul key="content" className="flex flex-wrap gap-2 sm:gap-10 text-sm">
                        {data?.children.slice(0, 5)?.map((currentItem: any, idx: number) => {
                            return (
                                <li className="hover:text-skin-primary" key={`${idx}`}>
                                    <Link to={`${ROUTES.CATEGORY}/${data?.slug}`}>
                                        {currentItem.name}
                                    </Link>
                                </li>
                            );
                        })}

                    </ul>
                </div>
            ) : null}
        </div>
    );
};

export default SupperCategoryList;