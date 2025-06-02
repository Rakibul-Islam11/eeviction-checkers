import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firbase.config';

const PaymentUrlUpdate = () => {
    const [urlData, setUrlData] = useState({ name: '', path: '' });
    const [newUrlData, setNewUrlData] = useState({ name: '', path: '' });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    const docRef = doc(db, 'payment-url', 'Ee6TrFirIh4QHiifrAHq');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const snap = await getDoc(docRef);
                if (snap.exists()) {
                    const data = snap.data();
                    setUrlData(data.url || { name: '', path: '' });
                }
                setLoading(false);
            } catch (err) {
                console.error('Error fetching:', err);
                setMessage('Failed to load data');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const updateDatabase = async (updatedData) => {
        try {
            await updateDoc(docRef, { url: updatedData });
            setMessage('Successfully updated!');
            setTimeout(() => setMessage(''), 3000);
            return true;
        } catch (err) {
            console.error('Update failed:', err);
            setMessage('Update failed!');
            return false;
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
        setMessage('');
    };

    const handleSave = async () => {
        if (!urlData.name.trim() || !urlData.path.trim()) {
            setMessage('Name and URL cannot be empty');
            return;
        }

        const success = await updateDatabase(urlData);
        if (success) {
            setIsEditing(false);
        }
    };

    const handleCancel = async () => {
        // Reload original data
        const snap = await getDoc(docRef);
        if (snap.exists()) {
            setUrlData(snap.data().url || { name: '', path: '' });
        }
        setIsEditing(false);
        setMessage('Changes discarded');
        setTimeout(() => setMessage(''), 3000);
    };

    const handleAddNew = async () => {
        if (!newUrlData.name.trim() || !newUrlData.path.trim()) {
            setMessage('New name and URL cannot be empty');
            return;
        }

        // In this case, since we're replacing the single object,
        // adding new would mean replacing the existing one
        // If you want to store multiple, you'd need to use an array
        const success = await updateDatabase(newUrlData);
        if (success) {
            setUrlData(newUrlData);
            setNewUrlData({ name: '', path: '' });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUrlData(prev => ({ ...prev, [name]: value }));
    };

    const handleNewInputChange = (e) => {
        const { name, value } = e.target;
        setNewUrlData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 border rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6 text-center">Payment URL Management</h2>

            {loading ? (
                <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                    <p className="mt-2">Loading payment URL...</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Current URL Section */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-lg mb-3">Current Payment URL</h3>

                        {isEditing ? (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={urlData.name}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Payment name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                                    <input
                                        type="text"
                                        name="path"
                                        value={urlData.path}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="https://example.com"
                                    />
                                </div>
                                <div className="flex space-x-3 pt-2">
                                    <button
                                        onClick={handleSave}
                                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    >
                                        Save Changes
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <div>
                                    <p className="text-sm text-gray-500">Name</p>
                                    <p className="font-medium">{urlData.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">URL</p>
                                    <a
                                        href={urlData.path}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:text-blue-800 break-words"
                                    >
                                        {urlData.path}
                                    </a>
                                </div>
                                <div className="pt-3">
                                    <button
                                        onClick={handleEdit}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        Edit URL
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Add New URL Section */}
                    {/* <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-lg mb-3">Add New Payment URL</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={newUrlData.name}
                                    onChange={handleNewInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="New payment name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                                <input
                                    type="text"
                                    name="path"
                                    value={newUrlData.path}
                                    onChange={handleNewInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="https://new-example.com"
                                />
                            </div>
                            <div className="pt-2">
                                <button
                                    onClick={handleAddNew}
                                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                >
                                    Add New URL
                                </button>
                            </div>
                        </div>
                    </div> */}

                    {/* Message Display */}
                    {message && (
                        <div className={`p-3 rounded-md ${message.includes('Success') || message.includes('discarded') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {message}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PaymentUrlUpdate;