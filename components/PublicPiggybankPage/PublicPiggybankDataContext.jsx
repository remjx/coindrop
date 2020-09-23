import { createContext } from 'react';
import PropTypes from 'prop-types';

export const PublicPiggybankData = createContext();

const PublicPiggybankDataProvider = ({ data, children }) => (
    <PublicPiggybankData.Provider value={data}>
        {children}
    </PublicPiggybankData.Provider>
);

PublicPiggybankDataProvider.propTypes = {
    data: PropTypes.shape({}).isRequired,
    children: PropTypes.element.isRequired,
};

export default PublicPiggybankDataProvider;
