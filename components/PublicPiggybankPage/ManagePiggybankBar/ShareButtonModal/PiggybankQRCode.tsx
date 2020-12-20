import { FunctionComponent } from 'react';
import QRCode from 'qrcode.react';
import { Flex, Box, Heading, Text, Button, Center } from '@chakra-ui/react';
import { PrintIcon } from '../../../Icons/CustomIcons';

type Props = {
    publicUrl: string
    fullPublicUrl: string
}

const PiggybankQRCode: FunctionComponent<Props> = ({ publicUrl, fullPublicUrl }) => {
    const onPrint = () => {
        const canvas = document.getElementById('qrcode') as HTMLCanvasElement;
        const imgCanvas = canvas.toDataURL();
        const myWindow = window.open();
        myWindow.document.write(`<div><div>${publicUrl}</div><br /><img src="${imgCanvas}" /></div>`);
        myWindow.document.close();
        myWindow.focus();
        myWindow.print();
    };
    return (
        <>
            <Heading as="h2" size="lg" mt={4}>
                QR Code
            </Heading>
            <Center mt={4}>
                <QRCode
                    value={fullPublicUrl}
                    size={225}
                    imageSettings={{
                        src: "/logo/piggy-64.png",
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
