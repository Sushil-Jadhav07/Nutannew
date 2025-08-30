
import {useState, useContext, useEffect} from 'react';
import Heading from '@/components/shared/heading';
import ShippingAddress from './shipping-address';
import ContactForm from "@/components/checkout/contact-form";
import PaymentMethod from "@/components/checkout/payment-method";
import { CircleUserRound, MapPinHouse, CreditCard} from 'lucide-react';
import {ROUTES} from "@/utils/routes";
import { AuthContext } from '@/contexts/AuthProvider';
import { useCheckout } from '@/contexts/CheckoutContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';

// Define the type for our checkout steps
type CheckoutStep = "contact" | "shipping" | "payment"

interface UserProfileData {
    userName: string;
    email: string;
    address: string;
    city: string;
    pincode: string;
    state: string;
    country: string;
    dateOfBirth: string;
    gender: string;
    phoneNumber: string;
    message: string;
}

const CheckoutDetails: React.FC = () => {
	const { user, isAuthenticated } = useContext(AuthContext);
	const { updateContact, updateShipping, updatePayment } = useCheckout();
	const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
	const [activeStep, setActiveStep] = useState<CheckoutStep>("contact")
	
	// Fetch user profile data from Firestore
	useEffect(() => {
		const fetchUserProfile = async () => {
			if (!user?.uid) return;
			
			try {
				const userDoc = await getDoc(doc(db, 'users', user.uid));
				if (userDoc.exists()) {
					const data = userDoc.data();
					const profileData: UserProfileData = {
						userName: data.name || data.userName || user.displayName || user.email?.split('@')[0] || '',
						email: data.email || user.email || '',
						address: data.address || '',
						city: data.city || '',
						pincode: data.pincode || '',
						state: data.state || '',
						country: data.country || '',
						dateOfBirth: data.dateOfBirth || '',
						gender: data.gender || 'Male',
						phoneNumber: data.contact || data.phoneNumber || '',
						message: data.message || ''
					};
					
					setUserProfile(profileData);
				}
			} catch (error) {
				console.error('Error fetching user profile:', error);
			}
		};
		
		if (isAuthenticated && user) {
			fetchUserProfile();
		}
	}, [user, isAuthenticated]);
	
	// Handle completion of each step
	const handleContactComplete = (data: any) => {
		updateContact(data);
		setActiveStep("shipping")
	}
	
	const handleShippingComplete = (data: any) => {
		updateShipping(data);
		setActiveStep("payment")
	}
	
	const handlePaymentComplete = (data: any) => {
		updatePayment(data);
		console.log("Order completed!", data)
		// Removed redirect to order confirmation page
		// Here you would typically submit the order
	}
	
	// Define the data for each step
	const data = [
		{
			id: 1,
			icon: <CircleUserRound strokeWidth={1} size={30}/>,
			title: 'Contact infomation',
			sub: userProfile ? `${userProfile.userName} ${userProfile.phoneNumber ? `+${userProfile.phoneNumber}` : ''}` : 'Luhan Nguyen +855 - 445 - 6644',
			component: <ContactForm onComplete={handleContactComplete} userProfile={userProfile}/>,
			key: "contact" as CheckoutStep,
		},
		{
			id: 2,
			icon: <MapPinHouse strokeWidth={1} size={30}/>,
			title: 'Shipping Address',
			sub: userProfile ? `${userProfile.address}, ${userProfile.city}, ${userProfile.state} ${userProfile.pincode}, ${userProfile.country}` : 'Sunset Blvd, Los Angeles, CA 90046, USA',
			component: <ShippingAddress onComplete={handleShippingComplete} userProfile={userProfile}/>,
			key: "shipping" as CheckoutStep,
		},
		{
			id: 3,
			icon: <CreditCard strokeWidth={1} size={30}/>,
			title: 'Payment Method',
			sub: '',
			component: <PaymentMethod onComplete={handlePaymentComplete}/>,
			key: "payment" as CheckoutStep,
		},
	];
	
	return (
		<div className="overflow-hidden space-y-6">
			{data.map((step) => (
				<div key={step.id}
				     className="accordion__panel expanded overflow-hidden rounded-md border border-border-base">
					<div className="bg-white flex items-center p-4  cursor-pointer sm:pt-5 sm:px-6 pb-7">
						<span
							className="flex  justify-center h-9 w-9 text-brand-dark ltr:mr-5 rtl:ml-5">
                                  {step?.icon}
                                </span>
						<div>
							<Heading variant={"checkoutHeading"}>{step?.title}</Heading>
							<div className="font-semibold  text-sm text-brand-dark">
								{step?.sub}
							</div>
						</div>
						{/* Removed the "Change" button as formData is no longer managed locally */}
					
					</div>
					
					{activeStep === step.key && (
						<div
							className="pb-6 ltr:pl-5 rtl:pr-5 sm:ltr:pl-5 sm:rtl:pr-5 lg:ltr:pl-7 lg:rtl:pr-7  ltr:pr-7 rtl:pl-5 bg-white">
							<div className="border-t border-border-two pt-7">{step.component}</div>
						</div>
					)}
				</div>
			))}
		
		
		</div>
	);
};

export default CheckoutDetails;
