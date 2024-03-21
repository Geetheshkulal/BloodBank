// SubmitContext.js
import React, { createContext, useState, useContext } from 'react';

const SubmitContext = createContext();

export function SubmitProvider({ children }) {
    const [submittedValues, setSubmittedValues] = useState(null);

    return (
        <SubmitContext.Provider value={{ submittedValues, setSubmittedValues }}>
            {children}
        </SubmitContext.Provider>
    );
}

export function useSubmit() {
    return useContext(SubmitContext);
}
