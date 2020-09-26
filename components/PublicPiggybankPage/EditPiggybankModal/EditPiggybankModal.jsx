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
import axios from 'axios';
import { piggybankPathRegex } from '../../../src/settings'; // use for validation
import { PublicPiggybankData } from '../PublicPiggybankDataContext';
import { publicPiggybankThemeColorOptions as themeColorOptions } from '../../theme';
import { paymentMethodNames } from '../../../src/paymentMethods';
import PaymentMethodsInput from './PaymentMethodsInput';
import EditUrlInput from './EditUrlInput';
import { convertPaymentMethodsFieldArrayToDbMap } from './util';
import { db } from '../../../utils/client/db';
import { useUser } from '../../../utils/auth/useUser';

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
    const [isSubmitting, setIsSubmitting] = useState();
    const { colors } = useTheme();
    const { token } = useUser();
    const themeColorOptionsWithHexValues = themeColorOptions.map(name => ([name, colors[name]['500']]));
    const { push: routerPush, query: { piggybankName: initialPiggybankId } } = useRouter();
    const { piggybankDbData, refreshPiggybankDbData } = useContext(PublicPiggybankData);
    console.log('DB PIGGYBANK DATA', piggybankDbData);
    const initialPaymentMethodsDataFieldArray = convertPaymentMethodsDataToFieldArray(piggybankDbData.paymentMethods);
    const { register, handleSubmit, setValue, watch, control, errors, unregister } = useForm({
        defaultValues: {
            piggybankId: initialPiggybankId,
            accentColor: piggybankDbData.accentColor ?? 'orange',
            website: piggybankDbData.website ?? '',
            name: piggybankDbData.name ?? '',
            verb: piggybankDbData.verb ?? 'pay',
            paymentMethods: initialPaymentMethodsDataFieldArray,
        },
    });
    const paymentMethodsFieldArrayName = "paymentMethods";
    const { fields, append, remove } = useFieldArray({
        control,
        name: paymentMethodsFieldArrayName,
    });
    const { piggybankId, name, accentColor, verb, website } = watch(["piggybankId", "name", "accentColor", "verb", "website"]); // TODO: do these need to be watched if not showing Preview?
    const isUrlUnchanged = initialPiggybankId === piggybankId;
    const onSubmit = async (formData) => {
        try {
            setIsSubmitting(true);
            console.log('raw form data', formData);
            const dataToSubmit = {
                ...formData,
                paymentMethods: convertPaymentMethodsFieldArrayToDbMap(formData.paymentMethods ?? []),
                owner_uid: piggybankDbData.owner_uid,
            };
            console.log('dataToSubmit', dataToSubmit);
            if (isUrlUnchanged) {
                await db.collection('piggybanks').doc(initialPiggybankId).set(dataToSubmit); // TODO: does this return the document? if so, instead of routerPush'ing below, can manually set the data without refetching from db.
                await refreshPiggybankDbData(initialPiggybankId);
            } else {
                await db.collection('piggybanks').doc(initialPiggybankId).delete();
                const response = await axios.post(
                    '/api/createPiggybank',
                    {
                        piggybankName: formData.piggybankId, // TODO: rename this to piggybankId
                        piggybankData: dataToSubmit,
                    },
                    {
                        token,
                    },
                );
                console.log('response.data', response.data);
                routerPush(`/${formData.piggybankId}`);
            }
            onClose();
        } catch (error) {
            setIsSubmitting(false);
            console.log(error);
            // TODO: set error
            throw new Error(error);
        }
    };
    const handleAccentColorChange = (e) => {
        e.preventDefault();
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
                                <option value="pay">Pay</option> {/* TODO: Where are these mapped to what is displayed? */}
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
                            isLoading={isSubmitting}
                            loadingText="Submitting"
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
