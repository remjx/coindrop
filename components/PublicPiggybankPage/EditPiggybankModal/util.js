// Preferred should be at the top, sorted alphabetecally within this group
// Non preferred should be below, sorted alphabetically within this group
export function sortByAlphabeticalThenIsPreferred(arr) {
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
};
