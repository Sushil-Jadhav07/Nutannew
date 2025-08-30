import CheckoutCard from '@/components/checkout/checkout-card';
import Container from '@/components/shared/container';
import CheckoutDetails from '@/components/checkout/checkout-details';
import Breadcrumb from "@/components/shared/breadcrumb";
import { CheckoutProvider } from '@/contexts/CheckoutContext';

export default function CheckoutPage() {
	return (
		<CheckoutProvider>
			<Container className="py-10  checkout">
				<Breadcrumb/>
				<div className="pt-7 lg:pt-8 grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-4 xl:gap-8">
					<div className="w-full ">
						<CheckoutDetails/>
					</div>
					<div className="w-full">
						<CheckoutCard/>
					</div>
				</div>
			</Container>
		</CheckoutProvider>
	);
}
