import {useForm} from 'react-hook-form';
import Input from '@/components/shared/form/input';
import EmailIcon from '@/components/icons/email-icon';
import Text from '@/components/shared/text';
import Heading from '@/components/shared/heading';
import cn from 'classnames';
import Container from '@/components/shared/container';
import { FaArrowRightLong } from "react-icons/fa6";

interface Props {
    className?: string;
}

interface NewsLetterFormValues {
    email: string;
}

const defaultValues = {
    email: '',
};
const WidgetSubscription: React.FC<Props> = ({ className}) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<NewsLetterFormValues>({
        defaultValues,
    });
    
    function onSubmit(values: NewsLetterFormValues) {
        console.log(values, 'News letter');
    }
    
    const backgroundFooter = '/assets/images/subscription/bg_newsletter5_1920x.png';
    
    return (
        <div className={cn('pt-32 lg:pt-52', className)} style={{backgroundImage: `url('${backgroundFooter}')`}}>
            <Container className={"text-right"}>
                <div className={"bg-white rounded-t-lg p-5 lg:p-10  sm:w-2/5 inline-block text-left"}>
                    <Heading variant="mediumHeading" className=" mb-5 lg:mb-4 lg:pb-0.5t lg:text-[24px]">
                        Sign Up For Newsletter
                    </Heading>
                    
                    <Text className="lg:-mt-1">
                        Join 20.000+ subscribers and get a new discount coupon on every Saturday
                    </Text>
                    <div className={"mt-7 form-subscribe flex flex-col "}>
                        <form
                            className="flex relative z-10 "
                            onSubmit={handleSubmit(onSubmit)}
                        >
                        <span className="flex items-center absolute start-0 top-0 h-12 px-3.5 transform">
                          <EmailIcon className="w-4 2xl:w-[18px] h-4 2xl:h-[18px]"/>
                        </span>
                            <Input
                                placeholder="Your email address"
                                type="email"
                                id="subscription-email"
                                variant="solid"
                                className="w-full"
                                inputClassName={`ps-10 md:ps-10 pe-10 md:pe-10 2xl:px-11 h-12 border-2 border-black focus:outline-none focus:shadow-outline rounded`}
                                {...register('email', {
                                    required: `You must need to provide your email address`,
                                    pattern: {
                                        value:
                                            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: `Please provide valid email address`,
                                    },
                                })}
                                error={errors.email?.message}
                            />
                            <button
                                className={`absolute end-0 top-0 h-12 px-3.5 text-xl text-black md:h-12 py-2 px-5   focus:outline-none focus:shadow-outline `}
                                aria-label="Subscribe Button"
                            >
                                <FaArrowRightLong className={"rtl:rotate-180"} />

                            </button>
                        </form>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default WidgetSubscription;
