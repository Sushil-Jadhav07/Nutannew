import Container from "@/components/shared/container";
import Breadcrumb from "@/components/shared/breadcrumb";
import CanvasContent from "@/pages/(default)/category/category-canvas/canvas-content";
import {Suspense} from "react";
import Loading from "@/components/shared/loading";


function SearchBarFallback() {
	return <Loading/>
}

export default  function Page() {
	
	return (
		<Container>
			<div className="py-7 lg:py-8  blog-category">
				<Breadcrumb/>
				<Suspense fallback={<SearchBarFallback />}>
				<div className="pt-7 lg:pt-8">
					<CanvasContent/>
				</div>
				</Suspense>
			</div>
		</Container>
);
}
