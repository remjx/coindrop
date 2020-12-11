import { createContext, FunctionComponent } from 'react';

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
    mutatePiggybankDbData: any // Trying to get this to work...
        // import { responseInterface } from 'swr';
        // type Mutate = Extract<responseInterface<Data, Error>, "mutate">
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
