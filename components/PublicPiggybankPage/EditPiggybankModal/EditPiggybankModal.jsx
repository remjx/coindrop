import React from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    InputGroup,
    InputLeftAddon,
} from "@chakra-ui/core";
import { useForm } from "react-hook-form";

const EditPiggybankModal = (props) => {
    const { isOpen, onClose } = props;
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = (data) => console.log('submitting data', data);
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size="xl"
        >
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Edit</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isRequired>
                <FormLabel htmlFor="fname">URL</FormLabel>
                
                <InputGroup>
                    <InputLeftAddon>
                        coindrop.to/
                    </InputLeftAddon>
                    <Input
                        roundedLeft="0"
                        placeholder="my-piggybank-url"
                        onChange={(e) => {
                        }}
                        value={'???'}
                        isInvalid={'???'}
                    />
                </InputGroup>
            </FormControl>
            <FormControl isRequired>
                <FormLabel htmlFor="fname">Display Name</FormLabel>
                <Input id="fname" placeholder="First name" />
            </FormControl>
            </form>
            </ModalBody>

            <ModalFooter>
                <Button variant="ghost">Cancel</Button>
                <Button variantColor="blue" mr={3} onClick={onClose}>
                    Submit
                </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

EditPiggybankModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

EditPiggybankModal.defaultProps = {

};

export default EditPiggybankModal;
