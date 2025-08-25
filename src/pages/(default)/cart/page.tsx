import Container from "@/components/shared/container";
import ShoppingCart from "@/components/cart/shopping-cart";
import Breadcrumb from "@/components/shared/breadcrumb";

export default  function Page() {
	return (
		<Container className="py-7 lg:py-8  ">
			<Breadcrumb/>
			<div className="pt-7 lg:pt-8">
				<ShoppingCart/>
			</div>
		</Container>
	);
}

