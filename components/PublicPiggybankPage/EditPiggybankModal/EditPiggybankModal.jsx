import { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import {
    Box,
    Flex,
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
    InputRightElement,
    Icon,
    Spinner,
    useTheme,
} from "@chakra-ui/core";
import { useForm } from "react-hook-form";
import { piggybankPathRegex } from '../../../src/settings';
import { PublicPiggybankData } from '../PublicPiggybankDataContext';

const themeColorOptions = [
    "red",
    "pink",
    "orange",
    "yellow",
    "green",
    "teal",
    "cyan",
    "blue",
    "purple",
];

const EditPiggybankModal = (props) => {
    const { isOpen, onClose } = props;
    const { colors } = useTheme();
    const themeColorOptionsWithHexValues = themeColorOptions.map(name => ([name, colors[name]['500']]));
    const { query: { piggybankName } } = useRouter();
    const data = useContext(PublicPiggybankData);
    const { register, handleSubmit, setValue, getValues, errors } = useForm();
    const onSubmit = (data) => null;
    const handleAccentColorChange = (e) => {
        setValue("accentColor", e.target.dataset.colorname);
    };
    useEffect(() => {
        register("accentColor");
        setValue("accentColor", data.accentColor); // does this do anything?
    }, [register]);
    const selectedColor = getValues("accentColor");
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
                        <FormLabel htmlFor="input-piggybankName">URL</FormLabel>
                        <InputGroup>
                            <InputLeftAddon>
                                coindrop.to/
                            </InputLeftAddon>
                            <Input
                                id="input-piggybankName"
                                maxLength="32"
                                roundedLeft="0"
                                onChange={(e) => {
                                    // TODO: use debounce
                                }}
                                // isInvalid={}
                                ref={register}
                                name="piggybankName"
                                defaultValue={piggybankName}
                            />
                            <InputRightElement>
                                <Icon name="check" color="green.500" />
                                <Box>
                                    <Spinner size="sm" />
                                </Box>
                                <Icon name="not-allowed" color="red.500" />
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel
                            htmlFor="input-name"
                        >
                            Name
                        </FormLabel>
                        <Input
                            id="input-name"
                            name="name"
                            onBlur={() => console.log('ON BLUR!')}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel
                            htmlFor="input-accentColor"
                        >
                            Theme Color
                        </FormLabel>
                        <Flex wrap="wrap" justify="center">
                            {themeColorOptionsWithHexValues.map(([colorName, hexCode]) => (
                                <Box
                                    as="button"
                                    bg={hexCode}
                                    w="36px"
                                    h="36px"
                                    borderRadius="50%"
                                    mx={1}
                                    my={1}
                                    onClick={handleAccentColorChange}
                                    data-colorname={colorName}
                                >
                                    {selectedColor === colorName && (
                                        <Icon name="check" color="#FFF" />
                                    )}
                                </Box>
                            ))}

                        </Flex>
                    </FormControl>
                </form>
            </ModalBody>

            <ModalFooter align="center" mx="auto">
                <Button variant="ghost">Cancel</Button>
                <Button
                    variantColor={selectedColor}
                    mx={1}
                    onClick={onClose}
                >
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
