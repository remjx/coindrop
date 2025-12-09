import { useState, useEffect, useContext, FC } from 'react';
import { AddIcon, MinusIcon, StarIcon, QuestionOutlineIcon } from "@chakra-ui/icons";
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Link,
    Checkbox,
    Select,
    Text,
    useTheme,
} from "@chakra-ui/react";
import { useWatch, Control } from "react-hook-form";
import paymentMethods, { paymentMethodNames, paymentMethodIcons, Category } from '../../../src/paymentMethods';
// TODO: dynamically import icons to decrease load
import { AdditionalValidation } from './AdditionalValidationContext';
import { githubAddPaymentMethodRequest } from '../../../src/settings';

// TODO: fix bugginess of accordion toggling. expected behavior: on payment method add, focus to address. test with a preexisting accordion item open.

export type PaymentMethod = {
    address: string
    id: string
    isPreferred: boolean
    paymentMethodId: string
}

type Props = {
    control: Control
    register: any
    fields: any
    remove: (index: number) => void
    append: (data: Record<string, unknown>) => void
    fieldArrayName: string,
};

const PaymentMethodsInput: FC<Props> = ({ fieldArrayName, fields, control, register, remove, append }) => {
    const { colors } = useTheme();
    const paymentMethodsDataWatch: PaymentMethod[] = useWatch({
        control,
        name: fieldArrayName,
    });
    const [openAccordionItemIndex, setOpenAccordionItemIndex] = useState(-1);
    useEffect(() => {
        if (
            paymentMethodsDataWatch[paymentMethodsDataWatch.length - 1]?.paymentMethodId === "default-blank"
            || paymentMethodsDataWatch[paymentMethodsDataWatch.length - 1]?.address === ""
        ) {
            setOpenAccordionItemIndex(paymentMethodsDataWatch.length - 1);
        }
    }, [paymentMethodsDataWatch]);
    const containsInvalidAddress = paymentMethodsDataWatch.some(paymentMethod => !paymentMethod.address);
    const { isAddressTouched, setIsAddressTouched } = useContext(AdditionalValidation);
    const OptionsGroup = ({ category }: { category: Category }) => {
        const optgroupLabels: Record<Category, string> = {
            "digital-wallet": 'Wallets',
            "digital-asset": "Cryptocurrencies",
            "subscription-platform": "Platforms",
        };
        return (
            <optgroup label={optgroupLabels[category]}>
                {paymentMethods
                .filter(paymentMethod => paymentMethod.category === category)
                .sort((a, b) => (a.id < b.id ? -1 : 1))
                .map(({ id, displayName }) => (
                    <option
                        key={id}
                        value={id}
                        style={{display: paymentMethodsDataWatch.map(paymentMethodDataWatch => paymentMethodDataWatch.paymentMethodId).includes(id) ? "none" : undefined }}
                    >
                        {displayName}
                    </option>
                ))}
            </optgroup>
        );
    };
    return (
        <>
        {fields.length < 1
            ? 'No payment methods defined yet.'
        : (
            <Accordion
                allowToggle
                defaultIndex={-1}
                index={openAccordionItemIndex}
            >
                {
                fields
                    .map((item, index) => {
                    const watchedData = paymentMethodsDataWatch.find(watchedPaymentMethod => watchedPaymentMethod.id === item.id);
                    const PaymentMethodIcon = paymentMethodIcons[watchedData?.paymentMethodId];
                    return (
                        <AccordionItem
                            key={item.id}
                        >
                            <AccordionButton
                                onClick={() => {
                                    setIsAddressTouched(true);
                                    if (openAccordionItemIndex !== index && !paymentMethodsDataWatch.find(paymentMethod => paymentMethod.address === "")) {
                                        setOpenAccordionItemIndex(index);
                                    } else {
                                        setOpenAccordionItemIndex(undefined);
                                    }
                                }}
                            >
                                <Flex flex="1" textAlign="left" align="center">
                                    <Flex mr={1} align="center">
                                        {PaymentMethodIcon ? <PaymentMethodIcon mr={2} /> : <QuestionOutlineIcon mr={2} />}
                                        {paymentMethodNames[watchedData?.paymentMethodId] ?? 'Add payment method'}
                                    </Flex>
                                    {watchedData?.isPreferred && (
                                        <Flex>
                                            <StarIcon
                                                ml={2}
                                                boxSize="16px"
                                                color={colors.yellow['400']}
                                            />
                                            <Text
                                                as="span"
                                                fontSize="xs"
                                                ml={1}
                                            >
                                                <i>Preferred</i>
                                            </Text>
                                        </Flex>
                                    )}
                                </Flex>
                                <AccordionIcon />
                            </AccordionButton>
                            <AccordionPanel pb={4} id={`accordion-panel-${watchedData.paymentMethodId}`}>
                                <input
                                    ref={register()}
                                    name={`${fieldArrayName}[${index}].id`}
                                    defaultValue={item.id}
                                    style={{display: 'none'}}
                                />
                                <Box
                                    display={paymentMethodNames[watchedData?.paymentMethodId] ? "none" : "block"}
                                    data-cy={`select-payment-method-container-${watchedData.paymentMethodId}`}
                                >
                                    <Select
                                        name={`${fieldArrayName}[${index}].paymentMethodId`}
                                        ref={register()}
                                        defaultValue={paymentMethodNames[item.paymentMethodId] ? item.paymentMethodId : 'default-blank'}
                                        isInvalid={containsInvalidAddress && isAddressTouched}
                                        onChange={() => setIsAddressTouched(false)}
                                    >
                                        <option hidden disabled value="default-blank">Select...</option>
                                        <OptionsGroup category="digital-asset" />
                                        <OptionsGroup category="digital-wallet" />
                                        <OptionsGroup category="subscription-platform" />
                                    </Select>
                                </Box>
                                <Box
                                    mx={3}
                                    display={paymentMethodNames[watchedData?.paymentMethodId] ? "block" : "none"}
                                >
                                    <FormControl>
                                        <FormLabel htmlFor={`${fieldArrayName}[${index}].address`}>Address</FormLabel>
                                        <Input
                                            id={`address-input-${watchedData.paymentMethodId}`}
                                            name={`${fieldArrayName}[${index}].address`}
                                            ref={register()}
                                            defaultValue={item.address}
                                            isInvalid={containsInvalidAddress && isAddressTouched}
                                            isRequired
                                        />
                                        <Box>
                                            <Checkbox
                                                name={`${fieldArrayName}[${index}].isPreferred`}
                                                ref={register()}
                                                defaultValue={item?.isPreferred ? 1 : 0}
                                                defaultChecked={item?.isPreferred}
                                                mt={1}
                                                colorScheme="yellow"
                                            >
                                                Preferred
                                            </Checkbox>
                                        </Box>
                                    </FormControl>
                                </Box>
                                <Flex
                                    justify={watchedData?.paymentMethodId === 'default-blank' ? 'space-between' : 'flex-end'}
                                    mt={3}
                                    wrap="wrap"
                                    align="center"
                                >
                                    {watchedData?.paymentMethodId === 'default-blank' && (
                                        <Text fontSize="xs" ml={1}>
                                            <Link href="/blog/custom-payment-methods" isExternal>
                                                Payment method not listed?
                                            </Link>
                                        </Text>
                                    )}
                                    <Button
                                        onClick={() => {
                                            remove(index);
                                            setIsAddressTouched(false);
                                        }}
                                        leftIcon={<MinusIcon />}
                                        size="sm"
                                    >
                                        {'Remove '}
                                        {/* {paymentMethodNames[watchedData?.paymentMethodId]} */}
                                    </Button>
                                </Flex>
                            </AccordionPanel>
                        </AccordionItem>
                    );
                })
}
            </Accordion>
        )}
        <Flex
            justify="center"
            mt={2}
        >
            <Button
                id="add-payment-method-button"
                onClick={() => {
                    append({});
                    setIsAddressTouched(false);
                }}
                leftIcon={<AddIcon />}
                variant="ghost"
                size="sm"
                isDisabled={
                    (
                        fields.length > 0
                        && !paymentMethodNames[paymentMethodsDataWatch[paymentMethodsDataWatch.length - 1]?.paymentMethodId]
                    )
                    || containsInvalidAddress
                }
            >
                Add payment method
            </Button>
        </Flex>
        </>
    );
};

export default PaymentMethodsInput;
