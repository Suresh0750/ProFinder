"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import ProfileHeader from "./ProfileHeader";
import Footer from "@/components/Footer";
import { useForm } from "react-hook-form";
import { toast ,Toaster} from "sonner";
import { useRouter } from "next/navigation";
import { useUpdateprofileMutation, useProfileQuery } from "@/lib/features/api/userApiSlice";

interface UserProfile {
  profileImage: File | null;
  username: string;
  email: string;
  phone: number;
}

const ManageAccount: React.FC = () => {
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<UserProfile | null>(null); 
  const [isNewImage, setIsNewImage] = useState<boolean>(false);
  const [newImageData, setNewImageData] = useState<File | null>(null);

  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<UserProfile>();

  const customerData = JSON.parse(localStorage.getItem("customerData") || "{}");
  
  // Fetch user profile data
  const { data, refetch } = useProfileQuery(customerData?._id);
  const [updateprofile] = useUpdateprofileMutation();

  const watchedFields = watch();

  useEffect(() => {
    if (data && data.result) {
      const initialData: UserProfile = {
        username: data.result.username || "",
        email: data.result.EmailAddress || "",
        phone: data.result.PhoneNumber || "",
        profileImage: null,
      };
  
      setInitialValues(initialData);
      setValue("username", data.result.username);
      setValue("email", data.result.EmailAddress);
      setValue("phone", data.result.PhoneNumber);
      setProfileImagePreview(data.result.profile || "");
      localStorage.setItem("userprofile",JSON.stringify(data?.result?.profile))
    }

  }, [data, setValue]);

  // Check if user profile has changes
  const hasChanges = () => {
    if (!initialValues) return false;
    return (
      initialValues.username !== watchedFields.username ||
      initialValues.phone !== watchedFields.phone ||
      newImageData !== null
    );
  };

  // Handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target?.files[0];
    setNewImageData(image);
    setProfileImagePreview(URL.createObjectURL(image));
    setIsNewImage(true);
  };

  // Handle form submission
  const onSubmit = async (data: UserProfile) => {
    setLoading(true);
    try {
      if((String(data.phone)).length!=10){
        toast.error("give valid phone number");
        return 
      }
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("email", data.email);
      formData.append("phone", data.phone);

      if (isNewImage && newImageData) {
        formData.append("newImageData", newImageData);
        formData.append("isImage", "true");
      } else {
        formData.append("isImage", "false");
      }

      const result = await updateprofile(formData).unwrap();
      if (result.success) {
        toast.success("Your profile updated successfully");
        refetch();
      } else {
        toast.info("Something went wrong!");
      }
    } catch (err) {
      toast.error("An error occurred while updating your profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ProfileHeader>
        <div className="md:flex md:space-x-6">
          <div className="md:w-1/3">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                <Image
                  src={profileImagePreview || ""}
                  alt="Profile"
                  width={128}
                  height={128}
                  className="object-cover h-[9em]"
                />
              </div>
              <label className="cursor-pointer bg-gray-200 text-gray-700 py-2 px-4 rounded-md shadow-md hover:bg-gray-300">
                Upload Photo
                <input
                  type="file"
                  name="profileImage"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Image size should be under 1MB and image ratio needs to be 1:1
              </p>
            </div>
          </div>

          <div className="mt-6 md:mt-0 md:w-2/3">
            <h3 className="text-xl font-semibold mb-4">Manage Account</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-gray-700">Username</label>
                <input
                  type="text"
                  {...register("username", {
                    required: "Username is required",
                    validate: (value) => value.trim() !== "" || "Username cannot be empty",
                  })}
                  placeholder="Enter your username"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg py-3 px-4"
                />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  {...register("email")}
                  disabled
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg py-3 px-4 bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Phone number must contain only digits",
                    },
                  })}
                  placeholder="Your phone number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg py-3 px-4"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>

              {hasChanges() && (
                <button
                  type="submit"
                  className="mt-6 bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition-colors sm:text-lg"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              )}
            </form>
          </div>
        </div>
        <Toaster richColors position="top-center" />
      </ProfileHeader>
  
    </>
  );
};

export default ManageAccount;
