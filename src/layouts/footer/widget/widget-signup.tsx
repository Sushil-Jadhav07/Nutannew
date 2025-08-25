import {useForm} from 'react-hook-form';
import Input from '@/components/shared/form/input';
import EmailIcon from '@/components/icons/email-icon';
import Text from '@/components/shared/text';
import Heading from '@/components/shared/heading';
import cn from 'classnames';
import Container from '@/components/shared/container';
import { FaArrowRightLong } from "react-icons/fa6";
import {useState} from "react";

interface Props {
    className?: string;
}

interface NewsLetterFormValues {
    email: string;
}

const defaultValues = {
    email: '',
};
const WidgetSignup: React.FC<Props> = ({ className}) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<NewsLetterFormValues>({
        defaultValues,
    });
    const [subscriptionSuccess, setSubscriptionSuccess] = useState<boolean>(false);
    function onSubmit(values: NewsLetterFormValues) {
        // show success message
        setSubscriptionSuccess(true);
        
        // remove success message after 3 seconds
        setTimeout(() => {
            //setSubscriptionSuccess(false);
        }, 5000);
        
        console.log(values, 'News letter');
    }
    
    return (
        <div className={cn('py-12 xl:py-24 text-center', className)} >
            <Container >
                <div className={"mx-auto  xl:w-2/5 inline-block "}>
                    <Heading variant="mediumHeading" className=" mb-2  lg:pb-0.5t text-[24px] xl:text-[30px]">
                        Sign Up For Newsletter
                    </Heading>
                    
                    <Text >
                        Join 20.000+ subscribers and get a new discount coupon on every Saturday.
                    
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
                                inputClassName={`ps-10 md:ps-10 pe-10 md:pe-10 2xl:px-11 h-12 border-black  focus:outline-none focus:shadow-outline `}
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
                                className={`absolute end-0 top-0 h-12 px-3.5 text-xl text-black md:h-12 py-2   focus:outline-none focus:shadow-outline `}
                                aria-label="Subscribe Button"
                            >
                                <FaArrowRightLong className={"rtl:rotate-180"}  />

                            </button>
                        </form>
			{!errors.email && subscriptionSuccess && (
                        <p className="my-3 text-sm  max-w-[600px]  lg:w-[600px]">
                            Thank you for subscribing to our newsletter
                        </p>
                    )}
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default WidgetSignup;
