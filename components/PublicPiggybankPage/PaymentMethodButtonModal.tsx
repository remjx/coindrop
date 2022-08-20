import { FunctionComponent, useContext } from 'react';
import QRCode from 'qrcode.react';
import { CheckIcon, CopyIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import isUrl from 'validator/lib/isURL';
import { Flex, useClipboard, Link, Text, Button, Modal, ModalOverlay, ModalHeader, ModalCloseButton, ModalContent, ModalBody } from '@chakra-ui/react';
import { PublicPiggybankDataContext } from './PublicPiggybankDataContext';
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
    const { piggybankDbData } = useContext(PublicPiggybankDataContext);
    const { name } = piggybankDbData;
    const Icon = paymentMethodIcons[paymentMethod];
    const addressIsUrl = isUrl(paymentMethodValue, {
        require_protocol: true,
        require_valid_protocol: true,
        protocols: ['http', 'https'],
        allow_protocol_relative_urls: false,
    });
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent mx={6}>
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
                    <Flex
                        my={2}
                        align="center"
                        justify="center"
                    >
                        {addressIsUrl ? (
                            <Link href={paymentMethodValue} isExternal>
                                <Button
                                    leftIcon={<ExternalLinkIcon />}
                                    mr={2}
                                >
                                    Open
                                </Button>
                            </Link>
                        ) : (
                            <Button
                                leftIcon={hasCopied ? <CheckIcon /> : <CopyIcon />}
                                onClick={onCopy}
                            >
                                {hasCopied ? "Copied" : "Copy"}
                            </Button>
                        )}
                    </Flex>
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
