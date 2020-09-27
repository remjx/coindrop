import { sortArrayByEntriesKeyAlphabetical } from './util';

describe('sortArrayByEntriesKeyAlphabetical', () => {
    test('basic', () => {
        const input = [
            ['decred'],
            ['ethereum'],
            ['tezos'],
            ['dogecoin'],
        ];
        const output = [
            ['decred'],
            ['dogecoin'],
            ['ethereum'],
            ['tezos'],
        ];
        expect(input.sort(sortArrayByEntriesKeyAlphabetical)).toMatchObject(output);
    });
});
