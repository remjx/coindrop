import { getFileExtensionFromMimeType } from './AvatarInput';

describe('getFileExtensionFromMimeType', () => {
    test('allowed mime types', () => {
        expect(getFileExtensionFromMimeType('image/jpeg')).toBe('jpeg');
        expect(getFileExtensionFromMimeType('image/png')).toBe('png');
        expect(getFileExtensionFromMimeType('image/webp')).toBe('webp');
    });
});
