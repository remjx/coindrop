import { paymentMethodIds } from '../../../src/paymentMethods';

// Preferred should be at the top, sorted alphabetecally within this group
// Non preferred should be below, sorted alphabetically within this group
export function sortByIsPreferredThenAlphabetical(arr) {
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

/* eslint-disable no-param-reassign */
export function convertPaymentMethodsFieldArrayToDbMap(paymentMethods) {
    return paymentMethods.reduce((result, paymentMethod) => {
        if (!paymentMethodIds.includes(paymentMethod.paymentMethodId)) {
            return result;
        }
        Object.entries(paymentMethod).forEach(([field, value]) => {
            if (field === 'paymentMethodId') {
                result[value] = {};
            }
        });
        Object.entries(paymentMethod).forEach(([field, value]) => {
            if (field !== 'id' && field !== 'paymentMethodId') {
                result[paymentMethod.paymentMethodId][field] = value;
            }
        });
        return result;
    }, {});
}
/* eslint-enable no-param-reassign */
