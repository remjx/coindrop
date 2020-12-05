// eslint-disable-next-line import/no-extraneous-dependencies
import { expect } from '@jest/globals';
import { convertPaymentMethodsFieldArrayToDbMap } from './util';

describe('convertPaymentMethodsFieldArrayToDbMap', () => {
    test('Payment method exists', () => {
        const address = 'abc';
        const isPreferred = true;
        const paymentMethodId = 'payPal';
        const input = [
            {
                id: 'a',
                paymentMethodId,
                address,
                isPreferred,
            },
        ];
        const output = {
            [paymentMethodId]: {
                address,
                isPreferred,
            },
        };
        expect(convertPaymentMethodsFieldArrayToDbMap(input)).toMatchObject(output);
    });

    test('Payment method does not exist', () => {
        const address = 'abc';
        const paymentMethodId = 'a-fake-payment-method';
        const isPreferred = true;
        const input = [
            {
                id: 'a',
                paymentMethodId,
                address,
                isPreferred,
            },
        ];
        const output = {};
        expect(convertPaymentMethodsFieldArrayToDbMap(input)).toMatchObject(output);
    });
});
