

import {useState} from 'react';
import {useForm} from 'react-hook-form';
import Input from '@/components/shared/form/input';
import EmailIcon from '@/components/icons/email-icon';
import Text from '@/components/shared/text';
import Heading from '@/components/shared/heading';
import cn from 'classnames';
import {colorMap} from "@/data/color-settings";
import { usePanel } from "@/contexts/usePanel";

interface NewsLetterFormValues {
    email: string;
}

const defaultValues = {
    email: '',
};

function SubscriptionForm({ variant  }: {  variant?: string; }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewsLetterFormValues>({
    defaultValues,
  });
  const [subscriptionSuccess, setSubscriptionSuccess] = useState<boolean>(false);
  const { selectedColor } = usePanel();
  function onSubmit() {
    // show success message
    setSubscriptionSuccess(true);

    // remove success message after 3 seconds
    setTimeout(() => {
      setSubscriptionSuccess(false);
    }, 5000);

    // reset form after submit
    //e.target.reset();
  }
  return (
      <>
    <form
      noValidate
      className="flex relative"
      onSubmit={handleSubmit(onSubmit)}
    >
      <span className="flex items-center absolute ltr:left-0 rtl:right-0 top-0 h-12 px-3.5 transform">
        <EmailIcon className="w-4 2xl:w-[18px] h-4 2xl:h-[18px]" />
      </span>
      <Input
        placeholder="Your email address"
        type="email"
        id="subscription-email"
        variant="solid"
        className="w-full"
        inputClassName={cn('ps-10 md:ps-10 pe-10 md:pe-10 2xl:px-11 h-12 rounded-md bg-transparent border-black/10 dark:border-black/10 focus:outline-none focus:drop-shadow-outline text-gray-400',
            {
                'xs:border-white/10':  variant === 'home5',
            }
            )}
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
        className={cn(colorMap[selectedColor].bg,"bg-brand text-sm font-medium text-brand-light md:h-12 py-2 px-10   focus:outline-none focus:drop-shadow-outline  transform  rounded-e-md ltr:-ml-1 rtl:-mr-1")}
        aria-label="Subscribe Button"
      >
        Subscribe
      </button>
      
    </form>
    {!errors.email && subscriptionSuccess && (
        <p className="my-3 text-13px text-brand">
          Thank you for subscribing to our newsletter
        </p>
    )}
      </>
  );
}

interface Props {
  className?: string;
    variant?: string;
}

const WidgetSubscription: React.FC<Props> = ({  className,variant }) => {

  return (
    <div className={cn('flex flex-col',{
        'text-brand-dark': variant === 'home5' || variant === 'home7',
        }, className)}
    >
      <Heading variant="base" className={cn('uppercase mb-4 lg:mb-5',
          {
              'text-brand-light': variant === 'home5' || variant === 'home7',
          })}
      >
        Sign Up For Newsletter
      </Heading>

      <Text className="pb-8 text-fill-footer">Join 2.000+ subscribers and get a new discount coupon on every Saturday.</Text>
      <SubscriptionForm variant={variant}/>
    </div>
  );
};

export default WidgetSubscription;
