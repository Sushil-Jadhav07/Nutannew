import Container from '@/components/shared/container';
import Breadcrumb from "@/components/shared/breadcrumb";
import BlogPageContent from "../blog-page-content";


export default  function Page() {
    return (
        <Container>
            <div className="pt-7 lg:pt-10 pb-16 lg:pb-20 blog-category">
                <Breadcrumb/>
                <div className="max-w-screen-lg m-auto">
                    <BlogPageContent  variant={'big'}/>
                </div>
            </div>
        </Container>
    );
}
