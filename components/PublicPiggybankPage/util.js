export const addressFieldPrefix = "address_";
export const addressIsPreferredSuffix = '_is_preferred';
export function getPaymentMethodIdFromPaymentMethodIsPreferredField(addressFieldName) {
    return addressFieldName
        .substr(0, addressFieldName.length - addressIsPreferredSuffix.length)
        .substr(addressFieldPrefix.length);
}
