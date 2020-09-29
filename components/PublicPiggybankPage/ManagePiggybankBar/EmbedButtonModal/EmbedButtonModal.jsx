import { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
} from '@chakra-ui/core';

const EmbedButtonModal = () => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    return (
        <>
        <Button
            leftIcon="sourceCode"
            onClick={onOpen}
        >
            Embed Button
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Embed Button</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>
                        Embed a button on your own website
                    </Text>
                    <form>
                        - checkbox: show custom url
                        -
                        - Copy Snippet / Image Code / Embed code
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
        </>
    );
};

EmbedButtonModal.propTypes = {

};

EmbedButtonModal.defaultProps = {

};

export default EmbedButtonModal;
