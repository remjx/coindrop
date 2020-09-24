import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
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
    RadioGroup,
    Radio,
    useTheme,
} from "@chakra-ui/core";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { piggybankPathRegex } from '../../../src/settings';
import { PublicPiggybankData } from '../PublicPiggybankDataContext';
import { publicPiggybankThemeColorOptions as themeColorOptions } from '../../theme';
import { addressFieldPrefix, addressIsPreferredSuffix, getPaymentMethodIdFromPaymentMethodIsPreferredField } from '../util';
import { paymentMethodNames } from '../../../src/paymentMethods';
import PaymentMethodsInput from './PaymentMethodsInput';
import EditUrlInput from './EditUrlInput';
import { sortByAlphabeticalThenIsPreferred } from './util';

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
    let arr = Object.entries(obj)
    .map(([paymentMethodId, paymentMethodData]) => ({
        id: uuidv4(),
        value: paymentMethodId,
        ...paymentMethodData,
        ...(!paymentMethodData.isPreferred) && { isPreferred: false },
    }));
    console.log('pre-sort', JSON.stringify(arr))
    arr = sortByAlphabeticalThenIsPreferred(arr);
    console.log('post-sort', arr)
    return arr;
}

const EditPiggybankModal = (props) => {
    const { isOpen, onClose } = props;
    const { colors } = useTheme();
    const themeColorOptionsWithHexValues = themeColorOptions.map(name => ([name, colors[name]['500']]));
    const { query: { piggybankName: initialPiggybankId } } = useRouter();
    const data = useContext(PublicPiggybankData);
    const initialAddressDataFieldArray = convertPiggybankDataToAddressData(data);
    useEffect(() => console.log('initialAddressDataFieldArray', initialAddressDataFieldArray), []);
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
    const { piggybankId, name, accentColor, verb, website } = watch(["piggybankId", "name", "accentColor", "verb", "website"]);
    const onSubmit = (formData) => console.log('submitting data', formData);
    const handleAccentColorChange = (e) => {
        setValue("accentColor", e.target.dataset.colorname);
    };
    useEffect(() => {
        register("accentColor");
    }, [register]);
    const formControlTopMargin = 2;
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size="xl"
            closeOnOverlayClick={false}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Page Settings</ModalHeader>
                <ModalCloseButton />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalBody>
                        <FormControl isRequired>
                            <FormLabel htmlFor="input-piggybankId">URL</FormLabel>
                            <EditUrlInput
                                register={register}
                                value={piggybankId}
                            />
                        </FormControl>
                        <FormControl
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
                            <PaymentMethodsInput
                                fields={fields}
                                control={control}
                                register={register}
                                defaultValue={initialAddressDataFieldArray}
                                remove={remove}
                                append={append}
                            />
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
