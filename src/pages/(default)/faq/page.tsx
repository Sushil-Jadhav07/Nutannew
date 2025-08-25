import Container from '@/components/shared/container';
import PageHeroSection from '@/components/shared/page-hero-section';
import Accordion from '@/components/shared/accordion';
import { shopping,order,payment } from '@/data/faq-settings';
import Heading from "@/components/shared/heading";

export default  function Page() {
    return (
    <>
      <PageHeroSection
        heroTitle="Faq"
        className="faq-banner-area"
      />
        <Container>
            <div className="flex flex-wrap  w-full  relative z-10  my-10">
                <div className="w-full lg:w-[70%] xl:w-[70%] xl:pe-8  xl:mb-0 mb-8">
                    <div className="bg-white w-full p-5 lg:p-8 rounded-md">
                        <Heading variant="heading" className="mb-3 ">
                            Shopping Information
                        </Heading>
                        {shopping?.map((item, index) => (
                            <Accordion
                                key={index}
                                item={item}
                            />
                        ))}

                        <Heading variant="heading" className="mt-15 mb-3 ">
                            Payment information
                        </Heading>
                        {order?.map((item, index) => (
                            <Accordion
                                key={index}
                                item={item}
                            />
                        ))}

                        <Heading variant="heading" className="mt-15 mb-3 ">
                            Order & Returns
                        </Heading>
                        {payment?.map((item, index) => (
                            <Accordion
                                key={index}
                                item={item}
                            />
                        ))}
                    </div>
                </div>
                <div className="w-full lg:w-[30%] xl:w-[30%] ">
                    <div className={"sticky z-10 md:top-16 lg:top-20"}>
                        <div className="w-full p-5 bg-gray-200 rounded-md">
                            <Heading variant="heading" className="mb-3 ">Have a question</Heading>

                            <p className="text-15px mb-4 leading-7">
                                If you have an issue or question that requires immediate assistance, you can click the
                                button below to chat live
                                with a Customer Service representative.
                            </p>

                            <p className="text-15px mb-6 leading-7">
                                Please allow 06 - 12 business days from the time your package arrives back to us for a
                                refund to be issued.
                            </p>

                            <div className="flex items-center gap-4">
                                <button
                                    className="px-6 py-3 bg-black dark:bg-brand-light text-white font-medium rounded-md">Contact
                                    us
                                </button>

                                <a href="#" className="flex items-center text-black font-medium underline">
                                    Live chat <span className="ml-1">↗</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Container>
    </>
    );
}
