import { FC } from 'react';
import QRCode from 'qrcode.react';

export const QRCodeExample: FC = () => (
    <QRCode
        value="https://coindrop.to/satoshi-nakamoto"
        size={150}
        imageSettings={{
            src: '/logo/piggy-64.png',
            x: null,
            y: null,
            height: 64,
            width: 64,
            excavate: true,
        }}
    />
);
