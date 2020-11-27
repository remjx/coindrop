import { useState } from 'react';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';
import { ViewOffIcon, ViewIcon } from '@chakra-ui/icons';
import { Flex, Box, Heading, Text, Button } from '@chakra-ui/react';
import { PrintIcon } from '../../../Icons/CustomIcons';

const PiggybankQRCode = ({ publicUrl, fullPublicUrl }) => {
    const [isDisplayed, setIsDisplayed] = useState();
    const onPrint = () => {
        const canvas = document.getElementById('qrcode');
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
                <Text>Scan with smartphone camera</Text>
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
                    />
                </Box>
            </Flex>
        )}
        </>
    );
};

PiggybankQRCode.propTypes = {
    fullPublicUrl: PropTypes.string.isRequired,
    publicUrl: PropTypes.string.isRequired,
};

export default PiggybankQRCode;
