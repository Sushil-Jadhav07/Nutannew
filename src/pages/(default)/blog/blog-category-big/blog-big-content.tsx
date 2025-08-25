
import {FC, useEffect} from 'react';
import cn from 'classnames';
import BlogCardBig from "@/components/blog/blog-card-big";
import {useState} from "react";
import Pagination from "@/components/shared/pagination";
import {GrNext, GrPrevious} from "react-icons/gr";
import {Blog} from "@/services/types";

interface blogGridProps {
    dataBlog?: Blog[]; // Adjust based on your actual data structure
    className?: string;
}

const BlogBigContent: FC<blogGridProps> = ({dataBlog, className = ''}) => {
    
    const [currentPage, setCurrentPage] = useState(1);
    const countPerPage = 5;
    
    // Initialize filterData with a fallback
    const [filterData, setFilterData] = useState<Blog[]>(
        dataBlog?.slice(0, countPerPage) || []
    );
    
    // Sync filterData when data or currentPage changes
    useEffect(() => {
        if (dataBlog) {
            const to = countPerPage * currentPage;
            const from = to - countPerPage;
            setFilterData(dataBlog.slice(from, to));
        } else {
            setFilterData([]); // Fallback to empty array if no data
        }
    }, [dataBlog, currentPage, countPerPage]);
    
    const updatePage = (p: number) => {
        setCurrentPage(p);
    };

    return (
        <>
            <div
                className={cn(
                    'grid grid-cols-1 gap-2 md:gap-7 pt-10',
                    className
                )}
                >
                {
                    filterData?.map((item: Blog) => {
                    return <BlogCardBig key={`blog--key-${item.id}`} blog={item} />;
                })}

                {/* end of error state */}
            </div>
            <Pagination
                current={currentPage}
                onChange={updatePage}
                pageSize={countPerPage}
                total={dataBlog?.length}
                prevIcon={<GrPrevious size={14}  className={`m-auto my-1.5 rtl:rotate-180`}/>}
                nextIcon={<GrNext size={14}  className={`m-auto my-1.5 rtl:rotate-180`}/>}
                className="blog-pagination bg-white rounded xs:mt-2"
            />
        </>
    );
};
export default BlogBigContent;
