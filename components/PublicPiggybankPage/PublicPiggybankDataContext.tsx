import { createContext, FunctionComponent, useState, Dispatch, SetStateAction } from 'react';
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

type PublicPiggybankDataContextValue = {
    piggybankDbData: PublicPiggybankDataType
    setPiggybankDbData: Dispatch<SetStateAction<PublicPiggybankDataType>>
}

export const PublicPiggybankDataProvider: FunctionComponent<Props> = ({ initialPiggybankDbData, children }) => {
    const [piggybankDbData, setPiggybankDbData] = useState<PublicPiggybankDataType>(initialPiggybankDbData);
    const value: PublicPiggybankDataContextValue = {
        piggybankDbData,
        setPiggybankDbData,
    };
    return (
        <PublicPiggybankDataContext.Provider
            value={value}
        >
            {children}
        </PublicPiggybankDataContext.Provider>
    );
};
