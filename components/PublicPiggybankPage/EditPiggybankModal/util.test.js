import { convertPaymentMethodsFieldArrayToDbMap } from './util';

describe('convertPaymentMethodsFieldArrayToDbMap', () => {
    test('Payment method exists', () => {
        const address = 'abc';
        const paymentMethodId = 'payPal';
        const input = [
            {
                id: 'a',
                paymentMethodId,
                address,
            },
        ];
        const output = {
            [paymentMethodId]: {
                address,
            },
        };
        expect(convertPaymentMethodsFieldArrayToDbMap(input)).toMatchObject(output);
    });

    test('Payment method does not exist', () => {
        const address = 'abc';
        const paymentMethodId = 'a-fake-payment-method';
        const input = [
            {
                id: 'a',
                paymentMethodId,
                address,
            },
        ];
        const output = {};
        expect(convertPaymentMethodsFieldArrayToDbMap(input)).toMatchObject(output);
    });
});
