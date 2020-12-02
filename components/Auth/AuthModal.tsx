import { Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, ModalHeader } from '@chakra-ui/react';
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
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default AuthModal;
