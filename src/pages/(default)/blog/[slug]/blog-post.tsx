import {FC} from 'react';
import cn from 'classnames';
import {useBlogPostQuery} from '@/services/blog/get-blog-post';

import BlogPostCard from "@/components/blog/blog-post-card";
import {colorMap} from "@/data/color-settings";
import {usePanel} from "@/contexts/usePanel";


interface blogGridProps {
    className?: string;
}

export const BlogPost: FC<blogGridProps> = ({className}) => {
    
    const {data, isLoading} = useBlogPostQuery();
    const {selectedColor} = usePanel();
   
    if (isLoading) return (
        <div className="flex justify-center items-center min-h-[300px]">
            <div
                className={cn("animate-spin rounded-full h-12 w-12 border-4 border-t-transparent", colorMap[selectedColor].border)}></div>
        </div>
    );
    
    return (
        
        <div className={cn('blog-post w-full ', className)}>
            <BlogPostCard key={`blog--post`} blogData={data}/>
        </div>
    
    );
};
