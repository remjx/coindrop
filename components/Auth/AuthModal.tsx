import { Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, ModalHeader } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import FirebaseAuth from './FirebaseAuth';

type Props = {
    isOpen: boolean
    onClose: () => void
}

const AuthModal: FunctionComponent<Props> = ({ isOpen, onClose }) => (
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

export default AuthModal;
