import { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import {
    Accordion,
    AccordionItem,
    AccordionHeader,
    AccordionPanel,
    AccordionIcon,
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
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { piggybankPathRegex } from '../../../src/settings';
import { PublicPiggybankData } from '../PublicPiggybankDataContext';
import { publicPiggybankThemeColorOptions as themeColorOptions } from '../../theme';
import { addressFieldPrefix, addressIsPreferredSuffix, getPaymentMethodIdFromPaymentMethodIsPreferredField } from '../PublicPiggybankPage';
import { paymentMethodNames } from '../../../src/paymentMethods';

function convertPiggybankDataToAddressData(piggybankData) {
    const obj = Object.entries(piggybankData)
    .reduce((result, [field, value]) => {
        if (field.startsWith(addressFieldPrefix)) {
            if (field.endsWith(addressIsPreferredSuffix)) {
                const paymentMethodId = getPaymentMethodIdFromPaymentMethodIsPreferredField(field);
                return {
                    ...result,
                    [paymentMethodId]: {
                        ...result[paymentMethodId],
                        isPreferred: value,
                    },
                };
            }
            const paymentMethodId = field.substr(addressFieldPrefix.length);
            return {
                ...result,
                [paymentMethodId]: {
                    ...result[paymentMethodId],
                    address: value,
                },
            };
        }
        return result;
    }, {});
    const arr = Object.entries(obj)
    .map(([paymentMethodId, paymentMethodData]) => ({
        id: paymentMethodId,
        ...paymentMethodData,
    }));
    return arr;
}

const EditPiggybankModal = (props) => {
    const { isOpen, onClose } = props;
    const { colors } = useTheme();
    const themeColorOptionsWithHexValues = themeColorOptions.map(name => ([name, colors[name]['500']]));
    const { query: { piggybankName: initialPiggybankId } } = useRouter();
    const data = useContext(PublicPiggybankData);
    const initialAddressDataFieldArray = convertPiggybankDataToAddressData(data);

    console.log('initialAddressDataFieldArray', initialAddressDataFieldArray)
    const { register, handleSubmit, setValue, getValues, watch, control, errors } = useForm({
        defaultValues: {
            piggybankId: initialPiggybankId,
            accentColor: data.accent_color ?? 'orange',
            website: data.website ?? '',
            name: data.name ?? '',
            verb: data.verb ?? 'pay',
            addressData: initialAddressDataFieldArray,
        },
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "addressData",
    });
    watch();
    const onSubmit = (formData) => console.log('submitting data', formData);
    const handleAccentColorChange = (e) => {
        setValue("accentColor", e.target.dataset.colorname);
    };
    useEffect(() => {
        register("accentColor");
    }, [register]);
    const { name, accentColor, verb, website } = getValues(["name", "accentColor", "verb", "website"]);
    const formControlTopMargin = 2;
    const PaymentMethodsInputs = () => {
        console.log('FIELDS', fields);
        return (
            <Accordion
                allowToggle
                defaultIndex={!paymentMethodNames[fields[fields.length - 1].id] ? fields.length - 1 : -1}
            >
                {fields.map((item, index) => {
                    console.log('ITEM', item, !paymentMethodNames[item.id])
                    return (
                        <AccordionItem
                            key={item.id}
                        >
                            <AccordionHeader>
                                <Flex flex="1" textAlign="left" align="center">
                                    <Icon mr={2} name={item.id} />
                                    {paymentMethodNames[item.id] ?? 'New payment method'}
                                    {item.isPreferred && (
                                        <>
                                        <Icon
                                            ml={2}
                                            name="star"
                                            size="16px"
                                            color={colors.yellow['400']}
                                        />
                                        <Text
                                            as="span"
                                            fontSize="xs"
                                            ml={1}
                                        >
                                            <i>Preferred</i>
                                        </Text>
                                        </>
                                    )}
                                </Flex>
                                <AccordionIcon />
                            </AccordionHeader>
                            <AccordionPanel pb={4}>
                                <Select
                                    name={`addressData[${index}].id`}
                                    ref={register()}
                                    defaultValue={item.id}
                                >
                                    {Object.entries(paymentMethodNames).map(([paymentMethodId, paymentMethodName]) => (
                                        <option value={paymentMethodId}>{paymentMethodName}</option>
                                    ))}
                                </Select>
                                <Input name={`addressData[${index}].address`} ref={register()} defaultValue={item.address} />
                                <Input name={`addressData[${index}].isPreferred`} ref={register()} defaultValue={item.isPreferred} />
                                <Flex
                                    justify="flex-end"
                                    mt={1}
                                >
                                    <Button
                                        onClick={() => remove(index)}
                                        leftIcon="delete"
                                        variantColor="red"
                                        size="sm"
                                    >
                                        Remove
                                    </Button>
                                </Flex>
                            </AccordionPanel>
                        </AccordionItem>
                    );
                })}
                {/* {Object.entries(addressData).map(([paymentMethodId, paymentMethodData]) => (
                    <Box>
                        <Flex>
                            <Text>{paymentMethodId}</Text>
                            <Text>{paymentMethodData.address}</Text>
                            <Text>{paymentMethodData.isPreferred ? 'is preferred' : 'not preferred'}</Text>
                        </Flex>
                    </Box>
                ))} */}
                {/* 
                    <li key={paymentMethodId}>
                        <input
                            name={`paymentMethods[${paymentMethodId}].paymentMethod`}
                            ref={register()}
                            defaultValue={value} // make sure to set up defaultValue
                        />
                        <Controller
                            as={<input />}
                            name={`paymentMethods[${paymentMethodId}].value`}
                            control={control}
                            defaultValue={value} // make sure to set up defaultValue
                        />
                        <input
                            name={`paymentMethods[${paymentMethodId}].isPreferred`}
                            ref={register()}
                            defaultValue={isPreferred} // make sure to set up defaultValue
                        />
                        <Button onClick={() => remove(paymentMethodId)}>Delete</Button>
                    </li>
                */}
            </Accordion>
        );
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalBody>
                        <FormControl isRequired>
                            <FormLabel htmlFor="input-piggybankId">URL</FormLabel>
                            <InputGroup>
                                <InputLeftAddon>
                                    coindrop.to/
                                </InputLeftAddon>
                                <Input
                                    id="input-piggybankId"
                                    maxLength="32"
                                    roundedLeft="0"
                                    onChange={(e) => {
                                        // TODO: use debounce
                                    }}
                                    // isInvalid={}
                                    ref={register}
                                    name="piggybankId"
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
                                        key={colorName}
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
                            <Flex
                                justify="center"
                                mt={2}
                            >
                                <Button
                                    onClick={() => append({ address: "", isPreferred: false })}
                                    leftIcon="add"
                                    variant="ghost"
                                    size="sm"
                                >
                                    Add payment method
                                </Button>
                            </Flex>
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
                            type="submit"
                        >
                            Submit
                        </Button>
                    </ModalFooter>
                </form>
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
