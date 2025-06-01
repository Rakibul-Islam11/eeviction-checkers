import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firbase.config';
import Swal from 'sweetalert2';

const PaymentInfo = () => {
    const [numberInfo, setNumberInfo] = useState('');
    const [nameInfo, setNameInfo] = useState('');
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    // Fetch existing data from Firestore
    useEffect(() => {
        const fetchData = async () => {
            try {
                const numberDocRef = doc(db, 'payment-info', 'payment-number');
                const nameDocRef = doc(db, 'payment-info', 'tag-name');

                const numberSnap = await getDoc(numberDocRef);
                const nameSnap = await getDoc(nameDocRef);

                if (numberSnap.exists()) {
                    setNumberInfo(numberSnap.data().numberInfo);
                }

                if (nameSnap.exists()) {
                    setNameInfo(nameSnap.data().nameInfo);
                }

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to load payment information',
                });
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdating(true);

        try {
            const numberDocRef = doc(db, 'payment-info', 'payment-number');
            const nameDocRef = doc(db, 'payment-info', 'tag-name');

            await updateDoc(numberDocRef, { numberInfo });
            await updateDoc(nameDocRef, { nameInfo });

            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Payment information updated successfully',
                timer: 2000,
                showConfirmButton: false,
            });
        } catch (error) {
            console.error('Error updating:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to update payment information',
            });
        } finally {
            setUpdating(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Update Payment Info</h2>

            {loading ? (
                <div className="flex justify-center items-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-semibold mb-1">Payment Number</label>
                        <input
                            type="text"
                            value={numberInfo}
                            onChange={(e) => setNumberInfo(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">Tag Name</label>
                        <input
                            type="text"
                            value={nameInfo}
                            onChange={(e) => setNameInfo(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={updating}
                        className={`w-full flex justify-center items-center py-2 rounded-md transition ${updating ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                            } text-white`}
                    >
                        {updating ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Updating...
                            </>
                        ) : (
                            'Update Info'
                        )}
                    </button>
                </form>
            )}
        </div>
    );
};

export default PaymentInfo;