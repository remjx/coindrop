import { useContext } from 'react';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';
import { CheckIcon, CopyIcon } from "@chakra-ui/icons";
import { Flex, Box, useClipboard, Text, Button, Modal, ModalOverlay, ModalHeader, ModalCloseButton, ModalContent, ModalBody } from '@chakra-ui/react';
import { PublicPiggybankData } from './PublicPiggybankDataContext';
import { paymentMethodIcons } from '../../src/paymentMethods';

const PaymentMethodButtonModal = (props) => {
    const { isOpen, onClose, paymentMethod, paymentMethodDisplayName, paymentMethodValue } = props;
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
                <Flex align="center">
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

PaymentMethodButtonModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    paymentMethod: PropTypes.string.isRequired,
    paymentMethodDisplayName: PropTypes.string.isRequired,
    paymentMethodValue: PropTypes.string.isRequired,
};

PaymentMethodButtonModal.defaultProps = {

};

export default PaymentMethodButtonModal;
