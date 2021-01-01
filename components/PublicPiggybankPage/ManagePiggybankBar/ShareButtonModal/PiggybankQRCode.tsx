import { FunctionComponent } from 'react';
import QRCode from 'qrcode.react';
import { Heading, Button, Center } from '@chakra-ui/react';
import { PrintIcon } from '../../../Icons/CustomIcons';
import piggy64Png from '../../../../public/logo/piggy-64.png';

type Props = {
    publicUrl: string
    fullPublicUrl: string
}

const PiggybankQRCode: FunctionComponent<Props> = ({ publicUrl, fullPublicUrl }) => {
    const onPrint = () => {
        const canvas = document.getElementById('coindrop-qr-code') as HTMLCanvasElement;
        const imgCanvas = canvas.toDataURL();
        const myWindow = window.open();
        myWindow.document.write(`<div><div>${publicUrl}</div><br /><img src="${imgCanvas}" /></div>`);
        myWindow.focus();
        myWindow.print();
    };
    return (
        <>
            <Heading
                as="h2"
                size="lg"
                mt={4}
            >
                QR Code
            </Heading>
            <Center mt={4}>
                <QRCode
                    id="coindrop-qr-code"
                    value={fullPublicUrl}
                    size={225}
                    imageSettings={{
                        src: piggy64Png,
                        x: null,
                        y: null,
                        height: 64,
                        width: 64,
                        excavate: true,
                    }}
                />
            </Center>
            <Center>
                <Button
                    mt={4}
                    leftIcon={<PrintIcon />}
                    onClick={onPrint}
                    colorScheme="green"
                >
                    Print QR Code
                </Button>
            </Center>
        </>
    );
};

export default PiggybankQRCode;
