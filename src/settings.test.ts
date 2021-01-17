import { piggybankPathRegex } from './settings';

describe('Coindrop name regex', () => {
    it('must be at least 3 characters', () => {
        expect('ab'.match(piggybankPathRegex)).toBeFalsy();
        expect('abc'.match(piggybankPathRegex)).toBeTruthy();
    });
    it('allows dashes and underscores in the middle', () => {
        expect('allows-dashes'.match(piggybankPathRegex)).toBeTruthy();
        expect('allows_underscores'.match(piggybankPathRegex)).toBeTruthy();
        expect('_starts_with_underscore'.match(piggybankPathRegex)).toBeFalsy();
        expect('-starts-with-dash'.match(piggybankPathRegex)).toBeFalsy();
        expect('ends_with_underscore_'.match(piggybankPathRegex)).toBeFalsy();
        expect('ends-with-dash-'.match(piggybankPathRegex)).toBeFalsy();
    });
    it('cannot start with a number', () => {
        expect('0-starts-with-number'.match(piggybankPathRegex)).toBeFalsy();
        expect('ends-in-number-0'.match(piggybankPathRegex)).toBeTruthy();
        expect('number-0-in-middle'.match(piggybankPathRegex)).toBeTruthy();
    });
    it('accepts uppercase and lowercase (uppercase will be converted to lowercase)', () => {
        expect('UPPERCASE'.match(piggybankPathRegex)).toBeTruthy();
        expect('lowercase'.match(piggybankPathRegex)).toBeTruthy();
    });
    it('cannot be empty', () => {
        expect(''.match(piggybankPathRegex)).toBeFalsy();
    });
    it('does not allow spaces', () => {
        expect('with space'.match(piggybankPathRegex)).toBeFalsy();
    });
    it('does not allow special characters', () => {
        expect('special-!@#-chars'.match(piggybankPathRegex)).toBeFalsy();
    });
    it('must be 32 characters or less', () => {
        expect('this-is-exactly-32-characters-ok'.match(piggybankPathRegex)).toBeTruthy();
        expect('is-too-long-of-a-name-to-be-valid'.match(piggybankPathRegex)).toBeFalsy();
    });
});
