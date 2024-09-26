import { useGetCategoryNameQuery, useGetNearByworkerListMutation } from '@/lib/features/api/customerApiSlice';
import React, { useState, useEffect } from 'react';
import GoogleMaps from './googleMap/googleMaps';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}




const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {


  const [category, setCategory] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isOpenMap, setIsOpenMap] = useState<boolean>(false);
  const [coords,setCoords] = useState({})
   

  // * API call to get categories
  const { data } = useGetCategoryNameQuery('');
  const [getNearByworkerList, { isLoading }] = useGetNearByworkerListMutation();


  // * Set the default category when the data is loaded
  useEffect(() => {
    if (data?.result?.length) {
      setCategory(data.result[0]); 
    }
  }, [data]);


  // * get user location
const userLocation = async()=>{
  try{

  const result =await navigator.geolocation.getCurrentPosition(
          (position)=>{
              console.log(position)
              const {latitude,longitude } :{latitude:any,longitude:any}= position.coords;
              setCoords({latitude,longitude})
  },(error)=>console.log(error.message))
  
  }catch(error){
    console.log('eror',error)
  }

}


  // * Form submission handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    // * Validation
    if (!category) newErrors.category = "Category is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // Handle form submission and API call
      await userLocation()
      await handleCategorySelection(category);

      onClose(); // Optionally close the modal after submission
    } catch (error) {
      console.error('Error fetching workers:', error);
    }
  };

  // Function to handle API call with the selected category
  const handleCategorySelection = async (selectedCategory: string) => {
    console.log("Selected category:", selectedCategory);
    const result = await getNearByworkerList(selectedCategory);
    
    // Handle the API response (you may want to check the API result here before showing the map)
    if (result?.data?.success) {
     
      console.log('Nearby workers:', result.data.nearbyWorkers);
      setIsOpenMap(true);
    } else {
      console.error('No workers found or API call failed');
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center z-[2] justify-center bg-black bg-opacity-50 ${
        isOpen ? '' : 'hidden'
      }`}
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Select Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`mt-1 block w-full border ${
                errors.category ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm p-2`}
            >
              <option value="" disabled>
                Select a category
              </option>
              {data?.result?.map((cat: string) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-xs">{errors.category}</p>
            )}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 bg-gray-300 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      {isOpenMap  &&  <GoogleMaps coords ={coords} />}
    </div>
  );
};

export default Modal;
