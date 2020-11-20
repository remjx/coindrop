import { createContext, FunctionComponent, useState } from 'react';

export const AvatarContext = createContext(undefined);

export const AvatarContextProvider: FunctionComponent = ({ children }) => {
    const [imageUploadedDateTime, setImageUploadedDateTime] = useState(Date.now());
    return (
        <AvatarContext.Provider value={{ imageUploadedDateTime, setImageUploadedDateTime }}>
            {children}
        </AvatarContext.Provider>
    );
};
