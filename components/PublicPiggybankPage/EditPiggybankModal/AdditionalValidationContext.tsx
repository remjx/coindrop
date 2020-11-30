import { createContext, FunctionComponent, useState } from 'react';

export const AdditionalValidation = createContext(null);

export const AdditionalValidationProvider: FunctionComponent = ({ children }) => {
    const [isPiggybankIdAvailable, setIsPiggybankIdAvailable] = useState(null);
    return (
        <AdditionalValidation.Provider
            value={{
                isPiggybankIdAvailable,
                setIsPiggybankIdAvailable,
            }}
        >
            {children}
        </AdditionalValidation.Provider>
    );
};
