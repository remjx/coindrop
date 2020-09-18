/* eslint-disable react/forbid-prop-types */
import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const CreatePiggybankContext = createContext();

const AppContext = (props) => {
    const { children } = props;
    const [candidatePiggybankPath, setCandidatePiggybankPath] = useState('');
    return (
        <CreatePiggybankContext.Provider value={{ candidatePiggybankPath, setCandidatePiggybankPath }}>
            {children}
        </CreatePiggybankContext.Provider>
    );
};

AppContext.propTypes = {
    children: PropTypes.any.isRequired,
};

export default AppContext;
