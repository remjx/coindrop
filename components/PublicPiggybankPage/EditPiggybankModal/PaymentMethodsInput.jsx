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

// TODO: fix bugginess of accordion toggling. expected behavior: on payment method add, focus to address. test with a preexisting accordion item open.

const PaymentMethodsInput = ({ fields, control, register, remove, append }) => {
    const { colors } = useTheme();
    const addressDataWatch = useWatch({
        control,
        name: 'addressData',
    });
    if (fields.length < 1) return 'No payment methods defined yet.';
    return (
        <>
        <Accordion
            allowToggle
            defaultIndex={-1}
        >
            {fields
                .map((item, index) => {
                const watchedData = addressDataWatch.find(element => element.id === item.id);
                return (
                    <AccordionItem
                        key={item.id}
                    >
                        <AccordionHeader>
                            <Flex flex="1" textAlign="left" align="center">
                                <Flex mr={1}>
                                    <Icon mr={2} name={watchedData?.value} />
                                    {paymentMethodNames[watchedData?.value] ?? 'New payment method'}
                                </Flex>
                                {(watchedData?.isPreferred) && (
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
                                name={`addressData[${index}].id`}
                                defaultValue={item.id}
                                style={{display: 'none'}}
                            />
                            <Box display={paymentMethodNames[watchedData?.value] ? "none" : "block"}>
                                <Select
                                    name={`addressData[${index}].value`}
                                    ref={register()}
                                    defaultValue={paymentMethodNames[item.value] ? item.value : 'default-blank'}
                                >
                                    <option hidden disabled value="default-blank">Select a payment method</option>
                                    {Object.entries(paymentMethodNames).map(([paymentMethodId, paymentMethodName]) => (
                                        <option
                                            key={paymentMethodId}
                                            value={paymentMethodId}
                                            style={{display: addressDataWatch.map(addressData => addressData.value).includes(paymentMethodId) ? "none" : undefined }}
                                        >
                                            {paymentMethodName}
                                        </option>
                                    ))}
                                </Select>
                            </Box>
                            <Box
                                mx={3}
                                display={paymentMethodNames[watchedData?.value] ? "block" : "none"}
                            >
                                <FormLabel htmlFor={`addressData[${index}].address`}>Address</FormLabel>
                                <Input name={`addressData[${index}].address`} ref={register()} defaultValue={item.address} />
                                <Box
                                    textAlign="center"
                                >
                                    <Checkbox
                                        name={`addressData[${index}].isPreferred`}
                                        ref={register()}
                                        defaultValue={`${watchedData?.isPreferred === 'true'}`}
                                        defaultIsChecked={watchedData?.isPreferred}
                                        mt={1}
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
                                    {paymentMethodNames[watchedData?.value]}
                                </Button>
                            </Flex>
                        </AccordionPanel>
                    </AccordionItem>
                );
            })}
        </Accordion>
        <Flex
            justify="center"
            mt={2}
        >
            <Button
                onClick={() => append({ value: "", address: "", isPreferred: false })}
                leftIcon="add"
                variant="ghost"
                size="sm"
                isDisabled={!paymentMethodNames[addressDataWatch[addressDataWatch.length - 1].value]}
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
};

PaymentMethodsInput.defaultProps = {
    fields: [],
};

export default PaymentMethodsInput;
