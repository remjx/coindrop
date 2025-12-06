import { useRouter } from 'next/router';
import {
    Button,
    Box,
    Center,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    ModalFooter,
    Heading,
} from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import { ShareIcon } from '../../../Icons/CustomIcons';
import CopyLinkShareButton from './CopyLinkShareButton';
import PiggybankQRCode from './PiggybankQRCode';
import ShareEmbedButton from './ShareEmbedButton';
// import TipCards from './TipCards';

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
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <Heading
                    mt={4}
                    as="h2"
                    size="md"
                    mx={12}
                    textAlign="center"
                >
                    {publicUrl}
                </Heading>
                <ModalBody>
                    <Box mb={4}>
                        <Box>
                            <Heading as="h2" size="lg">
                                Link
                            </Heading>
                        </Box>
                        <Center mt={2}>
                            <CopyLinkShareButton textToCopy={publicUrl} />
                        </Center>
                    </Box>
                    <ShareEmbedButton
                        fullPublicUrl={fullPublicUrl}
                    />
                    <PiggybankQRCode
                        fullPublicUrl={fullPublicUrl}
                        publicUrl={publicUrl}
                    />
                    {/* <TipCards /> */}
                </ModalBody>
                <ModalFooter />
            </ModalContent>
        </Modal>
        </>
    );
};

export default ShareButtonModal;
