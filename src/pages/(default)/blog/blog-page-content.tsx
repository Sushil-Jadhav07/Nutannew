
import {useBlogsQuery} from "@/services/blog/get-all-blogs";
import { Suspense, lazy } from "react"; // Add Suspense and lazy
import Loading from "@/components/shared/loading";

// Lazy-load the content components
const BlogContent = lazy(() => import("@/pages/(default)/blog/blog-content"));
const BlogBigContent = lazy(() => import("@/pages/(default)/blog/blog-category-big/blog-big-content"));
const BlogListContent = lazy(() => import("@/pages/(default)/blog/blog-category-list/blog-list-content"));

function BlogFallback() {
    return <Loading/>
}

export default function BlogPageContent({ variant }: { variant: string,}) {
    const {data, isLoading} = useBlogsQuery();
    const dataBlog = data;

    const renderBlogContent = (variant: string) => {
        switch(variant) {
            case 'grid':
                return <BlogContent     dataBlog = {dataBlog} countPerPage={9}/>
            case 'list':
                return <BlogListContent dataBlog = {dataBlog}/>
            case 'big':
                return <BlogBigContent  dataBlog = {dataBlog}/>
            default:
                return <BlogContent     dataBlog = {dataBlog} className={`pt-10  xl:grid-cols-4`} />
        }
    }
    
    if (isLoading) return <Loading/>;
    
    return (
        <Suspense fallback={<BlogFallback />}>
            {renderBlogContent(variant)}
        </Suspense>
    );
}
