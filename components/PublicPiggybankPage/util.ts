import { PaymentMethod } from './EditPiggybankModal/PaymentMethodsInput';

export type PaymentMethodDbObjEntry = [string, Partial<PaymentMethod>]

export function sortArrayByEntriesKeyAlphabetical(a: PaymentMethodDbObjEntry, b: PaymentMethodDbObjEntry): -1 | 1 {
    const [aId] = a;
    const [bId] = b;
    return (aId < bId) ? -1 : 1;
}
