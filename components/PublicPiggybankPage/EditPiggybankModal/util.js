"use strict";
exports.__esModule = true;
exports.convertPaymentMethodsFieldArrayToDbMap = exports.sortByIsPreferredThenAlphabetical = void 0;
var paymentMethods_1 = require("../../../src/paymentMethods");
// Preferred should be at the top, sorted alphabetecally within this group
// Non preferred should be below, sorted alphabetically within this group
function sortByIsPreferredThenAlphabetical(arr) {
    return arr
        .sort(function (a, b) {
        var aPaymentMethodId = a.paymentMethodId, aIsPreferred = a.isPreferred;
        var bPaymentMethodId = b.paymentMethodId, bIsPreferred = b.isPreferred;
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
exports.sortByIsPreferredThenAlphabetical = sortByIsPreferredThenAlphabetical;
/* eslint-disable no-param-reassign */
function convertPaymentMethodsFieldArrayToDbMap(paymentMethods) {
    return paymentMethods.reduce(function (result, paymentMethod) {
        if (!paymentMethods_1.paymentMethodIds.includes(paymentMethod.paymentMethodId)) {
            return result;
        }
        console.log('result before', result);
        Object.entries(paymentMethod).forEach(function (_a) {
            var field = _a[0], value = _a[1];
            if (field === 'paymentMethodId') {
                console.log('EXECUTING MYSTERY LOGIC');
                result[value] = {};
            }
        });
        console.log('result after', result);
        Object.entries(paymentMethod).forEach(function (_a) {
            var field = _a[0], value = _a[1];
            if (field !== 'id' && field !== 'paymentMethodId') {
                result[paymentMethod.paymentMethodId][field] = value;
            }
        });
        return result;
    }, {});
}
exports.convertPaymentMethodsFieldArrayToDbMap = convertPaymentMethodsFieldArrayToDbMap;
/* eslint-enable no-param-reassign */
