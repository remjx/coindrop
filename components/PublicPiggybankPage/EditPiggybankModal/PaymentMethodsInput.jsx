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
    FormLabel,
    Input,
    Checkbox,
    Select,
    Text,
    useTheme,
} from "@chakra-ui/react";
import { useWatch } from "react-hook-form";
import { paymentMethodNames, paymentMethodIcons } from '../../../src/paymentMethods';
import { sortByIsPreferredThenAlphabetical } from './util';

// TODO: fix bugginess of accordion toggling. expected behavior: on payment method add, focus to address. test with a preexisting accordion item open.

const PaymentMethodsInput = ({ fieldArrayName, fields, control, register, remove, append }) => {
    const { colors } = useTheme();
    const paymentMethodsDataWatch = useWatch({
        control,
        name: fieldArrayName,
    });
    return (
        <>
        {fields.length < 1
            ? 'No payment methods defined yet.'
        : (
            <Accordion
                allowToggle
                defaultIndex={-1}
            >
                {
                sortByIsPreferredThenAlphabetical(fields) // TODO: re-enable this sort
                    .map((item, index) => {
                    const watchedData = paymentMethodsDataWatch.find(watchedPaymentMethod => watchedPaymentMethod.id === item.id);
                    const PaymentMethodIcon = paymentMethodIcons[watchedData?.paymentMethodId];
                    return (
                        <AccordionItem
                            key={item.id}
                            id={`accordion-item-${watchedData.paymentMethodId}`}
                        >
                            <AccordionButton>
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
                                    >
                                        <option hidden disabled value="default-blank">Select a payment method...</option>
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
                                    <FormLabel htmlFor={`${fieldArrayName}[${index}].address`}>Address</FormLabel>
                                    <Input
                                        id={`address-input-${watchedData.paymentMethodId}`}
                                        name={`${fieldArrayName}[${index}].address`}
                                        ref={register()}
                                        defaultValue={item.address}
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
                                </Box>
                                <Flex
                                    justify="flex-end"
                                    mt={1}
                                >
                                    <Button
                                        onClick={() => {
                                            remove(index);
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
                onClick={() => append({})}
                leftIcon={<AddIcon />}
                variant="ghost"
                size="sm"
                isDisabled={fields.length > 0 && !paymentMethodNames[paymentMethodsDataWatch[paymentMethodsDataWatch.length - 1]?.paymentMethodId]}
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
