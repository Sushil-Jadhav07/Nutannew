import Container from '@/components/shared/container';
import Breadcrumb from "@/components/shared/breadcrumb";
import { BlogSidebar } from '../blog-sidebar';
import BlogPageContent from "../blog-page-content";


export default  function Page() {
    return (
       
        <Container>
            <div className="pt-7 lg:pt-10 ">
                <Breadcrumb />
            </div>
            <div className="flex pt-5 lg:pt-10 pb-16 lg:pb-20 blog-category">
                <div className="flex-shrink-0 pe-5 xl:pe-7 hidden lg:block w-80  sticky top-16 h-full">
                    <BlogSidebar />
                </div>
                <div className="w-full  ">
                    <BlogPageContent  variant={'grid'}/>
                </div>
            </div>
        </Container>
       
    );
}
