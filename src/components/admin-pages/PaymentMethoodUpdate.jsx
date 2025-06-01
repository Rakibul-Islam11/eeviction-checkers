import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firbase.config';
import Swal from 'sweetalert2';

const PaymentMethoodUpdate = () => {
    const [methods, setMethods] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [editValue, setEditValue] = useState('');
    const [newMethod, setNewMethod] = useState('');
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [adding, setAdding] = useState(false);
    const [editing, setEditing] = useState(false);

    const docRef = doc(db, 'mobile-banking', 'ahJvZ2I0MYKwwH9rl0fU');

    // Load methods from Firestore
    useEffect(() => {
        const fetchMethods = async () => {
            try {
                const snap = await getDoc(docRef);
                if (snap.exists()) {
                    const data = snap.data();
                    setMethods(data.method || []);
                }
            } catch (error) {
                console.error('Error fetching methods:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to load data!',
                });
            } finally {
                setLoading(false);
            }
        };

        fetchMethods();
    }, []);

    // Update Firestore
    const updateMethodArray = async (updatedArray) => {
        setUpdating(true);
        try {
            await updateDoc(docRef, { method: updatedArray });
            setMethods(updatedArray);
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Updated successfully!',
                timer: 2000,
                showConfirmButton: false,
            });
        } catch (error) {
            console.error('Update failed:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Update failed!',
            });
        } finally {
            setUpdating(false);
        }
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        setEditValue(methods[index]);
    };

    const handleUpdate = async () => {
        const trimmed = editValue.trim();
        if (!trimmed) return;

        setEditing(true);
        try {
            const updated = [...methods];
            updated[editIndex] = trimmed;
            await updateMethodArray(updated);
            setEditIndex(null);
            setEditValue('');
        } finally {
            setEditing(false);
        }
    };

    const handleDelete = async (index) => {
        const confirmResult = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (confirmResult.isConfirmed) {
            const updated = methods.filter((_, i) => i !== index);
            await updateMethodArray(updated);
        }
    };

    const handleAdd = async () => {
        const trimmed = newMethod.trim();
        if (!trimmed) return;

        if (methods.includes(trimmed)) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'This method already exists!',
            });
            return;
        }

        setAdding(true);
        try {
            const updated = [...methods, trimmed];
            await updateMethodArray(updated);
            setNewMethod('');
            Swal.fire({
                icon: 'success',
                title: 'Added!',
                text: 'New method added successfully!',
                timer: 2000,
                showConfirmButton: false,
            });
        } finally {
            setAdding(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-6 lg:mt-10 border rounded-lg shadow">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">Update Mobile Banking Methods</h2>

            {loading ? (
                <div className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                </div>
            ) : (
                <div className="space-y-4">
                    {methods.map((method, index) => (
                        <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-2 p-3 bg-gray-50 rounded-lg">
                            {editIndex === index ? (
                                <div className="w-full flex flex-col sm:flex-row gap-2">
                                    <input
                                        type="text"
                                        value={editValue}
                                        onChange={(e) => setEditValue(e.target.value)}
                                        className="border px-3 py-2 rounded w-full"
                                    />
                                    <div className="flex gap-2">
                                        <button
                                            onClick={handleUpdate}
                                            disabled={editing}
                                            className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 flex items-center justify-center min-w-[80px] flex-1"
                                        >
                                            {editing ? (
                                                <>
                                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Saving
                                                </>
                                            ) : 'Save'}
                                        </button>
                                        <button
                                            onClick={() => {
                                                setEditIndex(null);
                                                setEditValue('');
                                            }}
                                            className="bg-gray-400 text-white px-3 py-2 rounded hover:bg-gray-500 flex-1"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <span className="flex-grow text-sm sm:text-base break-all">{method}</span>
                                    <div className="flex gap-2 w-full sm:w-auto">
                                        <button
                                            onClick={() => handleEdit(index)}
                                            className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 flex-1 sm:flex-none sm:w-20"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(index)}
                                            className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 flex-1 sm:flex-none sm:w-20"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}

                    <div className="flex flex-col sm:flex-row items-center gap-2 mt-6 p-3 bg-gray-50 rounded-lg">
                        <input
                            type="text"
                            placeholder="Add new method"
                            value={newMethod}
                            onChange={(e) => setNewMethod(e.target.value)}
                            className="border px-3 py-2 rounded w-full"
                        />
                        <button
                            onClick={handleAdd}
                            disabled={adding}
                            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 w-full sm:w-32 flex items-center justify-center"
                        >
                            {adding ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Adding
                                </>
                            ) : 'Add'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaymentMethoodUpdate;