import fs from 'fs';
import path from 'path';
import { paymentMethods } from './paymentMethods';

describe('paymentMethod SVG icons', () => {
    test('Each legacy paymentMethod icon has a matching .svg file in public folder.', () => {
        const files = fs.readdirSync(path.join(__dirname, '..', 'public', 'images', 'payment-method-logos'));
        const matches = [];
        const missing = [];
        paymentMethods.forEach((paymentMethod) => {
            if (files.includes(`${paymentMethod.id}.svg`)) {
                matches.push(paymentMethod.id);
            } else {
                missing.push(paymentMethod.id);
            }
        });
        console.log('matches', matches);
        if (missing.length > 0) {
            console.error('missing', missing);
            throw new Error('Missing files.');
        }
        expect(missing.length).toBe(0);
        expect(matches.length).toBe(files.length);
    });
});
