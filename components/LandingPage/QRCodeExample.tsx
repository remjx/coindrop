import { FC } from 'react';
import QRCode from 'qrcode.react';
import piggy64Png from '../../public/logo/piggy-64.png';

export const QRCodeExample: FC = () => (
    <QRCode
        value="https://coindrop.to/satoshi-nakamoto"
        size={150}
        imageSettings={{
            src: piggy64Png,
            x: null,
            y: null,
            height: 64,
            width: 64,
            excavate: true,
        }}
    />
);
