"use client";

import axios from 'axios';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSignUpMutation } from '@/lib/features/api/userApiSlice';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Toaster, toast } from 'sonner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PulseLoader } from 'react-spinners';
import { FormValues } from '../../types/workerTypes';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useProfessionalInfoMutation } from '@/lib/features/api/workerApiSlice';  // * API call
import { professionalInfoFormSchema } from '@/lib/formSchema';
import { useGetCategoryNameQuery } from '@/lib/features/api/customerApiSlice';

export default function ProfessionalInfo() {

  const [workerSignupDetails, setWorkerSignupDetails] = useState({});
  const [categoryName, setCategoryName] = useState<string[]>([]);

  // * get value from redux
  const workersignupData = useSelector((state: any) => state.WorkerSignupData);

  // * API Calls 
  const [ProfessionalInfo, { isLoading }] = useProfessionalInfoMutation();
  const { data } = useGetCategoryNameQuery('');
  console.log(data)

  const Router = useRouter();

  useEffect(() => {
    setWorkerSignupDetails(workersignupData);
  }, [workersignupData]);

  useEffect(() => {
    if (data) {
      setCategoryName(data.result);
    }
  }, [data]);

  const form = useForm<z.infer<typeof professionalInfoFormSchema>>({
    resolver: zodResolver(professionalInfoFormSchema),
    defaultValues: {
      Category: "",
      Country: "",
      StreetAddress: "",
      City: "",
      Identity: undefined, // Changed from `undefined` to `null`
      Apt: "",
      State: "",
      PostalCode: "",
    },
  });

  // * Form Handler
  async function onSubmit(values: z.infer<typeof professionalInfoFormSchema>) {
    try {
      if (isLoading) return;

      const formData = new FormData();
      formData.append('Identity', values.Identity);

      for (let key in values) {
        if (key !== "Identity") {
          formData.append(key, values[key]);
        }
      }

      const signupData: any = workerSignupDetails.signUpData;

      for (let key in signupData) {
        formData.append(key, signupData[key]);
      }

      const res = await ProfessionalInfo(formData).unwrap();
      if (res.success) {
        toast.success(res.message);
        setTimeout(() => {
          Router.push(`/worker/workerOtp/${res.worker}`);
        }, 4000);
      }
    } catch (err) {
      toast.error('Error: Registration failed. Please check your input and try again.');
      console.log(err);
    }
  }

  return (
    <div className="max-w-[71rem] mx-auto bg-white shadow-lg rounded-lg p-6 mb-8 mt-[8em]">
      <h2 className="text-2xl font-bold text-center mb-6">Professional Information</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col gap-6 max-w-[100%]">
          <div className='flex gap-4'>
            <div className='w-[50%]'>
              <FormField
                control={form.control}
                name="Category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select category</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="p-2 rounded w-full border border-gray-300"
                      >
                        <option value="" disabled>Select category</option>
                        {categoryName.map((category, index) => (
                          <option key={index} value={category}>{category}</option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select country</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Select country"
                        {...field}
                        className="p-2 rounded w-full border border-gray-300"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="StreetAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your street address"
                        {...field}
                        className="p-2 rounded w-full border border-gray-300"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="City"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="City"
                        {...field}
                        className="p-2 rounded w-full border border-gray-300"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='w-[50%]'>
              <FormField
                control={form.control}
                name="Identity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Identity</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        onChange={(e: any) => {
                          const file = e.target.files?.[0];
                          field.onChange(file);
                        }}
                        className="w-full mt-2 p-2 border border-gray-300 rounded"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Apt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apt / Suite</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your Apt / Suite"
                        {...field}
                        className="p-2 rounded w-full border border-gray-300"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="State"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State / Province</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your State / Province"
                        {...field}
                        className="p-2 rounded w-full border border-gray-300"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="PostalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Postal Code"
                        {...field}
                        className="p-2 rounded w-full border border-gray-300"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button type="submit" className="w-full mt-4 cursor-pointer">
            {isLoading ? <PulseLoader size={6} color="#ffffff" /> : "Submit"}
          </Button>
        </form>
      </Form>
      <Toaster richColors position="top-right" /> 
    </div>
  );
}
