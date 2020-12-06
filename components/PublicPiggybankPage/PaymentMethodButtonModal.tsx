import { FunctionComponent, useContext } from 'react';
import QRCode from 'qrcode.react';
import { CheckIcon, CopyIcon } from "@chakra-ui/icons";
import { Flex, Box, useClipboard, Text, Button, Modal, ModalOverlay, ModalHeader, ModalCloseButton, ModalContent, ModalBody } from '@chakra-ui/react';
import { PublicPiggybankData } from './PublicPiggybankDataContext';
import { paymentMethodIcons } from '../../src/paymentMethods';

type Props = {
    isOpen: boolean
    onClose: () => void
    paymentMethod: string
    paymentMethodDisplayName: string
    paymentMethodValue: string
}

const PaymentMethodButtonModal: FunctionComponent<Props> = ({ isOpen, onClose, paymentMethod, paymentMethodDisplayName, paymentMethodValue }) => {
    const { onCopy, hasCopied } = useClipboard(paymentMethodValue);
    const { piggybankDbData } = useContext(PublicPiggybankData);
    const { name } = piggybankDbData;
    const Icon = paymentMethodIcons[paymentMethod];
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader
                textAlign="center"
                mt={3}
                mx="auto"
            >
                {name}
                {"'s "}
                {paymentMethodDisplayName}
                {' address'}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody
                pt={0}
                mb={3}
                mx="auto"
            >
                <Flex justify="center" align="center">
                    <Icon
                        mr={2}
                        boxSize="48px"
                    />
                    <Text
                        wordBreak="break-all"
                        textAlign="center"
                    >
                        {paymentMethodValue}
                    </Text>
                </Flex>
                <Box
                    my={2}
                    textAlign="center"
                >
                    <Button
                        leftIcon={hasCopied ? <CheckIcon /> : <CopyIcon />}
                        onClick={onCopy}
                    >
                        {hasCopied ? "Copied" : "Copy"}
                    </Button>
                </Box>
                <Text mb={2} textAlign="center">or scan QR Code:</Text>
                <Flex justify="center">
                    <QRCode
                        id="payment-method-qr-code"
                        value={paymentMethodValue}
                        size={225}
                    />
                </Flex>
            </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default PaymentMethodButtonModal;
