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
    Link,
    Spinner,
    Select,
    Text,
    useTheme,
} from "@chakra-ui/core";
import { useForm } from "react-hook-form";
import { piggybankPathRegex } from '../../../src/settings';
import { PublicPiggybankData } from '../PublicPiggybankDataContext';
import { publicPiggybankThemeColorOptions as themeColorOptions } from '../../theme';

const EditPiggybankModal = (props) => {
    const { isOpen, onClose } = props;
    const { colors } = useTheme();
    const themeColorOptionsWithHexValues = themeColorOptions.map(name => ([name, colors[name]['500']]));
    const { query: { piggybankName } } = useRouter();
    const data = useContext(PublicPiggybankData);
    console.log('data', data)
    const { addresses } = data;
    const { register, handleSubmit, setValue, getValues, watch, errors } = useForm();
    watch();
    const onSubmit = (data) => null;
    const handleAccentColorChange = (e) => {
        setValue("accentColor", e.target.dataset.colorname);
    };
    useEffect(() => {
        register("accentColor");
    }, [register]);
    useEffect(() => {
        setValue("accentColor", data.accent_color ?? 'orange'); // does this do anything?
    }, []);
    const { name, accentColor, verb, website } = getValues(["name", "accentColor", "verb", "website"]);
    const formControlTopMargin = 2;
    const PaymentMethodsInputs = () => {
        return (
            <>
                {addresses.map(([paymentMethodId, value, isPreferred]) => (
                    <Flex>
                        <Text>{paymentMethodId}</Text>
                        <Text>{value}</Text>
                        <Text>{isPreferred ? 'isPreferred' : 'isNotPreferred'}</Text>
                    </Flex>
                ))}
            </>
        )
    };
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size="xl"
        >
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Page Settings</ModalHeader>
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
                    <FormControl
                        isRequired
                        mt={formControlTopMargin}
                    >
                        <FormLabel
                            htmlFor="input-accentColor"
                        >
                            Theme
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
                                    {accentColor === colorName && (
                                        <Icon name="check" color="#FFF" />
                                    )}
                                </Box>
                            ))}

                        </Flex>
                    </FormControl>
                    <FormControl
                        isRequired
                        mt={formControlTopMargin}
                    >
                        <FormLabel
                            htmlFor="input-name"
                        >
                            Name
                        </FormLabel>
                        <Input
                            id="input-name"
                            name="name"
                            ref={register}
                            onBlur={() => console.log('ON BLUR!')}
                        />
                    </FormControl>
                    <FormControl
                        isRequired
                        mt={formControlTopMargin}
                    >
                        <FormLabel
                            htmlFor="input-verb"
                        >
                            Payment action name
                        </FormLabel>
                        <Select
                            id="input-verb"
                            name="verb"
                            ref={register}
                        >
                            <option value="pay">Pay</option>
                            <option value="donate to">Donate to</option>
                            <option value="support">Support</option>
                        </Select>
                    </FormControl>
                    <FormControl
                        mt={formControlTopMargin}
                    >
                        <FormLabel
                            htmlFor="input-website"
                        >
                            Website
                        </FormLabel>
                        <Input
                            id="input-website"
                            name="website"
                            ref={register}
                            placeholder="http://"
                            type="url"
                        />
                    </FormControl>
                    <FormControl
                        mt={formControlTopMargin}
                    >
                        <FormLabel
                            htmlFor="input-paymentmethods"
                        >
                            Payment Methods
                        </FormLabel>
                        <PaymentMethodsInputs />
                    </FormControl>
                    {name && accentColor && verb && (
                        <>
                        <FormLabel
                            htmlFor="input-verb"
                        >
                            Preview
                        </FormLabel>
                        <FormHelperText textAlign="center">
                            {'"Choose a payment method to '}
                            {verb ?? 'pay'}
                            {' '}
                            {website ? (
                                <Link href={website}>
                                    <Text
                                        as="span"
                                        fontWeight="bold"
                                        color={colors[accentColor]['500']}
                                        textDecoration="underline"
                                    >
                                        {name}
                                    </Text>
                                </Link>
                            ) : (
                                <Text
                                    as="span"
                                    fontWeight="bold"
                                    color={colors[accentColor]['500']}
                                >
                                    {name}
                                </Text>
                            )}
                            &quot;
                        </FormHelperText>
                        </>
                    )}
                </form>
            </ModalBody>

            <ModalFooter align="center" mx="auto">
                <Button
                    variant="ghost"
                    onClick={onClose}
                >
                    Cancel
                </Button>
                <Button
                    variantColor="green"
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
