import { sortByIsPreferredThenAlphabetical } from './util';

describe('sortByIsPreferredThenAlphabetical', () => {
    test('sorts correctly', () => {
        const inputArr = [
            {
                paymentMethodId: "c",
                isPreferred: false,
            },
            {
                paymentMethodId: "b",
                isPreferred: false,
            },
            {
                paymentMethodId: "a",
                isPreferred: false,
            },
            {
                paymentMethodId: "d",
                isPreferred: true,
            },
            {
                paymentMethodId: "e",
                isPreferred: true,
            },
        ];
        const outputArr = [
            {
                paymentMethodId: "d",
                isPreferred: true,
            },
            {
                paymentMethodId: "e",
                isPreferred: true,
            },
            {
                paymentMethodId: "a",
                isPreferred: false,
            },
            {
                paymentMethodId: "b",
                isPreferred: false,
            },
            {
                paymentMethodId: "c",
                isPreferred: false,
            },
        ];
        const result = sortByIsPreferredThenAlphabetical(inputArr);
        expect(result).toMatchObject(outputArr);
    });

    test('sorts correctly (d+e swapped)', () => {
        const inputArr = [
            {
                paymentMethodId: "c",
                isPreferred: false,
            },
            {
                paymentMethodId: "b",
                isPreferred: false,
            },
            {
                paymentMethodId: "a",
                isPreferred: false,
            },
            {
                paymentMethodId: "e",
                isPreferred: true,
            },
            {
                paymentMethodId: "d",
                isPreferred: true,
            },
        ];
        const outputArr = [
            {
                paymentMethodId: "d",
                isPreferred: true,
            },
            {
                paymentMethodId: "e",
                isPreferred: true,
            },
            {
                paymentMethodId: "a",
                isPreferred: false,
            },
            {
                paymentMethodId: "b",
                isPreferred: false,
            },
            {
                paymentMethodId: "c",
                isPreferred: false,
            },
        ];
        const result = sortByIsPreferredThenAlphabetical(inputArr);
        expect(result).toMatchObject(outputArr);
    });

    test('sorts correctly 3', () => {
        const inputArr = [
            {
               id: "a464c044-2865-4eea-b66f-e6eabe711dbf",
               paymentMethodId: "venmo",
               isPreferred: true,
               address: "markjackson02@gmail.com",
            },
            {
               id: "bc7b9edb-ded3-4532-bfe9-aa63c42e8f0e",
               paymentMethodId: "monero",
               isPreferred: true,
               address: "888tNkZrPN6JsEgekjMnABU4TBzc2Dt29EPAvkRxbANsAnjyPbb3iQ1YBRk1UXcdRsiKc9",
            },
            {
               id: "214b592e-8347-4d1d-a3f1-362db1cb875a",
               paymentMethodId: "googlePay",
               address: "test",
               isPreferred: false,
            },
            {
               id: "f92db3db-774c-47fd-9ff7-179f310996d6",
               paymentMethodId: "bitcoinBSV",
               address: "hi",
               isPreferred: false,
            },
            {
               id: "a89cd958-440b-4c2f-99a7-fea800ec4b57",
               paymentMethodId: "payPal",
               address: "mark@test.com",
               isPreferred: false,
            },
        ];
        const outputArr = [
            {
               id: "bc7b9edb-ded3-4532-bfe9-aa63c42e8f0e",
               paymentMethodId: "monero",
               isPreferred: true,
               address: "888tNkZrPN6JsEgekjMnABU4TBzc2Dt29EPAvkRxbANsAnjyPbb3iQ1YBRk1UXcdRsiKc9",
            },
            {
               id: "a464c044-2865-4eea-b66f-e6eabe711dbf",
               paymentMethodId: "venmo",
               isPreferred: true,
               address: "markjackson02@gmail.com",
            },
            {
               id: "f92db3db-774c-47fd-9ff7-179f310996d6",
               paymentMethodId: "bitcoinBSV",
               address: "hi",
               isPreferred: false,
            },
            {
               id: "214b592e-8347-4d1d-a3f1-362db1cb875a",
               paymentMethodId: "googlePay",
               address: "test",
               isPreferred: false,
            },
            {
               id: "a89cd958-440b-4c2f-99a7-fea800ec4b57",
               paymentMethodId: "payPal",
               address: "mark@test.com",
               isPreferred: false,
            },
        ];
        const result = sortByIsPreferredThenAlphabetical(inputArr);
        expect(result).toMatchObject(outputArr);
    });
});
