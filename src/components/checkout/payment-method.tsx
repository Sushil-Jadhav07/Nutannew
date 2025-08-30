
import {useForm} from 'react-hook-form';
import Input from '../shared/form/input';
import React, {useState, useEffect, useContext} from "react";
import Button from "@/components/shared/button";
import { AuthContext } from '@/contexts/AuthProvider';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '@/config/firebase';

type PaymentFormData = {
	cardNumber: string
	nameOnCard: string
	expirationDate: string
	cvc: string
}

interface SavedCard {
	id: string;
	cardNumber: string;
	nameOnCard: string;
	expirationDate: string;
	isDefault?: boolean;
}

interface PaymentMethodProps {
	onComplete: (data: any) => void
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({ onComplete }) => {
	const { user } = useContext(AuthContext);
	const [paymentMethod, setPaymentMethod] = useState<"card" | "cod">("cod");
	const [savedCards, setSavedCards] = useState<SavedCard[]>([]);
	const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
	const [showCardForm, setShowCardForm] = useState(false);
	const [saveCardDetails, setSaveCardDetails] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue
	} = useForm<PaymentFormData>({
		defaultValues: {
			cardNumber: "",
			nameOnCard: "",
			expirationDate: "",
			cvc: "",
		},
	})
	
	// Fetch saved cards from Firebase
	useEffect(() => {
		const fetchSavedCards = async () => {
			if (!user?.uid) return;
			
			try {
				const userDoc = await getDoc(doc(db, 'users', user.uid));
				if (userDoc.exists()) {
					const data = userDoc.data();
					const cards = data.savedCards || [];
					setSavedCards(cards);
					
					// Set default card if exists
					const defaultCard = cards.find((card: SavedCard) => card.isDefault);
					if (defaultCard) {
						setSelectedCardId(defaultCard.id);
					}
				}
			} catch (error) {
				console.error('Error fetching saved cards:', error);
			}
		};
		
		fetchSavedCards();
	}, [user]);
	
	// Format card number with spaces
	const formatCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
		const formattedValue = value.replace(/\d{4}(?=.)/g, "$& ")
		e.target.value = formattedValue.slice(0, 19) // Limit to 16 digits + 3 spaces
	}
	
	// Format expiration date as MM/YY
	const formatExpirationDate = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.replace(/\D/g, "")
		if (value.length <= 2) {
			e.target.value = value
		} else {
			e.target.value = `${value.slice(0, 2)}/${value.slice(2, 4)}`
		}
	}
	
	// Limit CVC to 3-4 digits
	const formatCVC = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.replace(/\D/g, "")
		e.target.value = value.slice(0, 4)
	}
	
	// Handle form submission
	const handleFormSubmit = async (formData: PaymentFormData) => {
		if (paymentMethod === "cod") {
			// Cash on Delivery - no card details needed
			onComplete({
				paymentMethod: "cod",
				message: "Payment will be collected on delivery"
			});
			return;
		}
		
		// Card payment
		setIsLoading(true);
		try {
			let paymentData: any = {
				paymentMethod: "card",
				cardDetails: formData
			};
			
			// Save card to Firebase if user wants to
			if (saveCardDetails && user?.uid) {
				const newCard: SavedCard = {
					id: Date.now().toString(),
					cardNumber: formData.cardNumber.replace(/\s/g, '').slice(-4), // Only save last 4 digits
					nameOnCard: formData.nameOnCard,
					expirationDate: formData.expirationDate,
					isDefault: savedCards.length === 0 // First card becomes default
				};
				
				await updateDoc(doc(db, 'users', user.uid), {
					savedCards: arrayUnion(newCard)
				});
				
				// Update local state
				setSavedCards(prev => [...prev, newCard]);
				
				paymentData.savedCardId = newCard.id;
			}
			
			onComplete(paymentData);
			
			// Reset form if card was saved
			if (saveCardDetails) {
				reset();
				setSaveCardDetails(false);
			}
			
		} catch (error) {
			console.error('Error saving card:', error);
			// Still complete payment even if saving card fails
			onComplete({
				paymentMethod: "card",
				cardDetails: formData,
				error: "Card saved but payment completed"
			});
		} finally {
			setIsLoading(false);
		}
	};
	
	// Set default card
	const setDefaultCard = async (cardId: string) => {
		if (!user?.uid) return;
		
		try {
			const updatedCards = savedCards.map((card: SavedCard) => ({
				...card,
				isDefault: card.id === cardId
			}));
			
			await updateDoc(doc(db, 'users', user.uid), {
				savedCards: updatedCards
			});
			
			setSavedCards(updatedCards);
		} catch (error) {
			console.error('Error setting default card:', error);
		}
	};
	
	// Delete card
	const deleteCard = async (cardId: string) => {
		if (!user?.uid) return;
		
		try {
			const updatedCards = savedCards.filter((card: SavedCard) => card.id !== cardId);
			await updateDoc(doc(db, 'users', user.uid), {
				savedCards: updatedCards
			});
			
			setSavedCards(updatedCards);
			
			// Clear selection if deleted card was selected
			if (selectedCardId === cardId) {
				setSelectedCardId(null);
			}
		} catch (error) {
			console.error('Error deleting card:', error);
		}
	};
	
	// Use saved card
	const useSavedCard = (card: SavedCard) => {
		setSelectedCardId(card.id);
		setShowCardForm(false);
		// Pre-fill form with saved card details (only last 4 digits shown)
		setValue('cardNumber', `**** **** **** ${card.cardNumber}`);
		setValue('nameOnCard', card.nameOnCard);
		setValue('expirationDate', card.expirationDate);
	};
	
	// Add new card
	const addNewCard = () => {
		setSelectedCardId(null);
		setShowCardForm(true);
		reset();
	};
	
	
	return (
		<div className="w-full max-w-4xl mx-auto">
			<div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
				{/* Header */}
				<div className="text-center mb-8">
					<h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Method</h2>
					<p className="text-gray-600">Choose how you'd like to pay for your order</p>
				</div>

				<form onSubmit={handleSubmit(handleFormSubmit)}>
					{/* Payment Method Selection */}
					<div className="mb-8">
						<h3 className="text-lg font-semibold text-gray-900 mb-4">Select Payment Method</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{/* Cash on Delivery Option */}
							<div 
								className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
									paymentMethod === "cod" 
										? 'border-blue-500 bg-blue-50 shadow-md' 
										: 'border-gray-200 hover:border-gray-300 bg-white'
								}`}
								onClick={() => setPaymentMethod("cod")}
							>
								<div className="flex items-center space-x-3">
									<div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
										paymentMethod === "cod" ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
									}`}>
										{paymentMethod === "cod" && (
											<div className="w-2 h-2 bg-white rounded-full"></div>
										)}
									</div>
									<div className="flex-1">
										<div className="flex items-center space-x-2">
											<svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
											</svg>
											<span className="font-medium text-gray-900">Cash on Delivery</span>
										</div>
										<p className="text-sm text-gray-600 mt-1">Pay with cash when your order arrives</p>
									</div>
								</div>
							</div>

							{/* Card Payment Option */}
							<div 
								className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
									paymentMethod === "card" 
										? 'border-blue-500 bg-blue-50 shadow-md' 
										: 'border-gray-200 hover:border-gray-300 bg-white'
								}`}
								onClick={() => setPaymentMethod("card")}
							>
								<div className="flex items-center space-x-3">
									<div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
										paymentMethod === "card" ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
									}`}>
										{paymentMethod === "card" && (
											<div className="w-2 h-2 bg-white rounded-full"></div>
										)}
									</div>
									<div className="flex-1">
										<div className="flex items-center space-x-2">
											<svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
											</svg>
											<span className="font-medium text-gray-900">Credit/Debit Card</span>
										</div>
										<p className="text-sm text-gray-600 mt-1">Secure payment through our gateway</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Card Payment Form */}
					{paymentMethod === "card" && (
						<div className="bg-gray-50 rounded-lg p-6 mb-6">
							<h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
								<svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
								</svg>
								Card Details
							</h4>
							
							<div className="space-y-4">
								{/* Card Number */}
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
									<Input
										{...register("cardNumber", {
											required: true,
											pattern: /^[\d\s]{13,19}$/,
										})}
										className="w-full"
										placeholder="1234 5678 9012 3456"
										onChange={formatCardNumber}
										maxLength={19}
										inputMode="numeric"
									/>
									{errors.cardNumber && (
										<p className="text-sm text-red-500 mt-1">Please enter a valid card number</p>
									)}
								</div>

								{/* Name on Card */}
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">Name on Card</label>
									<Input
										{...register("nameOnCard", {required: true})}
										className="w-full"
										placeholder="John Doe"
									/>
									{errors.nameOnCard && (
										<p className="text-sm text-red-500 mt-1">Please enter the name on your card</p>
									)}
								</div>

								{/* Expiry and CVC */}
								<div className="grid grid-cols-2 gap-4">
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
										<Input
											{...register("expirationDate", {
												required: true,
												pattern: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
											})}
											className="w-full"
											placeholder="MM/YY"
											onChange={formatExpirationDate}
											maxLength={5}
											inputMode="numeric"
										/>
										{errors.expirationDate && (
											<p className="text-sm text-red-500 mt-1">Please enter a valid expiry date</p>
										)}
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">CVC</label>
										<Input
											{...register("cvc", {
												required: true,
												pattern: /^[0-9]{3,4}$/,
											})}
											className="w-full"
											placeholder="123"
											onChange={formatCVC}
											maxLength={4}
											inputMode="numeric"
										/>
										{errors.cvc && (
											<p className="text-sm text-red-500 mt-1">Please enter a valid CVC</p>
										)}
									</div>
								</div>

								{/* Save Card Checkbox */}
								<div className="flex items-center pt-2">
									<input
										type="checkbox"
										id="saveCardDetails"
										checked={saveCardDetails}
										onChange={(e) => setSaveCardDetails(e.target.checked)}
										className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
									/>
									<label htmlFor="saveCardDetails" className="ml-2 text-sm text-gray-700">
										Save this card for future payments
									</label>
								</div>
							</div>
						</div>
					)}

					{/* Saved Cards Section */}
					{savedCards.length > 0 && (
						<div className="mb-6">
							<h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
								<svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								Saved Cards
							</h4>
							<div className="space-y-3">
								{savedCards.map((card) => (
									<div key={card.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
										<div className="flex items-center justify-between">
											<div className="flex items-center space-x-3">
												<div className="w-10 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center">
													<svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
													</svg>
												</div>
												<div>
													<p className="font-medium text-gray-900">{card.nameOnCard}</p>
													<p className="text-sm text-gray-600">
														**** **** **** {card.cardNumber} • Expires {card.expirationDate}
													</p>
												</div>
											</div>
											<div className="flex items-center space-x-2">
												{card.isDefault && (
													<span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full font-medium">
														Default
													</span>
												)}
												<button
													onClick={() => useSavedCard(card)}
													className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
												>
													Use
												</button>
												{!card.isDefault && (
													<button
														onClick={() => setDefaultCard(card.id)}
														className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-md transition-colors"
													>
														Set Default
													</button>
												)}
												<button
													onClick={() => deleteCard(card.id)}
													className="px-3 py-1 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
												>
													Delete
												</button>
											</div>
										</div>
									</div>
								))}
							</div>
							<Button
								type="button"
								className="w-full mt-4"
								variant="border"
								onClick={addNewCard}
							>
								<svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
								</svg>
								Add New Card
							</Button>
						</div>
					)}

					{/* Submit Button */}
					<div className="pt-4">
						<Button
							type="submit"
							className="w-full h-12 text-lg font-semibold"
							variant="formButton"
							disabled={isLoading}
						>
							{isLoading ? (
								<div className="flex items-center justify-center">
									<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
									Processing...
								</div>
							) : (
								`Complete Payment ${paymentMethod === "cod" ? "(Cash on Delivery)" : ""}`
							)}
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default PaymentMethod;
