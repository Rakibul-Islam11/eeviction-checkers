import { createContext, useState } from "react";


export const ContextOne = createContext();

const ContextApiOne = ({ children }) => {
    const [recCardNumber, setRecCardNumber] = useState('')
    

    // This function should update the state
    const forRecCardNumber = (reccardNumber) => {
        setRecCardNumber(reccardNumber);
    };

    const serveDATA = {
        forRecCardNumber,
        recCardNumber
    };

    return (
        <ContextOne.Provider value={serveDATA}>
            {children}
        </ContextOne.Provider>
    );
};

export default ContextApiOne;