import { FunctionComponent, useContext, useEffect, useState } from 'react';
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
    useColorMode,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { useForm, useFieldArray } from "react-hook-form";
import axios from 'axios';
import { mutate } from 'swr';
import { PublicPiggybankDataContext } from '../PublicPiggybankDataContext';
import { publicPiggybankThemeColorOptions as themeColorOptions } from '../../theme';
import PaymentMethodsInput from './PaymentMethodsInput';
import DeleteButton from '../../Dashboard/UserOwnedPiggybanks/PiggybankListItem/DeleteButton';
import EditUrlInput from './EditUrlInput';
import { convertPaymentMethodsFieldArrayToDbMap, sortByIsPreferredThenAlphabetical } from './util';
import { db } from '../../../utils/client/db';
import { useUser } from '../../../utils/auth/useUser';
import AvatarInput from './AvatarInput';
import { AdditionalValidation } from './AdditionalValidationContext';

export type PaymentMethodsDbObj = {
    [key: string]: {
        address: string
        isPreferred: boolean
    }
}

function convertPaymentMethodsDataToFieldArray(paymentMethods: PaymentMethodsDbObj = {}) {
    return Object.entries(paymentMethods)
    .map(([paymentMethodId, paymentMethodData]) => ({
        id: uuidv4(), // react-hook-form requires unchanging id
        paymentMethodId,
        ...paymentMethodData,
    }));
}

type Props = {
    isOpen: boolean,
    onClose: () => void,
}

const EditPiggybankModal: FunctionComponent<Props> = ({ isOpen, onClose }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { colors } = useTheme();
    const { user } = useUser();
    const { colorMode } = useColorMode();
    const accentColorLevel = colorMode === 'light' ? '500' : '300';
    const themeColorOptionsWithHexValues = themeColorOptions.map(name => ([name, colors[name][accentColorLevel]]));
    const { push: routerPush, query: { piggybankName } } = useRouter();
    const initialPiggybankId = Array.isArray(piggybankName) ? piggybankName[0] : piggybankName;
    const { piggybankDbData } = useContext(PublicPiggybankDataContext);
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
            paymentMethods: sortByIsPreferredThenAlphabetical(initialPaymentMethodsDataFieldArray),
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
    const isAccentColorDirty = initialAccentColor !== watchedAccentColor;
    const isUrlUnchanged = initialPiggybankId === watchedPiggybankId;
    const { isPiggybankIdAvailable, setIsAddressTouched } = useContext(AdditionalValidation);
    const onSubmit = async (formData) => {
        try {
            setIsSubmitting(true);
            const dataToSubmit = {
                ...formData,
                paymentMethods: convertPaymentMethodsFieldArrayToDbMap(formData.paymentMethods ?? []),
                owner_uid: user.id,
                avatar_storage_id: currentAvatarStorageId ?? null,
            };
            if (isUrlUnchanged) {
                await db.collection('piggybanks').doc(initialPiggybankId).set(dataToSubmit);
                mutate(['publicPiggybankData', initialPiggybankId], dataToSubmit);
            } else {
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
                try {
                    await db.collection('piggybanks').doc(initialPiggybankId).delete();
                } catch (err) {
                    console.log('error deleting old Coindrop page');
                }
                routerPush(`/${formData.piggybankId}`);
            }
            fetch(`/${initialPiggybankId}`, { headers: { isToForceStaticRegeneration: "true" }});
            onClose();
        } catch (error) {
            setIsSubmitting(false);
            // TODO: handle errors
            throw error;
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
                                id="save-configuration-btn"
                                colorScheme="green"
                                mx={1}
                                type="submit"
                                isLoading={isSubmitting}
                                loadingText="Saving"
                                isDisabled={
                                    (
                                        !isDirty
                                        && !isAccentColorDirty // controlled accentColor field is not showing up in formState.dirtyFields
                                    )
                                    || !isPiggybankIdAvailable
                                    || !initialPiggybankId
                                }
                                onClick={() => setIsAddressTouched(true)}
                            >
                                Save
                            </Button>
                        </Flex>
                    </Flex>
                </form>
            </ModalContent>
        </Modal>
    );
};

export default EditPiggybankModal;
