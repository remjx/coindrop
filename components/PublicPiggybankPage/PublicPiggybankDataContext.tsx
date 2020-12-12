import { createContext, FunctionComponent } from 'react';

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

type PublicPiggybankDataContext = {
    piggybankDbData: PublicPiggybankDataType
}

type Props = {
    data: PublicPiggybankDataContext
}

const PublicPiggybankDataProvider: FunctionComponent<Props> = ({ data, children }) => (
    <PublicPiggybankDataContext.Provider value={data}>
        {children}
    </PublicPiggybankDataContext.Provider>
);

export default PublicPiggybankDataProvider;
