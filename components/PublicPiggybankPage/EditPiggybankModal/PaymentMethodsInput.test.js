import { sortByAlphabeticalThenIsPreferred } from './util';

describe('sortByAlphabeticalThenIsPreferred', () => {
    test('sorts correctly', () => {
        const inputArr = [
            {
                value: "c",
                isPreferred: false,
            },
            {
                value: "b",
                isPreferred: false,
            },
            {
                value: "a",
                isPreferred: false,
            },
            {
                value: "d",
                isPreferred: true,
            },
            {
                value: "e",
                isPreferred: true,
            },
        ];
        const outputArr = [
            {
                value: "d",
                isPreferred: true,
            },
            {
                value: "e",
                isPreferred: true,
            },
            {
                value: "a",
                isPreferred: false,
            },
            {
                value: "b",
                isPreferred: false,
            },
            {
                value: "c",
                isPreferred: false,
            },
        ];
        const result = sortByAlphabeticalThenIsPreferred(inputArr);
        expect(result).toMatchObject(outputArr);
    });

    test('sorts correctly (d+e swapped)', () => {
        const inputArr = [
            {
                value: "c",
                isPreferred: false,
            },
            {
                value: "b",
                isPreferred: false,
            },
            {
                value: "a",
                isPreferred: false,
            },
            {
                value: "e",
                isPreferred: true,
            },
            {
                value: "d",
                isPreferred: true,
            },
        ];
        const outputArr = [
            {
                value: "d",
                isPreferred: true,
            },
            {
                value: "e",
                isPreferred: true,
            },
            {
                value: "a",
                isPreferred: false,
            },
            {
                value: "b",
                isPreferred: false,
            },
            {
                value: "c",
                isPreferred: false,
            },
        ];
        const result = sortByAlphabeticalThenIsPreferred(inputArr);
        expect(result).toMatchObject(outputArr);
    });

    test('sorts correctly 3', () => {
        const inputArr = [
            {
               "id":"a464c044-2865-4eea-b66f-e6eabe711dbf",
               "value":"venmo",
               "isPreferred":true,
               "address":"markjackson02@gmail.com"
            },
            {
               "id":"bc7b9edb-ded3-4532-bfe9-aa63c42e8f0e",
               "value":"monero",
               "isPreferred":true,
               "address":"888tNkZrPN6JsEgekjMnABU4TBzc2Dt29EPAvkRxbANsAnjyPbb3iQ1YBRk1UXcdRsiKc9"
            },
            {
               "id":"214b592e-8347-4d1d-a3f1-362db1cb875a",
               "value":"googlePay",
               "address":"test",
               "isPreferred":false
            },
            {
               "id":"f92db3db-774c-47fd-9ff7-179f310996d6",
               "value":"bitcoinBSV",
               "address":"hi",
               "isPreferred":false
            },
            {
               "id":"a89cd958-440b-4c2f-99a7-fea800ec4b57",
               "value":"payPal",
               "address":"mark@test.com",
               "isPreferred":false
            },
        ];
        const outputArr = [
            {
               "id":"bc7b9edb-ded3-4532-bfe9-aa63c42e8f0e",
               "value":"monero",
               "isPreferred":true,
               "address":"888tNkZrPN6JsEgekjMnABU4TBzc2Dt29EPAvkRxbANsAnjyPbb3iQ1YBRk1UXcdRsiKc9"
            },
            {
               "id":"a464c044-2865-4eea-b66f-e6eabe711dbf",
               "value":"venmo",
               "isPreferred":true,
               "address":"markjackson02@gmail.com"
            },
            {
               "id":"f92db3db-774c-47fd-9ff7-179f310996d6",
               "value":"bitcoinBSV",
               "address":"hi",
               "isPreferred":false
            },
            {
               "id":"214b592e-8347-4d1d-a3f1-362db1cb875a",
               "value":"googlePay",
               "address":"test",
               "isPreferred":false
            },
            {
               "id":"a89cd958-440b-4c2f-99a7-fea800ec4b57",
               "value":"payPal",
               "address":"mark@test.com",
               "isPreferred":false
            },
        ];
        const result = sortByAlphabeticalThenIsPreferred(inputArr);
        console.log('RESULT', result);
        expect(result).toMatchObject(outputArr);
    });
});
