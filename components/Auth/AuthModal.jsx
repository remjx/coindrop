import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, ModalHeader } from '@chakra-ui/core';
import FirebaseAuth from './FirebaseAuth';

const AuthModal = (props) => {
    const { isOpen } = props;
    const router = useRouter();
    const onClose = () => router.push('/');
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay />
            <ModalContent>
            <ModalHeader textAlign="center">Sign in to continue</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <FirebaseAuth />
            </ModalBody>
            </ModalContent>
        </Modal>
    );
};

AuthModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
};

AuthModal.defaultProps = {

};

export default AuthModal;
