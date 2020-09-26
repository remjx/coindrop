import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
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
    Input,
    Icon,
    Select,
    useTheme,
} from "@chakra-ui/core";
import { useForm, useFieldArray } from "react-hook-form";
import { piggybankPathRegex } from '../../../src/settings'; // use for validation
import { PublicPiggybankData } from '../PublicPiggybankDataContext';
import { publicPiggybankThemeColorOptions as themeColorOptions } from '../../theme';
import { paymentMethodNames } from '../../../src/paymentMethods';
import PaymentMethodsInput from './PaymentMethodsInput';
import EditUrlInput from './EditUrlInput';

function convertPaymentMethodsDataToFieldArray(paymentMethods = {}) {
    return Object.entries(paymentMethods)
    .map(([paymentMethodId, paymentMethodData]) => ({
        id: uuidv4(), // react-hook-form requires unchanging id
        paymentMethodId,
        ...paymentMethodData,
    }));
}

const EditPiggybankModal = (props) => {
    const { isOpen, onClose } = props;
    const { colors } = useTheme();
    const themeColorOptionsWithHexValues = themeColorOptions.map(name => ([name, colors[name]['500']]));
    const { query: { piggybankName: initialPiggybankId } } = useRouter();
    const dbPiggybankData = useContext(PublicPiggybankData);
    const initialPaymentMethodsDataFieldArray = convertPaymentMethodsDataToFieldArray(dbPiggybankData.paymentMethods);
    useEffect(() => console.log('initialPaymentMethodsDataFieldArray', initialPaymentMethodsDataFieldArray), []);
    const { register, handleSubmit, setValue, getValues, watch, control, errors } = useForm({
        defaultValues: {
            piggybankId: initialPiggybankId,
            accentColor: dbPiggybankData.accentColor ?? 'orange',
            website: dbPiggybankData.website ?? '',
            name: dbPiggybankData.name ?? '',
            verb: dbPiggybankData.verb ?? 'pay',
            paymentMethods: initialPaymentMethodsDataFieldArray,
        },
    });
    const paymentMethodsFieldArrayName = "paymentMethods";
    const { fields, append, remove } = useFieldArray({
        control,
        name: paymentMethodsFieldArrayName,
    });
    const { piggybankId, name, accentColor, verb, website } = watch(["piggybankId", "name", "accentColor", "verb", "website"]); // TODO: do these need to be watched?
    const isUrlUnchanged = initialPiggybankId === piggybankId;
    const onSubmit = (formData) => {
        // TODO: remove id field?
        console.log('raw form data', formData);
        const dataToSubmit = { ...formData };
        Object.keys(formData.paymentMethods).forEach(paymentMethodId => {
            delete dataToSubmit.paymentMethods[paymentMethodId].id; // react-hook-form id is transitory
        });
        console.log('dataToSubmit', dataToSubmit);
        if (isUrlUnchanged) {
            // if proposed coindrop url is current, just update data (OVERWRITE ALL DATA?)
        } else {
            // if proposed coindrop url is different, create a new document and delete the old one. then router.push to the new url.
        }
    };
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
                <ModalHeader>Settings</ModalHeader>
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
                                remove={remove}
                                append={append}
                                fieldArrayName={paymentMethodsFieldArrayName}
                            />
                        </FormControl>
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
