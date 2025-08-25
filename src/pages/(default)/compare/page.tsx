import Container from '@/components/shared/container';
import Breadcrumb from "@/components/shared/breadcrumb";
import CompareGrid from "@/components/compare/compare-grid";

export default  function Page() {
	
	return (
		<>
			<Container>
				<div className="py-7 lg:py-8">
					<Breadcrumb/>
					<div className="pt-7 lg:pt-8">
						<CompareGrid/>
					</div>
				</div>
			</Container>
		</>
	);
}
