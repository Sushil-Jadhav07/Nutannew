import Input from '@/components/shared/form/input';
import Button from '@/components/shared/button';
import Heading from '@/components/shared/heading';
import {useForm} from 'react-hook-form';
import TextArea from "@/components/shared/form/text-area";
import React, {useState, useContext, useEffect} from "react";
import {
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
} from '@headlessui/react';
import { FaCaretDown } from "react-icons/fa";
import cn from "classnames";
import Divider from "@/components/shared/divider";
import { AuthContext } from '@/contexts/AuthProvider';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from '@/config/firebase';
import { updateProfile } from 'firebase/auth';
import { useToast } from '@/contexts/ToastContext';


interface UserProfileData {
    userName: string;
    email: string;
    address: string;
    dateOfBirth: string;
    gender: string;
    phoneNumber: string;
    message: string;
}

const defaultValues: UserProfileData = {
    userName: '',
    email: '',
    address: '',
    dateOfBirth: '',
    gender: 'Male',
    phoneNumber: '',
    message: ''
};

const AccountInfo: React.FC = () => {
    const { user, isAuthenticated, loading } = useContext(AuthContext);
    const { showToast } = useToast();
    const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateMessage, setUpdateMessage] = useState('');
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm<UserProfileData>({
        defaultValues,
    });
    

    
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
                        dateOfBirth: data.dateOfBirth || '',
                        gender: data.gender || 'Male',
                        phoneNumber: data.contact || data.phoneNumber || '',
                        message: data.message || ''
                    };
                    
                    setUserProfile(profileData);
                    
                    // Set form values
                    Object.keys(profileData).forEach((key) => {
                        setValue(key as keyof UserProfileData, profileData[key as keyof UserProfileData]);
                    });
                } else {
                    // Create default profile if user doesn't exist in Firestore
                    const defaultProfile: UserProfileData = {
                        userName: user.displayName || user.email?.split('@')[0] || '',
                        email: user.email || '',
                        address: '',
                        dateOfBirth: '',
                        gender: 'Male',
                        phoneNumber: '',
                        message: ''
                    };
                    
                    setUserProfile(defaultProfile);
                    Object.keys(defaultProfile).forEach((key) => {
                        setValue(key as keyof UserProfileData, defaultProfile[key as keyof UserProfileData]);
                    });
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };
        
        if (isAuthenticated && user) {
            fetchUserProfile();
        }
    }, [user, isAuthenticated, setValue]);
    
    async function onSubmit(input: UserProfileData) {
        if (!user?.uid || !auth.currentUser) {
            const authError = 'Authentication error. Please sign in again.';
            setUpdateMessage(authError);
            showToast(authError, 'error');
            return;
        }
        

        
        setIsUpdating(true);
                setUpdateMessage('');
        
        try {
            // Prepare update data
            const updateData = {
                name: input.userName,
                email: input.email,
                address: input.address,
                dateOfBirth: input.dateOfBirth,
                gender: input.gender,
                contact: input.phoneNumber,
                message: input.message,
                updatedAt: new Date().toISOString()
            };
            
            // Update Firestore user document
            await updateDoc(doc(db, 'users', user.uid), updateData);
            
            // Update Firebase Auth profile if name changed
            if (auth.currentUser && input.userName !== user.displayName) {
                await updateProfile(auth.currentUser, {
                    displayName: input.userName
                });
            }
            
            setUserProfile(input);
            showToast('Profile updated successfully!', 'success');
        } catch (error) {
            console.error('Error updating profile:', error);
            const errorMessage = `Failed to update profile: ${error instanceof Error ? error.message : 'Unknown error'}`;
            setUpdateMessage(errorMessage);
            showToast(errorMessage, 'error');
        } finally {
            setIsUpdating(false);
        }
    }
    
    const people = [
        { id: 1, name: 'Male' },
        { id: 2, name: 'Female' },
        { id: 3, name: 'Other' },
    ]
    const [selected, setSelected] = useState(people[0])
    
    // Update selected gender when form value changes
    useEffect(() => {
        if (userProfile?.gender) {
            const genderOption = people.find(p => p.name === userProfile.gender);
            if (genderOption) {
                setSelected(genderOption);
            }
        }
    }, [userProfile?.gender]);
    
    // Update form when gender selection changes
    const handleGenderChange = (gender: typeof people[0]) => {
        setSelected(gender);
        setValue('gender', gender.name);
    };
    
    // Show loading state while fetching user data
    if (loading || !userProfile) {
        return (
            <div className="flex flex-col w-full items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                <p className="mt-4 text-gray-600">Loading your profile...</p>
            </div>
        );
    }
    
    return (
        <div className="flex flex-col w-full">
            
            <div className="dashboard__main-top">
                <div className="flex flex-col sm:flex-row flex-wrap">
                    <div className="w-full sm:w-1/2">
                        <div className="flex items-center gap-5">
                            {/* <div className="relative">
                                <div className={"w-20 h-20"}>
                                    <Image
                                        src={userProfile?.photoURL || user?.photoURL || "/assets/images/support/3.png"}
                                        alt={"avatar"}
                                        width={90}
                                        height={90}
                                        className=" rounded-full"
                                    />
                                </div>
                                
                                <input id="profile-thumb-input" className="hidden" type="file"/>
                                <label
                                    htmlFor="profile-thumb-input"
                                    className="flex items-center justify-center border-2 rounded-full text-white w-8 h-8 absolute bottom-2 border-white -right-2 bg-gray-500 text-center cursor-pointer">
                                    <FaCamera/>
                                </label>
                            </div> */}
                            
                            <div className="dashboard__main-content">
                                <h4 className="text-brand-dark text-xl font-semibold mb-1">
                                    Welcome {userProfile?.userName || user?.displayName || 'User'}.
                                </h4>
                                <p className="text-base mb-0">
                                    {userProfile?.email || user?.email || 'No email'} 
                                    
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full sm:w-1/2"></div>
                </div>
            </div>
            <Divider />
            <Heading variant="titleMedium" className="mb-5 md:mb-6 lg:mb-7 ">
                Account Information
            </Heading>
            
            {/* Update Message - Only show errors */}
            {updateMessage && !updateMessage.includes('successfully') && (
                <div className="mb-6 p-4 rounded-lg bg-red-100 text-red-800 border border-red-200">
                    {updateMessage}
                </div>
            )}
            

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col justify-center w-full mx-auto"
                noValidate
            >
                <div className="pb-7 md:pb-8 lg:pb-10">
                    <div className="flex flex-col space-y-4 sm:space-y-5">
                        <div className="flex flex-col sm:flex-row -mx-1.5 md:-mx-2.5 space-y-4 sm:space-y-0">
                            <Input
                                label={'User Name'}
                                {...register('userName', {
                                    required: 'User name is required',
                                })}
                                variant="solid"
                                defaultValue="Luhan Nguyen"
                                className="w-full sm:w-1/2 px-1.5 md:px-2.5"
                                error={errors.userName?.message}
                            />
                            <Input
                                type="email"
                                label={('Email') as string}
                                {...register('email', {
                                    required: 'You must need to provide your email address',
                                    pattern: {
                                        value:
                                            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: 'Please provide valid email address',
                                    },
                                })}
                                variant="solid"
                                defaultValue="yourexample@email.com"
                                className="w-full sm:w-1/2 px-1.5 md:px-2.5"
                                error={errors.email?.message}
                            />
                        </div>
                        
                        <div className="flex flex-col sm:flex-row -mx-1.5 md:-mx-2.5 space-y-4 sm:space-y-0">
                            <Input
                                label={"Address"}
                                {...register('address', {
                                    required: 'Address is required',
                                })}
                                variant="solid"
                                className="w-full sm:w-1/2 px-1.5 md:px-2.5"
                                error={errors.address?.message}
                            />
                            <Input
                                label={"Date of birth"}
                                {...register('dateOfBirth', {
                                    required: 'Date of birth is required',
                                })}
                                variant="solid"
                                type="date"
                                className="w-full sm:w-1/2 px-1.5 md:px-2.5"
                                error={errors.dateOfBirth?.message}
                            />
                        </div>
                        
                        <div className="flex flex-col sm:flex-row -mx-1.5 md:-mx-2.5 space-y-4 sm:space-y-0">
                            <div className="w-full sm:w-1/2 px-1.5 md:px-2.5">
                                <label
                                    htmlFor={"gender"}
                                    className={`block text-brand-dark font-medium text-sm leading-none mb-3 cursor-pointer`}
                                >
                                    Gender
                                </label>
                                <Listbox value={selected} onChange={handleGenderChange}>
                                    <ListboxButton
                                        className={cn(
                                            'py-2 px-4 w-full text-start appearance-none relative transition duration-150 ease-in-out border  text-13px lg:text-sm font-body rounded  min-h-11 transition duration-200 ease-in-out ',
                                            'focus:ring-0 text-brand-dark border-border-two focus:border-1 focus:outline-none focus:border-gray-400 h-11'
                                        )}
                                    >
                                        {selected.name}
                                        <FaCaretDown
                                            className="group pointer-events-none absolute top-2.5 end-2.5 size-4 fill-black/60 text-black"
                                            aria-hidden="true"
                                        />
                                    </ListboxButton>
                                    <ListboxOptions
                                        anchor="bottom"
                                        transition
                                        className={cn(
                                            'w-[var(--button-width)] rounded border border-black/15 bg-white p-1 drop-shadow-md focus:outline-none',
                                            'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
                                        )}
                                    >
                                        {people.map((person) => (
                                            <ListboxOption
                                                key={person.name}
                                                value={person}
                                                className="group flex cursor-pointer items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
                                            >
                                                <div className="text-sm text-black">{person.name}</div>
                                            </ListboxOption>
                                        ))}
                                    </ListboxOptions>
                                </Listbox>
                            </div>
                            
                            
                            <Input
                                type="tel"
                                label={"Phone number"}
                                {...register('phoneNumber', {
                                    required: 'Phone number is required',
                                    pattern: {
                                        value: /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, // allows international formats
                                        message: 'Please enter a valid phone number',
                                    },
                                    minLength: {
                                        value: 7,
                                        message: 'Phone number must be at least 7 digits',
                                    },
                                    maxLength: {
                                        value: 15,
                                        message: 'Phone number must be no more than 15 digits',
                                    },
                                })}
                                variant="solid"
                                defaultValue="003 800 6890"
                                className="w-full sm:w-1/2 px-1.5 md:px-2.5"
                                error={errors.phoneNumber?.message}
                            />
                        </div>
                        
                        <TextArea
                            variant="solid"
                            label="Message"
                            defaultValue="..."
                            {...register('message')}
                            placeholder="Message.."
                        />
                    </div>
                </div>
                
                
                <div className="relative flex pb-2 mt-5 sm:ltr:ml-auto sm:rtl:mr-auto lg:pb-0">
                    <Button
                        type="submit"
                        variant="formButton"
                        className="w-full sm:w-auto"
                        disabled={isUpdating}
                    >
                        {isUpdating ? 'Updating...' : 'Update Account'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AccountInfo;
