

import {FC, useEffect} from 'react';
import BlogCard from '@/components/blog/blog-card';
import cn from 'classnames';
import {GrNext, GrPrevious} from "react-icons/gr";
import Pagination from "@/components/shared/pagination";
import {useState} from "react";
import {Blog} from "@/services/types";


interface blogGridProps {
    dataBlog?: Blog[]; // Adjust based on your actual data structure
    className?: string;
    countPerPage?: number;
}

 const BlogContent: FC<blogGridProps> = ({dataBlog, className,countPerPage=8}) => {

    const [currentPage, setCurrentPage] = useState(1);
    
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
                    className,
                    'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-2 md:gap-6'
                )}
                >
                {filterData?.map((item: Blog) => {
                      return <BlogCard key={`blog--key-${item.id}`} blog={item}/>;
                   })
                }

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

export default BlogContent;
