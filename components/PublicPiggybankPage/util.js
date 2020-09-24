export const addressFieldPrefix = "address_";
export const addressIsPreferredSuffix = 'is_preferred';
export function getPaymentMethodIdFromPaymentMethodIsPreferredField(addressFieldName) {
    return addressFieldName
        .substr(0, addressFieldName.length - addressIsPreferredSuffix.length - 1)
        .substr(addressFieldPrefix.length);
}
