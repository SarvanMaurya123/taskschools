'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

const ListSchools = () => {
    const [schools, setSchools] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [editSchool, setEditSchool] = useState<any>(null); // Holds school data being edited
    const [showModal, setShowModal] = useState<boolean>(false); // Toggle modal visibility

    // Function to get user geolocation and fetch schools data
    const fetchSchools = async () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                try {
                    const response = await axios.get('/api/listschool', {
                        params: {
                            latitude: latitude.toString(),
                            longitude: longitude.toString(),
                        },
                    });
                    setSchools(response.data.schools);
                } catch (err) {
                    setError('Failed to fetch schools data');
                } finally {
                    setLoading(false);
                }
            }, () => {
                setError('Unable to retrieve your location');
                setLoading(false);
            });
        } else {
            setError('Geolocation is not supported by this browser');
            setLoading(false);
        }
    };

    // Fetch data when the component mounts
    useEffect(() => {
        fetchSchools();
    }, []);

    // Delete school function
    const deleteSchool = async (id: string) => {
        try {
            await axios.delete(`/api/listdelete/${id}`);
            setSchools((prev) => prev.filter((school) => school._id !== id));
        } catch (error) {
            setError('Failed to delete school');
        }
    };

    // Show edit modal and populate it with the current school data
    const openEditModal = (school: any) => {
        setEditSchool(school);
        setShowModal(true);
    };

    // Handle update logic
    const updateSchool = async () => {

        try {
            const { _id, name, address, latitude, longitude } = editSchool;

            await axios.put(`/api/listdelete/${_id}`, {
                name,
                address,
                latitude,
                longitude,
            });

            // Update state with new school details
            setSchools((prev) =>
                prev.map((school) =>
                    school._id === _id ? { ...school, name, address, latitude, longitude } : school
                )
            );

            setShowModal(false); // Close modal
        } catch (error) {

            setError('Failed to update school');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-indigo-600 to-blue-500 p-6">
            <h1 className="text-4xl font-bold text-white mb-6">Schools List</h1>
            {loading ? (
                <div className="text-xl text-white">Loading...</div>
            ) : error ? (
                <div className="text-xl text-red-500">{error}</div>
            ) : (
                <div className="overflow-x-auto w-full bg-white rounded-lg shadow-lg">
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead className="bg-indigo-700 text-white">
                            <tr>
                                <th className="px-6 py-4 text-left">School Name</th>
                                <th className="px-6 py-4 text-left">Address</th>
                                <th className="px-6 py-4 text-left">Latitude</th>
                                <th className="px-6 py-4 text-left">Longitude</th>
                                <th className="px-6 py-4 text-left">Distance (km)</th>
                                <th className="px-6 py-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {schools.map((school, index) => (
                                <tr key={index} className={`odd:bg-gray-50 even:bg-gray-100 hover:bg-gray-200`}>
                                    <td className="px-6 py-4 text-gray-800">{school.name}</td>
                                    <td className="px-6 py-4 text-gray-800">{school.address}</td>
                                    <td className="px-6 py-4 text-gray-800">{school.latitude}</td>
                                    <td className="px-6 py-4 text-gray-800">{school.longitude}</td>
                                    <td className="px-6 py-4 text-gray-800">{school.distance.toFixed(2)}</td>
                                    <td className="px-6 py-4 text-gray-800 flex gap-3">
                                        {/* Update Button */}
                                        <button
                                            onClick={() => openEditModal(school)}
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            Edit
                                        </button>

                                        {/* Delete Button */}
                                        <button
                                            onClick={() => deleteSchool(school._id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal for Editing School */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-2xl font-bold mb-4 text-black">Edit School</h2>
                        <input
                            className="w-full mb-3 p-2 border border-gray-300 rounded text-black"
                            type="text"
                            placeholder="Name"
                            value={editSchool.name}
                            onChange={(e) =>
                                setEditSchool({ ...editSchool, name: e.target.value })
                            }
                        />
                        <input
                            className="w-full mb-3 p-2 border border-gray-300 rounded text-black"
                            type="text"
                            placeholder="Address"
                            value={editSchool.address}
                            onChange={(e) =>
                                setEditSchool({ ...editSchool, address: e.target.value })
                            }
                        />
                        <input
                            className="w-full mb-3 p-2 border border-gray-300 rounded text-black"
                            type="text"
                            placeholder="Latitude"
                            value={editSchool.latitude}
                            onChange={(e) =>
                                setEditSchool({ ...editSchool, latitude: e.target.value })
                            }
                        />
                        <input
                            className="w-full mb-3 p-2 border border-gray-300 rounded text-black"
                            type="text"
                            placeholder="Longitude"
                            value={editSchool.longitude}
                            onChange={(e) =>
                                setEditSchool({ ...editSchool, longitude: e.target.value })
                            }
                        />
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-red-500 hover:text-red-700"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={updateSchool}
                                className="text-green-500 hover:text-green-700"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListSchools;
