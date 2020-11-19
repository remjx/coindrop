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
    ModalFooter,
    Text,
    Heading,
} from '@chakra-ui/react';
import { ShareIcon } from '../../../Icons/CustomIcons';
import CopyLinkShareButton from '../../../Buttons/CopyLinkShareButton';
import PiggybankQRCode from './PiggybankQRCode';
import ShareEmbedButton from './ShareEmbedButton';

const ShareButtonModal = ({ buttonColor }) => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const { query: { piggybankName }} = useRouter();
    const publicUrl = `coindrop.to/${piggybankName}`;
    const fullPublicUrl = `https://${publicUrl}`;
    return (
        <>
        <Button
            leftIcon={<ShareIcon />}
            onClick={onOpen}
            colorScheme={buttonColor}
            isDisabled={isOpen}
        >
            Share
        </Button>
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <Heading
                    mt={4}
                >
                    <Flex align="center" justify="center">
                        <ShareIcon mr={2} />
                        Share
                    </Flex>
                </Heading>
                <Text textAlign="center" fontWeight="bold">{publicUrl}</Text>
                <ModalBody>
                    <Flex mb={4} wrap="wrap">
                        <Box>
                            <Heading as="h2" size="lg">
                                Link
                            </Heading>
                            <Text>Share with anyone, anywhere</Text>
                        </Box>
                        <Flex align="center" flexGrow={1} justify="center" mt={2}>
                            <CopyLinkShareButton textToCopy={publicUrl} buttonColorScheme="green" />
                        </Flex>
                    </Flex>
                    <ShareEmbedButton
                        fullPublicUrl={fullPublicUrl}
                        publicUrl={publicUrl}
                        piggybankName={piggybankName}
                    />
                    <PiggybankQRCode
                        fullPublicUrl={fullPublicUrl}
                        publicUrl={publicUrl}
                    />
                </ModalBody>
                <ModalFooter />
            </ModalContent>
        </Modal>
        </>
    );
};

ShareButtonModal.propTypes = {
    buttonColor: PropTypes.string,
};

ShareButtonModal.defaultProps = {
    buttonColor: undefined,
};

export default ShareButtonModal;
