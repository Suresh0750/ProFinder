"use client"
import { useState, useEffect } from 'react';
import './Identity.module.css'
import { useIsWorkerApprovalMutation } from '@/lib/features/api/adminApiSlice';

const IdentityModal = ({ isOpen, onClose, image, workerId }: { isOpen: boolean, onClose: any, image: string, workerId: string }) => {
    const [imageUrl, setImageUrl] = useState('');
    const [isWorkerApproval] =  useIsWorkerApprovalMutation();
  

    useEffect(() => {
        setImageUrl(image);
    }, [image]);

    const handleApiCall = async (id:string) => {
        try {
            const result =await isWorkerApproval(id).unwrap()
            console.log(result)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay absolute top-0 left-0 flex justify-center items-center w-full h-screen">
            <div className="modal-content w-[25em] h-[25em]">
                <span className="close" onClick={onClose}>&times;</span>
                {imageUrl && <img src={imageUrl} alt="Dynamic" className="w-full h-auto rounded-md" />}
                <div className="mt-4">
                    <button onClick={() => handleApiCall(workerId)} className="px-4 py-2 bg-blue-500 text-white rounded-md">Make API Call</button>
                    <button onClick={onClose} className="ml-4 px-4 py-2 bg-gray-400 text-white rounded-md">Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default IdentityModal;
