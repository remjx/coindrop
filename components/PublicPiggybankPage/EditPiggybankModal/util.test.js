"use strict";
exports.__esModule = true;
var util_1 = require("./util");
describe('convertPaymentMethodsFieldArrayToDbMap', function () {
    test('Payment method exists', function () {
        var _a;
        var address = 'abc';
        var isPreferred = true;
        var paymentMethodId = 'payPal';
        var input = [
            {
                id: 'a',
                paymentMethodId: paymentMethodId,
                address: address,
                isPreferred: isPreferred
            },
        ];
        var output = (_a = {},
            _a[paymentMethodId] = {
                address: address,
                isPreferred: isPreferred
            },
            _a);
        expect(util_1.convertPaymentMethodsFieldArrayToDbMap(input)).toMatchObject(output);
    });
    test('Payment method does not exist', function () {
        var address = 'abc';
        var paymentMethodId = 'a-fake-payment-method';
        var isPreferred = true;
        var input = [
            {
                id: 'a',
                paymentMethodId: paymentMethodId,
                address: address,
                isPreferred: isPreferred
            },
        ];
        var output = {};
        expect(util_1.convertPaymentMethodsFieldArrayToDbMap(input)).toMatchObject(output);
    });
});
