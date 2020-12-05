import { createContext, FunctionComponent, Dispatch, SetStateAction } from 'react';
import { PaymentMethodsDbObj } from './EditPiggybankModal/EditPiggybankModal';

export const PublicPiggybankData = createContext(null);

export type PublicPiggybankData = {
    name: string
    website: string
    accentColor: string
    verb: string
    owner_uid: string
    paymentMethods: PaymentMethodsDbObj
    avatar_storage_id: string
}

type PublicPiggybankDataContext = {
    piggybankDbData: PublicPiggybankData
    setPiggybankDbData: Dispatch<SetStateAction<PublicPiggybankData>>
    refreshPiggybankDbData: (piggybankId: string) => Promise<void>
}

type Props = {
    data: PublicPiggybankDataContext
}

const PublicPiggybankDataProvider: FunctionComponent<Props> = ({ data, children }) => (
    <PublicPiggybankData.Provider value={data}>
        {children}
    </PublicPiggybankData.Provider>
);

export default PublicPiggybankDataProvider;
