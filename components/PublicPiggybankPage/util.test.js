import {
    addressFieldPrefix,
    addressIsPreferredSuffix,
    getPaymentMethodIdFromPaymentMethodIsPreferredField,
} from './util';

describe('getPaymentMethodIdFromPaymentMethodIsPreferredField', () => {
    test('address value is returned', () => {
        const value1 = 'monero';
        const result1 = getPaymentMethodIdFromPaymentMethodIsPreferredField(`${addressFieldPrefix}${value1}${addressIsPreferredSuffix}`);
        expect(result1).toBe(value1);
        const value2 = 'venmo';
        const result2 = getPaymentMethodIdFromPaymentMethodIsPreferredField(`${addressFieldPrefix}${value2}${addressIsPreferredSuffix}`);
        expect(result2).toBe(value2);
    });
});
