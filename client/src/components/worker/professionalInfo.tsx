"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
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
import { useSelector } from 'react-redux';
import { useEffect, useState, useMemo } from 'react';
import { useProfessionalInfoMutation } from '@/lib/features/api/workerApiSlice';
import { useGetCategoryNameQuery } from '@/lib/features/api/customerApiSlice';
import Select, { SingleValue } from 'react-select';
import countryList from 'react-select-country-list';
import { City, State, Country } from 'country-state-city';

import { professionalInfoFormSchema } from '@/lib/formSchema';

// Replace with your actual Google Maps API key
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

type SelectOption = {
  value: string;
  label: string;
};

type FormValues = z.infer<typeof professionalInfoFormSchema>;

export default function ProfessionalInfo() {
  const [workerSignupDetails, setWorkerSignupDetails] = useState<Record<string, any>>({});
  const [categoryOptions, setCategoryOptions] = useState<SelectOption[]>([]);
  const [countryOptions, setCountryOptions] = useState<SelectOption[]>([]);
  const [stateOptions, setStateOptions] = useState<SelectOption[]>([]);
  const [cityOptions, setCityOptions] = useState<SelectOption[]>([]);

  const workersignupData = useSelector((state: any) => state.WorkerSignupData);
  const [ProfessionalInfo, { isLoading }] = useProfessionalInfoMutation();
  const { data: categoryData } = useGetCategoryNameQuery('');

  const router = useRouter();

  const countries = useMemo(() => countryList().getData(), []);

  useEffect(() => {
    setCountryOptions(countries);
    setWorkerSignupDetails(workersignupData);
  }, [countries, workersignupData]);

  useEffect(() => {
    if (categoryData) {
      setCategoryOptions(categoryData?.result?.map((category: string) => ({ value: category, label: category })));
    }
    alert(JSON.stringify(categoryOptions))
  }, [categoryData]);

  const form = useForm<FormValues>({
    resolver: zodResolver(professionalInfoFormSchema),
    defaultValues: {
      Category: undefined,
      Country: undefined,
      StreetAddress: "",
      City: undefined,
      Identity: undefined,
      Apt: "",
      State: undefined,
      PostalCode: "",
    },
  });

  const onCountryChange = (selectedOption: SingleValue<SelectOption>) => {
    form.setValue('Country', selectedOption as SelectOption);
    form.setValue('State', null);
    form.setValue('City', null);
    form.setValue('StreetAddress', '');
    form.setValue('PostalCode', '');
    if (selectedOption) {
      const states = State.getStatesOfCountry(selectedOption.value);
      setStateOptions(states.map(state => ({ value: state.isoCode, label: state.name })));
    } else {
      setStateOptions([]);
    }
    setCityOptions([]);
  };

  const onStateChange = (selectedOption: SingleValue<SelectOption>) => {
    form.setValue('State', selectedOption as SelectOption);
    form.setValue('City', null);
    form.setValue('StreetAddress', '');
    form.setValue('PostalCode', '');
    if (selectedOption) {
      const countryValue = form.getValues('Country')?.value;
      if (countryValue) {
        const cities = City.getCitiesOfState(countryValue, selectedOption.value);
        setCityOptions(cities.map(city => ({ value: city.name, label: city.name })));
      }
    } else {
      setCityOptions([]);
    }
  };

  const onCityChange = async (selectedOption: SingleValue<SelectOption>) => {
    form.setValue('City', selectedOption as SelectOption);
    if (selectedOption) {
      const country = form.getValues('Country')?.label;
      const state = form.getValues('State')?.label;
      const city = selectedOption.label;
      
      if (country && state && city) {
        try {
          const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(`${city}, ${state}, ${country}`)}&key=${GOOGLE_MAPS_API_KEY}`);
          const data = await response.json();
          
          if (data.results && data.results.length > 0) {
            const addressComponents = data.results[0].address_components;
            const streetNumber = addressComponents.find((component: any) => component.types.includes('street_number'))?.long_name || '';
            const route = addressComponents.find((component: any) => component.types.includes('route'))?.long_name || '';
            const postalCode = addressComponents.find((component: any) => component.types.includes('postal_code'))?.long_name || '';
            
            form.setValue('StreetAddress', `${streetNumber} ${route}`.trim());
            form.setValue('PostalCode', postalCode);
          }
        } catch (error) {
          console.error('Error fetching address details:', error);
        }
      }
    } else {
      form.setValue('StreetAddress', '');
      form.setValue('PostalCode', '');
    }
  };

  const onSubmit = async (values: FormValues) => {
    try {
      if (isLoading) return;

      console.log(JSON.stringify(values))
      alert(JSON.stringify(values?.Category))

      const formData = new FormData();
      if (values.Identity instanceof File) {
        formData.append('Identity', values.Identity);
      }
     
      for (const [key, value] of Object.entries(values)) {
        if (key !== "Identity") {
          if (value && typeof value === 'object' && 'value' in value) {
            formData.append(key, value?.value);
          } else if (value) {
            formData.append(key, value.toString());
          }
        }
      }

      const signupData: Record<string, any> = workerSignupDetails.signUpData || {};

      for (const [key, value] of Object.entries(signupData)) {
        formData.append(key, value);
      }

      const res = await ProfessionalInfo(formData).unwrap();
      
      if (res.success) {
        toast.success(res.message);
        setTimeout(() => {
          router.push(`/worker/workerOtp/${res.worker}`);
        }, 4000);
      }
    } catch (err) {
      toast.error('Error: Registration failed. Please check your input and try again.');
      console.error(err);
    }
  };

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
                    <Select<SelectOption>
                      {...field}
                      options={categoryOptions}
                      className="basic-single"
                      classNamePrefix="select"
                      placeholder="Select category"
                      isClearable
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Controller
                name="Country"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select country</FormLabel>
                    <Select<SelectOption>
                      {...field}
                      options={countryOptions}
                      className="basic-single"
                      classNamePrefix="select"
                      placeholder="Select country"
                      onChange={onCountryChange}
                      isClearable
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Controller
                name="State"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State / Province</FormLabel>
                    <Select<SelectOption>
                      {...field}
                      options={stateOptions}
                      className="basic-single"
                      classNamePrefix="select"
                      placeholder="Select state"
                      onChange={onStateChange}
                      isClearable
                      isDisabled={!form.getValues('Country')}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Controller
                name="City"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <Select<SelectOption>
                      {...field}
                      options={cityOptions}
                      className="basic-single"
                      classNamePrefix="select"
                      placeholder="Select city"
                      onChange={onCityChange}
                      isClearable
                      isDisabled={!form.getValues('State')}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='w-[50%]'>
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
              <FormField
                control={form.control}
                name="Identity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Identity</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            field.onChange(file);
                          }
                        }}
                        className="w-full mt-2 p-2 border border-gray-300 rounded"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
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