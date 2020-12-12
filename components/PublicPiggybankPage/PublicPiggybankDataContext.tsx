import { createContext, FunctionComponent, useState } from 'react';
import { PaymentMethodsDbObj } from './EditPiggybankModal/EditPiggybankModal';

export const PublicPiggybankDataContext = createContext(null);

export type PublicPiggybankDataType = {
    name: string
    website: string
    accentColor: string
    verb: string
    owner_uid: string
    paymentMethods: PaymentMethodsDbObj
    avatar_storage_id: string
}

type Props = {
    initialPiggybankDbData: PublicPiggybankDataType
}

const PublicPiggybankDataProvider: FunctionComponent<Props> = ({ initialPiggybankDbData, children }) => {
    const [piggybankDbData, setPiggybankDbData] = useState<PublicPiggybankDataType>(initialPiggybankDbData);
    return (
        <PublicPiggybankDataContext.Provider
            value={{
                piggybankDbData,
                setPiggybankDbData,
            }}
        >
            {children}
        </PublicPiggybankDataContext.Provider>
    );
};

export default PublicPiggybankDataProvider;
