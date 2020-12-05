import { paymentMethodIds } from '../../../src/paymentMethods';
import { PaymentMethod } from './PaymentMethodsInput';
import { PaymentMethodsDbObj } from './EditPiggybankModal';

// Preferred should be at the top, sorted alphabetecally within this group
// Non preferred should be below, sorted alphabetically within this group
export function sortByIsPreferredThenAlphabetical(arr: PaymentMethod[]): PaymentMethod[] {
    return arr
    .sort((a, b) => {
        const { paymentMethodId: aPaymentMethodId, isPreferred: aIsPreferred } = a;
        const { paymentMethodId: bPaymentMethodId, isPreferred: bIsPreferred } = b;
        if (aIsPreferred && !bIsPreferred) {
            return -1;
        }
        if (bIsPreferred && !aIsPreferred) {
            return 1;
        }
        if (aPaymentMethodId < bPaymentMethodId) {
            return -1;
        }
        return 1;
    });
}

export function convertPaymentMethodsFieldArrayToDbMap(paymentMethods: PaymentMethod[]): PaymentMethodsDbObj {
    const paymentMethodsDbObj = {};
    paymentMethods.forEach(paymentMethod => {
        const { paymentMethodId, ...data } = paymentMethod;
        if (paymentMethodIds.includes(paymentMethod.paymentMethodId)) {
            paymentMethodsDbObj[paymentMethodId] = data;
        }
    });
    return paymentMethodsDbObj;
}
