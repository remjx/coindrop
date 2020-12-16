import { FunctionComponent, useState } from 'react';
import QRCode from 'qrcode.react';
import { ViewOffIcon, ViewIcon } from '@chakra-ui/icons';
import { Flex, Box, Heading, Text, Button } from '@chakra-ui/react';
import { PrintIcon } from '../../../Icons/CustomIcons';

type Props = {
    publicUrl: string
    fullPublicUrl: string
}

const PiggybankQRCode: FunctionComponent<Props> = ({ publicUrl, fullPublicUrl }) => {
    const [isDisplayed, setIsDisplayed] = useState(false);
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
        <Flex my={4} wrap="wrap">
            <Box>
                <Heading as="h2" size="lg">
                    QR Code
                </Heading>
                <Text>Scan or print</Text>
            </Box>
            <Flex align="center" flexGrow={1} justify="center" mt={2} wrap="wrap">
            {isDisplayed ? (
                <>
                <Button
                    leftIcon={<ViewOffIcon />}
                    onClick={() => setIsDisplayed(false)}
                    variant="outline"
                    colorScheme="green"
                    mr={2}
                >
                    Hide
                </Button>
                <Button
                    leftIcon={<PrintIcon />}
                    onClick={onPrint}
                    colorScheme="green"
                >
                    Print
                </Button>
                </>
            ) : (
                <Button
                    leftIcon={<ViewIcon />}
                    onClick={() => setIsDisplayed(true)}
                    colorScheme="green"
                >
                    View
                </Button>
            )}
            </Flex>
        </Flex>
        {isDisplayed && (
            <Flex justify="center">
                <Box>
                    <Text
                        textAlign="center"
                        mb={1}
                    >
                        {publicUrl}
                    </Text>
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
                </Box>
            </Flex>
        )}
        </>
    );
};

export default PiggybankQRCode;
