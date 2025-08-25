
import Container from '@/components/shared/container';
import ContactForm from '@/components/contact/contact-form';
import ContactSupport from '@/components/contact/contact-support';
import PageHeroSection from "@/components/shared/page-hero-section";
import {HeadMetadata} from "@/components/shared/HeadMetadata";

export default  function Page() {
	
	return (
		<>
			{/* Dynamically apply the document title */}
			<HeadMetadata pageTitle="Contact Us"/>
			
			{/* The rest of your component code */}
			<PageHeroSection heroTitle="Contact Us"/>
			<Container className={"mt-10"}>
				<div className="flex flex-wrap bg-white  rounded-lg w-full  relative z-10 p-5 xl:p-12  my-10 ">
					<div className="w-full md:w-[53%] xl:w-[60%] md:pe-8 lg:pe-0 2xl:pe-24 lg:mb-0 mb-8">
						<ContactSupport/>
					</div>
					<div className="w-full md:w-[47%] xl:w-[40%] pb-0.5 lg:ps-12 pt-1.5">
						<ContactForm/>
					</div>
				</div>
			
			</Container>
		
		</>
	);
}
