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
import { FunctionComponent } from 'react';
import { ShareIcon } from '../../../Icons/CustomIcons';
import CopyLinkShareButton from '../../../Buttons/CopyLinkShareButton';
import PiggybankQRCode from './PiggybankQRCode';
import ShareEmbedButton from './ShareEmbedButton';

type Props = {
    buttonColor: string
}

const ShareButtonModal: FunctionComponent<Props> = ({ buttonColor }) => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const { query: { piggybankName: piggybankNameQuery }} = useRouter();
    const piggybankName = Array.isArray(piggybankNameQuery) ? piggybankNameQuery[0] : piggybankNameQuery;
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
                <ModalBody>
                    <Flex mb={4} wrap="wrap">
                        <Box>
                            <Heading as="h2" size="lg">
                                Link
                            </Heading>
                            <Text>{publicUrl}</Text>
                        </Box>
                        <Flex align="center" flexGrow={1} justify="center" mt={2}>
                            <CopyLinkShareButton textToCopy={publicUrl} buttonColorScheme="green" />
                        </Flex>
                    </Flex>
                    <ShareEmbedButton
                        fullPublicUrl={fullPublicUrl}
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

export default ShareButtonModal;
