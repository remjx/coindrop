import { piggybankPathRegex } from './settings';

describe('Allowed Coindrop names', () => {
    it('accepts valid names', () => {
        expect('allows-dashes'.match(piggybankPathRegex)).toBeTruthy();
        expect('allows_underscores'.match(piggybankPathRegex)).toBeTruthy();
        expect('abc'.match(piggybankPathRegex)).toBeTruthy(); // at least 3 chars
        expect('ends-in-number-0'.match(piggybankPathRegex)).toBeTruthy(); // at least 3 chars
        expect('UPPERCASE'.match(piggybankPathRegex)).toBeTruthy(); // at least 3 chars
    });
    it('rejects invalid names', () => {
        expect(''.match(piggybankPathRegex)).toBeFalsy();
        expect('0-starts-with-number'.match(piggybankPathRegex)).toBeFalsy();
        expect('special-!@#-chars'.match(piggybankPathRegex)).toBeFalsy();
        expect('ab'.match(piggybankPathRegex)).toBeFalsy(); // must be at least 3 chars
        expect('is-too-long-of-a-name-to-be-valid'.match(piggybankPathRegex)).toBeFalsy(); // must be at least 3 chars
    });
});
