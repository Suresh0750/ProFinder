// components/ServiceRequestModal.tsx

'use client'; // This directive is necessary for client-side rendering

import React, { useState } from 'react';

const ServiceRequestModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        service: '',
        worker: '',
        preferredDate: '',
        preferredTime: '',
        serviceLocation: '',
        additionalNotes: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            alert(JSON.stringify(formData))
            // const response = await fetch('/api/service-request', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(formData),
            // });

            // if (!response.ok) {
            //     throw new Error('Failed to submit the form');
            // }

            // Handle successful submission if needed
            console.log('Form submitted successfully');
            onClose();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Service Request</h2>
                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <label className="block mb-2">
                        Service:
                        <input
                            type="text"
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            required
                            className="w-full border rounded p-2"
                        />
                    </label>
                    <label className="block mb-2">
                        Worker:
                        <input
                            type="text"
                            name="worker"
                            value={formData.worker}
                            onChange={handleChange}
                            required
                            className="w-full border rounded p-2"
                        />
                    </label>
                    <label className="block mb-2">
                        Preferred Date:
                        <input
                            type="date"
                            name="preferredDate"
                            value={formData.preferredDate}
                            onChange={handleChange}
                            required
                            className="w-full border rounded p-2"
                        />
                    </label>
                    <label className="block mb-2">
                        Preferred Time:
                        <input
                            type="time"
                            name="preferredTime"
                            value={formData.preferredTime}
                            onChange={handleChange}
                            required
                            className="w-full border rounded p-2"
                        />
                    </label>
                    <label className="block mb-2">
                        Service Location:
                        <input
                            type="text"
                            name="serviceLocation"
                            value={formData.serviceLocation}
                            onChange={handleChange}
                            required
                            className="w-full border rounded p-2"
                        />
                    </label>
                    <label className="block mb-2">
                        Additional Notes:
                        <textarea
                            name="additionalNotes"
                            value={formData.additionalNotes}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                        />
                    </label>
                    <button type="submit" disabled={loading} className={`mt-4 w-full p-2 text-white ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} rounded`}>
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
                <button onClick={onClose} className="mt-4 text-blue-500">Close</button>
            </div>
        </div>
    );
};

export default ServiceRequestModal;