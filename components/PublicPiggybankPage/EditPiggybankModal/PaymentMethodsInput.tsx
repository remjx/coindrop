import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
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
    Checkbox,
    Select,
    Text,
    useTheme,
} from "@chakra-ui/react";
import { useWatch } from "react-hook-form";
import { paymentMethodNames, paymentMethodIcons } from '../../../src/paymentMethods';
import { AdditionalValidation } from './AdditionalValidationContext';

// TODO: fix bugginess of accordion toggling. expected behavior: on payment method add, focus to address. test with a preexisting accordion item open.

const PaymentMethodsInput = ({ fieldArrayName, fields, control, register, remove, append }) => {
    const { colors } = useTheme();
    const paymentMethodsDataWatch = useWatch({
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
                            id={`accordion-item-${watchedData.paymentMethodId}`}
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
                                        {paymentMethodNames[watchedData?.paymentMethodId] ?? 'New payment method'}
                                    </Flex>
                                    {watchedData?.isPreferred && (
                                        <Flex>
                                            <StarIcon
                                                ml={2}
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
                                >
                                    <Select
                                        name={`${fieldArrayName}[${index}].paymentMethodId`}
                                        ref={register()}
                                        defaultValue={paymentMethodNames[item.paymentMethodId] ? item.paymentMethodId : 'default-blank'}
                                        isInvalid={containsInvalidAddress && isAddressTouched}
                                        onChange={() => setIsAddressTouched(false)}
                                    >
                                        <option hidden disabled value="default-blank">Select...</option>
                                        {Object.entries(paymentMethodNames)
                                            .sort((a, b) => {
                                                const [aId] = a;
                                                const [bId] = b;
                                                return aId < bId ? -1 : 1;
                                            })
                                            .map(([paymentMethodId, paymentMethodDisplayName]) => (
                                                <option
                                                    key={paymentMethodId}
                                                    value={paymentMethodId}
                                                    style={{display: paymentMethodsDataWatch.map(paymentMethods => paymentMethods.paymentMethodId).includes(paymentMethodId) ? "none" : undefined }}
                                                >
                                                    {paymentMethodDisplayName}
                                                </option>
                                            ))}
                                    </Select>
                                </Box>
                                <Box
                                    mx={3}
                                    display={paymentMethodNames[watchedData?.paymentMethodId] ? "block" : "none"}
                                >
                                    <FormControl isRequired>
                                        <FormLabel htmlFor={`${fieldArrayName}[${index}].address`}>Address</FormLabel>
                                        <Input
                                            id={`address-input-${watchedData.paymentMethodId}`}
                                            name={`${fieldArrayName}[${index}].address`}
                                            ref={register()}
                                            defaultValue={item.address}
                                            isInvalid={containsInvalidAddress && isAddressTouched}
                                        />
                                        <Box>
                                            <Checkbox
                                                name={`${fieldArrayName}[${index}].isPreferred`}
                                                ref={register()}
                                                defaultValue={item?.isPreferred}
                                                defaultIsChecked={item?.isPreferred}
                                                mt={1}
                                                colorScheme="yellow"
                                            >
                                                Preferred
                                            </Checkbox>
                                        </Box>
                                    </FormControl>
                                </Box>
                                <Flex
                                    justify="flex-end"
                                    mt={1}
                                >
                                    <Button
                                        onClick={() => {
                                            remove(index);
                                            setIsAddressTouched(false);
                                        }}
                                        leftIcon={<MinusIcon />}
                                        size="sm"
                                    >
                                        {'Remove '}
                                        {paymentMethodNames[watchedData?.paymentMethodId]}
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

PaymentMethodsInput.propTypes = {
    control: PropTypes.any.isRequired,
    register: PropTypes.any.isRequired,
    fields: PropTypes.arrayOf(PropTypes.object),
    remove: PropTypes.func.isRequired,
    append: PropTypes.func.isRequired,
    fieldArrayName: PropTypes.string.isRequired,
};

PaymentMethodsInput.defaultProps = {
    fields: [],
};

export default PaymentMethodsInput;
