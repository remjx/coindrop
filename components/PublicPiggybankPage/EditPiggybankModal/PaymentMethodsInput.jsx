import PropTypes from 'prop-types';
import {
    Accordion,
    AccordionItem,
    AccordionHeader,
    AccordionPanel,
    AccordionIcon,
    Box,
    Button,
    Flex,
    FormLabel,
    Input,
    Icon,
    Checkbox,
    Select,
    Text,
    useTheme,
} from "@chakra-ui/core";
import { useWatch } from "react-hook-form";
import { paymentMethodNames } from '../../../src/paymentMethods';
import { sortByIsPreferredThenAlphabetical } from './util';

// TODO: fix bugginess of accordion toggling. expected behavior: on payment method add, focus to address. test with a preexisting accordion item open.

const PaymentMethodsInput = ({ fieldArrayName, fields, control, register, remove, append }) => {
    const { colors } = useTheme();
    const paymentMethodsDataWatch = useWatch({
        control,
        name: fieldArrayName,
    });
    console.log('FIELDS', fields);
    console.log('DATA WATCH', paymentMethodsDataWatch);
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
                    return (
                        <AccordionItem
                            key={item.id}
                        >
                            <AccordionHeader>
                                <Flex flex="1" textAlign="left" align="center">
                                    <Flex mr={1} align="center">
                                        <Icon mr={2} name={watchedData?.paymentMethodId} />
                                        {paymentMethodNames[watchedData?.paymentMethodId] ?? 'New payment method'}
                                    </Flex>
                                    {watchedData?.isPreferred && (
                                        <Flex>
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
                                        </Flex>
                                    )}
                                </Flex>
                                <AccordionIcon />
                            </AccordionHeader>
                            <AccordionPanel pb={4}>
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
                                        {Object.entries(paymentMethodNames).map(([paymentMethodId, paymentMethodDisplayName]) => (
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
                                    <Input name={`${fieldArrayName}[${index}].address`} ref={register()} defaultValue={item.address} />
                                    <Box>
                                        <Checkbox
                                            name={`${fieldArrayName}[${index}].isPreferred`}
                                            ref={register()}
                                            defaultValue={item?.isPreferred}
                                            defaultIsChecked={item?.isPreferred}
                                            mt={1}
                                            variantColor="yellow"
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
                                            console.log('index', index);
                                            remove(index);
                                        }}
                                        leftIcon="delete"
                                        // variantColor="red"
                                        size="sm"
                                    >
                                        {'Remove '}
                                        {paymentMethodNames[watchedData?.paymentMethodId]}
                                    </Button>
                                </Flex>
                            </AccordionPanel>
                        </AccordionItem>
                    );
                })}
            </Accordion>
        )}
        <Flex
            justify="center"
            mt={2}
        >
            <Button
                onClick={() => append({})}
                leftIcon="add"
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
