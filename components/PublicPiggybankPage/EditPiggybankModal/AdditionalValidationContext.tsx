import { createContext, FunctionComponent, useState } from 'react';

export const AdditionalValidation = createContext(null);

export const AdditionalValidationProvider: FunctionComponent<{ children: React.ReactNode }> = ({ children }) => {
    const [isPiggybankIdAvailable, setIsPiggybankIdAvailable] = useState(null);
    const [isAddressTouched, setIsAddressTouched] = useState(false);
    return (
        <AdditionalValidation.Provider
            value={{
                isPiggybankIdAvailable,
                setIsPiggybankIdAvailable,
                isAddressTouched,
                setIsAddressTouched,
            }}
        >
            {children}
        </AdditionalValidation.Provider>
    );
};
