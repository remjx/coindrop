import { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import {
    Button,
    Flex,
    Box,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    Text,
    Heading,
    Switch,
    Icon,
    useClipboard,
} from '@chakra-ui/core';

const CopyLinkShareButton = (props) => {
    const { textToCopy } = props;
    const { onCopy, hasCopied } = useClipboard(textToCopy);
    return (
        <Button
            onClick={onCopy}
            size="lg"
        >
            <Icon name={hasCopied ? "check" : "link"} mr={5} />
            <Flex direction="column" align="flex-start">
                <Text fontSize="xl">
                    {hasCopied ? "Copied" : "Copy Link"}
                </Text>
                <Text fontSize="sm">
                    {textToCopy}
                </Text>
            </Flex>
        </Button>
    );
};
CopyLinkShareButton.propTypes = {
    textToCopy: PropTypes.string.isRequired,
};
CopyLinkShareButton.defaultProps = {

};

const EmbedButtonModal = () => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const { query: { piggybankName }} = useRouter();
    const publicUrl = `coindrop.to/${piggybankName}`;
    return (
        <>
        <Button
            leftIcon="share"
            onClick={onOpen}
            variantColor="green"
        >
            Share
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <Heading
                    textAlign="center"
                    my={4}
                >
                    Share
                </Heading>
                <ModalBody>
                    <Box textAlign="center">
                        <CopyLinkShareButton textToCopy={publicUrl} />
                    </Box>
                    <Flex align="center">
                        <Text>Show URL</Text>
                        <Switch
                            name="???" // TODO: update
                        />
                    </Flex>

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
