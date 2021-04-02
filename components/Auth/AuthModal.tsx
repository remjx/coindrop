import { Text, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, ModalHeader, Link } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import { useRouter } from 'next/router';
import FirebaseAuth from './FirebaseAuth';

type Props = {
    isOpen: boolean
}

const AuthModal: FunctionComponent<Props> = ({ isOpen }) => {
    const router = useRouter();
    const onClose = () => router.push('/', undefined, { shallow: true });
    return (
        <Modal
            id="auth-modal"
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader textAlign="center" mb={-3}>Sign in to continue</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FirebaseAuth />
                    <Text textAlign="center" fontSize="xs" mb={2}>
                        {'If you\'re having trouble logging in, please try again with '}
                        <Link
                            href="https://www.google.com/chrome/"
                            target="_blank"
                            rel="noreferrer"
                            textDecoration="underline"
                        >
                            Chrome
                        </Link>
                        {' or '}
                        <Link
                            href="https://www.mozilla.org/firefox"
                            target="_blank"
                            rel="noreferrer"
                            textDecoration="underline"
                        >
                            Firefox
                        </Link>
                        .
                    </Text>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default AuthModal;
