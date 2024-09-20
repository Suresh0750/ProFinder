'use client';
import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useCustomerGoogleLoginMutation } from '@/lib/features/api/customerApiSlice';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'sonner';
import Modal from 'react-modal';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Types
import { GoogleLoginCredentials, GoogleWorkerCredentials } from '@/types/utilsTypes';

// Validation Schema using Yup
const schema = yup.object({
  PhoneNumber: yup.string().required('Phone number is required'),
  Password: yup.string().required('Password is required'),
  Category: yup.string().required('Category is required'),
  Country: yup.string().required('Country is required'),
  StreetAddress: yup.string().required('Street Address is required'),
  State: yup.string().required('State is required'),
  City: yup.string().required('City is required'),
  Apt: yup.string(),
  Identity: yup.mixed().required('Identity (image) is required'),
  PostalCode: yup.number().required('Postal Code is required').positive().integer(),
}).required();

const GoogleSignIn: React.FC<{ role: string }> = ({ role }) => {
  const [CustomerGoogleLogin] = useCustomerGoogleLoginMutation();
  const [workerData, setWorkerData] = useState<GoogleWorkerCredentials | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<GoogleWorkerCredentials>({
    resolver: yupResolver(schema),
  });

  // Handle Google login success
  const handleLoginSuccess = async (credentialResponse: any) => {
    console.log('Login Success:', credentialResponse);
    const { email, given_name, picture, family_name } = credentialResponse;
  
    if (role === 'worker') {
      setWorkerData({
        FirstName: given_name,
        LastName: family_name,
        Profile: picture,
        EmailAddress: email,
      });
      setIsModalOpen(true);
    
    } 
  };

  // Handle Google login failure
  const handleLoginFailure = (error: any) => {
    console.log('Login Failed:', error);
  };

  // Submit form data including worker data
  const onSubmit: SubmitHandler<GoogleWorkerCredentials> = async (additionalData) => {
    if (workerData) {
      const completeWorkerData = { ...workerData, ...additionalData };
      console.log('Complete Worker Data:', completeWorkerData);
      
      const result = await CustomerGoogleLogin(completeWorkerData);
      if (result?.data?.success) {
        toast.success(result?.data?.message);
        setIsModalOpen(false);
        router.push('/homePage');
      }
    }
  };

  return (
    <div className="p-4">
      <GoogleLogin
        onSuccess={credentialResponse => {
          const credentialResponseDecoded: any = jwtDecode(credentialResponse.credential);
          console.log(credentialResponseDecoded);
          handleLoginSuccess(credentialResponseDecoded);
        }}
        onError={handleLoginFailure}
      />
      <Toaster richColors position="top-center" />

      {/* Modal for collecting additional worker data */}
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        <h2>Complete Your Profile</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Phone Number"
            {...register('PhoneNumber')}
            className={`border ${errors.PhoneNumber ? 'border-red-500' : 'border-gray-300'}`}
          />
          <p className="text-red-500">{errors.PhoneNumber?.message}</p>

          <input
            type="password"
            placeholder="Password"
            {...register('Password')}
            className={`border ${errors.Password ? 'border-red-500' : 'border-gray-300'}`}
          />
          <p className="text-red-500">{errors.Password?.message}</p>

          <input
            type="text"
            placeholder="Category"
            {...register('Category')}
            className={`border ${errors.Category ? 'border-red-500' : 'border-gray-300'}`}
          />
          <p className="text-red-500">{errors.Category?.message}</p>

          <input
            type="text"
            placeholder="Country"
            {...register('Country')}
            className={`border ${errors.Country ? 'border-red-500' : 'border-gray-300'}`}
          />
          <p className="text-red-500">{errors.Country?.message}</p>

          <input
            type="text"
            placeholder="Street Address"
            {...register('StreetAddress')}
            className={`border ${errors.StreetAddress ? 'border-red-500' : 'border-gray-300'}`}
          />
          <p className="text-red-500">{errors.StreetAddress?.message}</p>

          <input
            type="text"
            placeholder="State"
            {...register('State')}
            className={`border ${errors.State ? 'border-red-500' : 'border-gray-300'}`}
          />
          <p className="text-red-500">{errors.State?.message}</p>

          <input
            type="text"
            placeholder="City"
            {...register('City')}
            className={`border ${errors.City ? 'border-red-500' : 'border-gray-300'}`}
          />
          <p className="text-red-500">{errors.City?.message}</p>

          <input
            type="text"
            placeholder="Apt"
            {...register('Apt')}
            className="border border-gray-300"
          />
          <p className="text-red-500">{errors.Apt?.message}</p>

          <input
            type="file"
            {...register('Identity')}
            className={`border ${errors.Identity ? 'border-red-500' : 'border-gray-300'}`}
          />
          <p className="text-red-500">{errors.Identity?.message}</p>

          <input
            type="number"
            placeholder="Postal Code"
            {...register('PostalCode')}
            className={`border ${errors.PostalCode ? 'border-red-500' : 'border-gray-300'}`}
          />
          <p className="text-red-500">{errors.PostalCode?.message}</p>

          <button type="submit" className="bg-blue-500 text-white p-2">
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default GoogleSignIn;
