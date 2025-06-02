import { createContext, useState } from "react";

export const ContextOne = createContext();

const ContextApiOne = ({ children }) => {
    const [recCardNumber, setRecCardNumber] = useState('');
    const [purchaseData, setPurchaseData] = useState(null); // নতুন স্টেট যোগ করুন

    const forRecCardNumber = (reccardNumber) => {
        setRecCardNumber(reccardNumber);
    };

    // প্রোডাক্ট ডাটা সেট করার ফাংশন
    const setProductPurchaseData = (data) => {
        setPurchaseData(data);
    };

    const serveDATA = {
        forRecCardNumber,
        recCardNumber,
        purchaseData, // কনটেক্সটে প্রোডাক্ট ডাটা যোগ করুন
        setProductPurchaseData // ফাংশনটি এক্সপোজ করুন
    };

    return (
        <ContextOne.Provider value={serveDATA}>
            {children}
        </ContextOne.Provider>
    );
};

export default ContextApiOne;