import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const CreatePiggybankContext = createContext();

const AppContext = ({ children }) => {
    const [pendingLoginCreatePiggybankPath, setPendingLoginCreatePiggybankPath] = useState('');
    return (
        <CreatePiggybankContext.Provider value={{ pendingLoginCreatePiggybankPath, setPendingLoginCreatePiggybankPath }}>
            {children}
        </CreatePiggybankContext.Provider>
    );
};

AppContext.propTypes = {
    children: PropTypes.element.isRequired,
};

export default AppContext;
