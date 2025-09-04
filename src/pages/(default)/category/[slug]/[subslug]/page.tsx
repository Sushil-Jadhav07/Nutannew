import Container from '@/components/shared/container';
import Breadcrumb from '@/components/shared/breadcrumb';
import SubCategoryContent from '@/pages/(default)/category/[slug]/[subslug]/page-content';

export default function Page() {
  return (
    <Container>
      <div className="py-7 lg:py-8  blog-category">
        <Breadcrumb />
        <div className="pt-7 lg:pt-8">
          <SubCategoryContent />
        </div>
      </div>
    </Container>
  );
}


