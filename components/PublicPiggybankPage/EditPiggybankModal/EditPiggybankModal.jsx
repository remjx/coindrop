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
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    Select,
    useTheme,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { useForm, useFieldArray } from "react-hook-form";
import axios from 'axios';
import { PublicPiggybankData } from '../PublicPiggybankDataContext';
import { publicPiggybankThemeColorOptions as themeColorOptions } from '../../theme';
import PaymentMethodsInput from './PaymentMethodsInput';
import DeleteButton from '../../Dashboard/UserOwnedPiggybanks/PiggybankListItem/DeleteButton';
import EditUrlInput from './EditUrlInput';
import { convertPaymentMethodsFieldArrayToDbMap } from './util';
import { db } from '../../../utils/client/db';
import { useUser } from '../../../utils/auth/useUser';
import AvatarInput from './AvatarInput';

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
    const { user } = useUser();
    const themeColorOptionsWithHexValues = themeColorOptions.map(name => ([name, colors[name]['500']]));
    const { push: routerPush, query: { piggybankName: initialPiggybankId } } = useRouter();
    const { piggybankDbData, refreshPiggybankDbData } = useContext(PublicPiggybankData);
    const { avatar_storage_id: currentAvatarStorageId } = piggybankDbData;
    const initialPaymentMethodsDataFieldArray = convertPaymentMethodsDataToFieldArray(piggybankDbData.paymentMethods);
    const initialAccentColor = piggybankDbData.accentColor ?? 'orange';
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        control,
        formState: { isDirty },
    } = useForm({
        defaultValues: {
            piggybankId: initialPiggybankId,
            accentColor: initialAccentColor,
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
    const {
        accentColor: watchedAccentColor,
        piggybankId: watchedPiggybankId,
    } = watch(["accentColor", "piggybankId"]);
    const isUrlUnchanged = initialPiggybankId === watchedPiggybankId;
    const onSubmit = async (formData) => {
        try {
            setIsSubmitting(true);
            const dataToSubmit = {
                ...formData,
                paymentMethods: convertPaymentMethodsFieldArrayToDbMap(formData.paymentMethods ?? []),
                owner_uid: piggybankDbData.owner_uid,
                avatar_storage_id: currentAvatarStorageId ?? null,
            };
            if (isUrlUnchanged) {
                await db.collection('piggybanks').doc(initialPiggybankId).set(dataToSubmit);
            } else {
                await db.collection('piggybanks').doc(initialPiggybankId).delete();
                await axios.post(
                    '/api/createPiggybank',
                    {
                        oldPiggybankName: initialPiggybankId,
                        newPiggybankName: formData.piggybankId,
                        piggybankData: dataToSubmit,
                    },
                    {
                        headers: {
                            token: user.token,
                        },
                    },
                );
                routerPush(`/${formData.piggybankId}`);
            }
            await refreshPiggybankDbData(formData.piggybankId);
            onClose();
        } catch (error) {
            setIsSubmitting(false);
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
                <ModalHeader>Configure</ModalHeader>
                <ModalCloseButton />
                <form id="configure-coindrop-form" onSubmit={handleSubmit(onSubmit)}>
                    <ModalBody>
                        <AvatarInput />
                        <FormControl isRequired>
                            <FormLabel htmlFor="input-piggybankId">URL</FormLabel>
                            <EditUrlInput
                                register={register}
                                value={watchedPiggybankId}
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
                                        {watchedAccentColor === colorName && (
                                            <CheckIcon color="#FFF" />
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
                            isRequired
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
                    <Flex
                        id="modal-footer"
                        justify="space-between"
                        m={6}
                    >
                        <DeleteButton
                            piggybankName={initialPiggybankId}
                        />
                        <Flex>
                            <Button
                                variant="ghost"
                                onClick={onClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                colorScheme="green"
                                mx={1}
                                type="submit"
                                isLoading={isSubmitting}
                                loadingText="Submitting"
                                isDisabled={
                                    !isDirty
                                    && initialAccentColor === watchedAccentColor // controlled accentColor field is not showing up in formState.dirtyFields
                                }
                            >
                                Submit
                            </Button>
                        </Flex>
                    </Flex>
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
