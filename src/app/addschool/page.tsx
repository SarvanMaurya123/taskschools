'use client';

import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const AddSchool = () => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        latitude: '',
        longitude: '',
    });

    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // Handle form input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Frontend validation function
    const validateForm = () => {
        const { name, address, latitude, longitude } = formData;

        if (!name.trim()) {
            return 'School name is required';
        }

        if (!address.trim()) {
            return 'Address is required';
        }

        if (!latitude.trim() || isNaN(Number(latitude)) || Number(latitude) < -1000 || Number(latitude) > 1000) {
            return 'Latitude must be a valid number between -1000 and 1000';
        }

        if (!longitude.trim() || isNaN(Number(longitude)) || Number(longitude) < -180 || Number(longitude) > 180) {
            return 'Longitude must be a valid number between -180 and 180';
        }

        return null;
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');


        const validationMessage = validateForm();
        if (validationMessage) {
            setMessage(validationMessage);
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('/api/addschool', {
                name: formData.name,
                address: formData.address,
                latitude: parseFloat(formData.latitude),
                longitude: parseFloat(formData.longitude),
            });

            if (response.status === 201) {
                setMessage('School added successfully!');
                setFormData({
                    name: '',
                    address: '',
                    latitude: '',
                    longitude: '',
                });
            }
        } catch (error: any) {
            setMessage(error.response?.data?.error || 'An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-500 p-4">
            <h1 className="text-2xl font-bold mb-6">Add School</h1>
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6  shadow-md w-full max-w-md"
            >
                <div className="mb-4 ">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        School Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 text-black"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                        Address
                    </label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 text-black"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">
                        Latitude
                    </label>
                    <input
                        type="text"
                        id="latitude"
                        name="latitude"
                        value={formData.latitude}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 text-black"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">
                        Longitude
                    </label>
                    <input
                        type="text"
                        id="longitude"
                        name="longitude"
                        value={formData.longitude}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 text-black"
                        required
                    />
                </div>

                {message && (
                    <div className={`mb-4 text-sm ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
                        {message}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full px-4 py-3 text-white font-medium  ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} transition`}
                >
                    {loading ? 'Adding School...' : 'Add School'}
                </button>
            </form>
            <div className='mt-7'>
                <Link href={`./listschool`} ><button className={`w-[400px] px-4 py-3 text-white font-medium  ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} transition`}>
                    See Student
                </button></Link>
            </div>
        </div>
    );
};

export default AddSchool;
