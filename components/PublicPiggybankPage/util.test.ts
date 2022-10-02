import { sortArrayByEntriesKeyAlphabetical, PaymentMethodDbObjEntry } from './util';

describe('sortArrayByEntriesKeyAlphabetical', () => {
    test('basic', () => {
        const input: PaymentMethodDbObjEntry[] = [
            ['decred', {}],
            ['ethereum', {}],
            ['tezos', {}],
            ['dogecoin', {}],
        ];
        const output: PaymentMethodDbObjEntry[] = [
            ['decred', {}],
            ['dogecoin', {}],
            ['ethereum', {}],
            ['tezos', {}],
        ];
        expect(input.sort(sortArrayByEntriesKeyAlphabetical)).toEqual(output);
    });
});
