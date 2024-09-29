"use client";
import { useState } from "react";
import Image from "next/image"; // Assuming you're using Next.js
// import axios from 'axios'; // For API calls
import AddImageModal from "./AddModal";

// Define types for props and state
interface ImageData {
  src: string;
  alt: string;
  id: number;
}

interface ImageGridProps {
  images: string;
}

const ImageGrid: React.FC<ImageGridProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null); // Stores selected image info
  const [modalData, setModalData] = useState<ImageData | null>(null); // Stores data fetched for modal
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Function to handle the button click (assume imageId is of type number)
  const handleButtonClick = async (imageId: number) => {
    try {
      // Example API call to fetch dynamic data
      // const response = await axios.get(`/api/images/${imageId}`);
      // setModalData(response.data);
      setIsModalOpen(true); // Open modal
    } catch (error) {
      console.error("Error fetching image data:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData(null); // Reset modal data when closed
  };

  // Transform the single image to match the expected array format
  const imageList: ImageData[] = [
    {
      src: images,
      alt: "Sample Alt Text",
      id: 1,
    },
  ];

  return (
    <>
      <div className="w-[80%] flex justify-end">
        <button
          className="p-2 mr-9 bg-green-600 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          Add Image
        </button>
      </div>

      <div className="mt-[75px] w-[70%] mr-[5%] ml-[5%] min-h-96 max-h-[600px] overflow-y-auto bg-[#D9D9D9] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Loop through images */}
        {imageList.map((image) => (
          <div key={image.id} className="relative w-[500px] h-[500px] group">
            {/* Image */}
            <Image
              src={image.src}
              alt={image.alt}
              width={500}
              height={500}
              className="object-cover"
            />

            {/* Button that appears on hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md transition-transform duration-300 hover:bg-blue-700"
                onClick={() => handleButtonClick(image.id)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg relative w-[80%] max-w-[800px]">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                onClick={closeModal}
              >
                Close
              </button>
              {/* Modal content placeholder */}
            </div>
          </div>
        )}
        <AddImageModal isOpen={isModalOpen} onClose={() =>setIsModalOpen(false)} />
      </div>
    </>
  );
};

export default ImageGrid;
