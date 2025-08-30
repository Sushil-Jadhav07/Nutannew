import {useForm} from 'react-hook-form';
import Input from '../shared/form/input';
import React, {useState, useEffect, useContext} from "react";
import Button from "@/components/shared/button";
import {RadioGroup, RadioGroupItem} from "@/components/shared/radio-group";
import { AuthContext } from '@/contexts/AuthProvider';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '@/config/firebase';

interface ShippingFormData {
	firstName: string
	address: string
	city: string
	country: string
	state: string
	postalCode: string
	addressType: "home" | "office"
}

interface SavedAddress {
	id: string;
	firstName: string;
	address: string;
	city: string;
	country: string;
	state: string;
	postalCode: string;
	addressType: "home" | "office";
	isDefault?: boolean;
}

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

interface ShippingAddressProps {
	onComplete: (data: ShippingFormData) => void
	userProfile: UserProfileData | null
}

const ShippingAddress: React.FC<ShippingAddressProps> = ({onComplete, userProfile}) => {
	const { user } = useContext(AuthContext);
	const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>([]);
	const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
	const [showNewAddressForm, setShowNewAddressForm] = useState(false);
	const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		reset
	} = useForm<ShippingFormData>({
		defaultValues: {
			firstName: userProfile?.userName?.split(' ')[0] || "Luhan",
			address: userProfile?.address || "589 Sunset Blvd, Los Angeles",
			city: userProfile?.city || "Norris",
			country: userProfile?.country || "United States",
			state: userProfile?.state || "Los Angeles",
			postalCode: userProfile?.pincode || "90017",
			addressType: "home",
		},
	})
	
	const [addressType, setAddressType] = useState("home");
	
	// Fetch saved addresses from Firebase
	useEffect(() => {
		const fetchSavedAddresses = async () => {
			if (!user?.uid) return;
			
			try {
				const userDoc = await getDoc(doc(db, 'users', user.uid));
				if (userDoc.exists()) {
					const data = userDoc.data();
					const addresses = data.shippingAddresses || [];
					setSavedAddresses(addresses);
					
					// Set default address if exists
					const defaultAddress = addresses.find((addr: SavedAddress) => addr.isDefault);
					if (defaultAddress) {
						setSelectedAddressId(defaultAddress.id);
					}
				}
			} catch (error) {
				console.error('Error fetching saved addresses:', error);
			}
		};
		
		fetchSavedAddresses();
	}, [user]);
	
	// Update form values when userProfile changes
	useEffect(() => {
		if (userProfile) {
			const nameParts = userProfile.userName.split(' ');
			setValue('firstName', nameParts[0] || '');
			setValue('address', userProfile.address || '');
			setValue('city', userProfile.city || '');
			setValue('country', userProfile.country || '');
			setValue('state', userProfile.state || '');
			setValue('postalCode', userProfile.pincode || '');
		}
	}, [userProfile, setValue]);
	
	// Handle address selection
	const handleAddressSelect = (address: SavedAddress) => {
		setSelectedAddressId(address.id);
		setShowNewAddressForm(false);
		setEditingAddressId(null);
	};
	
	// Handle edit address
	const handleEditAddress = (address: SavedAddress) => {
		setEditingAddressId(address.id);
		setShowNewAddressForm(true);
		setSelectedAddressId(null);
		
		// Populate form with address data
		setValue('firstName', address.firstName);
		setValue('address', address.address);
		setValue('city', address.city);
		setValue('country', address.country);
		setValue('state', address.state);
		setValue('postalCode', address.postalCode);
		setAddressType(address.addressType);
	};
	
	// Save new address or update existing address
	const handleSaveAddress = async (formData: ShippingFormData) => {
		if (!user?.uid) return;
		
		setIsLoading(true);
		try {
			if (editingAddressId) {
				// Update existing address
				const updatedAddresses = savedAddresses.map((addr: SavedAddress) => 
					addr.id === editingAddressId 
						? { ...formData, id: addr.id, isDefault: addr.isDefault }
						: addr
				);
				
				await updateDoc(doc(db, 'users', user.uid), {
					shippingAddresses: updatedAddresses
				});
				
				setSavedAddresses(updatedAddresses);
				setEditingAddressId(null);
			} else {
				// Add new address
				const newAddress: SavedAddress = {
					id: Date.now().toString(),
					...formData,
					isDefault: savedAddresses.length === 0 // First address becomes default
				};
				
				await updateDoc(doc(db, 'users', user.uid), {
					shippingAddresses: arrayUnion(newAddress)
				});
				
				setSavedAddresses(prev => [...prev, newAddress]);
				setSelectedAddressId(newAddress.id);
			}
			
			setShowNewAddressForm(false);
			reset();
			
		} catch (error) {
			console.error('Error saving address:', error);
		} finally {
			setIsLoading(false);
		}
	};
	
	// Set default address
	const setDefaultAddress = async (addressId: string) => {
		if (!user?.uid) return;
		
		try {
			const updatedAddresses = savedAddresses.map((addr: SavedAddress) => ({
				...addr,
				isDefault: addr.id === addressId
			}));
			
			await updateDoc(doc(db, 'users', user.uid), {
				shippingAddresses: updatedAddresses
			});
			
			setSavedAddresses(updatedAddresses);
		} catch (error) {
			console.error('Error setting default address:', error);
		}
	};
	
	// Delete address
	const deleteAddress = async (addressId: string) => {
		if (!user?.uid) return;
		
		try {
			const updatedAddresses = savedAddresses.filter((addr: SavedAddress) => addr.id !== addressId);
			await updateDoc(doc(db, 'users', user.uid), {
				shippingAddresses: updatedAddresses
			});
			
			setSavedAddresses(updatedAddresses);
			
			// Clear selection if deleted address was selected
			if (selectedAddressId === addressId) {
				setSelectedAddressId(null);
			}
			if (editingAddressId === addressId) {
				setEditingAddressId(null);
				setShowNewAddressForm(false);
			}
		} catch (error) {
			console.error('Error deleting address:', error);
		}
	};
	
	// Cancel edit mode
	const cancelEdit = () => {
		setEditingAddressId(null);
		setShowNewAddressForm(false);
		reset();
	};
	
	return (
		<div className="w-full">
			{/* Display Saved Addresses */}
			{savedAddresses.length > 0 && (
				<div className="mb-6">
					<h3 className="text-lg font-semibold text-brand-dark mb-4">Saved Addresses</h3>
					<div className="space-y-3">
						{savedAddresses.map((address) => (
							<div 
								key={address.id}
								className={`p-4 border rounded-lg cursor-pointer transition-all ${
									selectedAddressId === address.id 
										? 'border-brand bg-brand/5' 
										: 'border-gray-200 hover:border-gray-300'
								}`}
								onClick={() => handleAddressSelect(address)}
							>
								<div className="flex items-start justify-between">
									<div className="flex-1">
										<div className="flex items-center gap-2 mb-2">
											<span className="font-medium text-brand-dark">
												{address.firstName}
											</span>
											{address.isDefault && (
												<span className="px-2 py-1 text-xs bg-brand text-white rounded-full">
													Default
												</span>
											)}
										</div>
										<div className="text-sm text-gray-600">
											{address.address}, {address.city}, {address.state} {address.postalCode}, {address.country}
										</div>
										<div className="text-xs text-gray-500 mt-1 capitalize">
											{address.addressType} Address
										</div>
									</div>
									<div className="flex gap-2 ml-4">
										<button
											onClick={(e) => {
												e.stopPropagation();
												handleEditAddress(address);
											}}
											className="text-xs text-blue-500 hover:text-blue-700"
										>
											Edit
										</button>
										{!address.isDefault && (
											<button
												onClick={(e) => {
													e.stopPropagation();
													setDefaultAddress(address.id);
												}}
												className="text-xs text-brand hover:text-brand-dark"
											>
												Set Default
											</button>
										)}
										<button
											onClick={(e) => {
												e.stopPropagation();
												deleteAddress(address.id);
											}}
											className="text-xs text-red-500 hover:text-red-700"
										>
											Delete
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			)}
			
			{/* Add New Address Button */}
			{!showNewAddressForm && (
				<div className="mb-6">
					<Button
						type="button"
						variant="border"
						onClick={() => setShowNewAddressForm(true)}
						className="w-full"
					>
						+ Add New Address
					</Button>
				</div>
			)}
			
			{/* New Address Form or Edit Form */}
			{showNewAddressForm && (
				<div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
					<div className="flex items-center justify-between mb-4">
						<h4 className="text-lg font-semibold text-brand-dark">
							{editingAddressId ? 'Edit Address' : 'Add New Address'}
						</h4>
						<button
							onClick={cancelEdit}
							className="text-gray-500 hover:text-gray-700"
						>
							✕
						</button>
					</div>
					
					<form onSubmit={handleSubmit(handleSaveAddress)} noValidate>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<Input
								label={"First Name"}
								{...register("firstName", {
									required: 'First name is required',
								})}
								error={errors.firstName?.message}
							/>
							
							<Input
								label={"Address"}
								{...register("address", {
									required: 'Address is required',
								})}
								error={errors.address?.message}
							/>
							
							<Input
								label={"City"}
								{...register("city", {
									required: 'City is required',
								})}
								className="w-full"
							/>
							
							<Input
								label={"Country"}
								{...register("country", {
									required: 'Country is required',
								})}
								className="w-full"
							/>
							
							<Input
								label={"State"}
								{...register("state", {
									required: 'State is required',
								})}
								className="w-full"
							/>
							
							<Input
								label={"Postal Code"}
								{...register('postalCode', {
									required: 'Postal code is required',
									pattern: {
										value: /^[0-9A-Za-z\s-]{3,10}$/,
										message: 'Please enter a valid postal code',
									}
								})}
								className="w-full"
								error={errors.postalCode?.message}
							/>
						</div>
						
						{/* Address type */}
						<div className="mt-4">
							<label className="block text-brand-dark font-medium text-sm leading-none mb-3">
								Address Type
							</label>
							<RadioGroup value={addressType} onValueChange={setAddressType} className="grid-cols-1 sm:grid-cols-2 sm:gap-6">
								<div className="flex items-center space-x-2">
									<RadioGroupItem value={'home'} id="r1"/>
									<label htmlFor="r1" className="text-sm font-medium text-brand-dark">
										Home <span className="font-light">(All Day Delivery)</span>
									</label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem value='office' id="r2"/>
									<label htmlFor="r2" className="text-sm font-medium text-brand-dark">
										Office <span className="font-light">(Delivery 9 AM - 5 PM)</span>
									</label>
								</div>
							</RadioGroup>
						</div>
						
						<div className="flex gap-3 mt-6">
							<Button
								type="submit"
								variant="formButton"
								disabled={isLoading}
								className="flex-1"
							>
								{isLoading ? 'Saving...' : (editingAddressId ? 'Update Address' : 'Save Address')}
							</Button>
							<Button
								type="button"
								variant="border"
								onClick={cancelEdit}
								className="flex-1"
							>
								Cancel
							</Button>
						</div>
					</form>
				</div>
			)}
			
			{/* Continue to Payment Button */}
			{savedAddresses.length > 0 && selectedAddressId && (
				<div className="mt-6">
					<Button
						type="button"
						variant="formButton"
						onClick={() => {
							const selectedAddress = savedAddresses.find((addr: SavedAddress) => addr.id === selectedAddressId);
							if (selectedAddress) {
								onComplete(selectedAddress);
							}
						}}
						className="w-full"
					>
						Continue to Payment
					</Button>
				</div>
			)}
		</div>
	);
};

export default ShippingAddress;
