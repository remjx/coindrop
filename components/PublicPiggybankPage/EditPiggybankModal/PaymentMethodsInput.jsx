/* <Text>{item.id}</Text>
<Input key={item.id} name={`addressData[${index}].address`} ref={register()} defaultValue={item.address} />
<Button
    onClick={() => {
        console.log('index', index);
        remove(index);
    }}
    leftIcon="delete"
    variantColor="red"
    size="sm"
>
    Remove
</Button>
</> */

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

const PaymentMethodsInput = ({ fields, control, register, remove }) => {
    const { colors } = useTheme();
    const addressDataWatch = useWatch({
        control,
        name: 'addressData',
    });
    console.log('FIELDS', fields);
    console.log('ADDRESS DATA', addressDataWatch)
    if (fields.length < 1) return 'No payment methods definet yet.';
    return (
        <Accordion
            allowToggle
            // defaultIndex={!paymentMethodNames[addressDataWatch[addressDataWatch.length - 1]] ? addressDataWatch.length - 1 : -1}
        >
            {fields.map((item, index) => {
                console.log();
                const watchedData = addressDataWatch.find(element => element.id === item.id);
                console.log('watchedData', watchedData);
                return (
                    <AccordionItem
                        key={item.id}
                    >
                        <AccordionHeader>
                            <Flex flex="1" textAlign="left" align="center">
                                <Icon mr={2} name={watchedData?.value} />
                                {paymentMethodNames[watchedData?.value] ?? 'New payment method'}
                                {(watchedData?.isPreferred) && (
                                    <>
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
                                    </>
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
                                        >
                                            {paymentMethodName}
                                        </option>
                                    ))}
                                </Select>
                            </Box>
                            <Box mx={3}>
                                <FormLabel htmlFor={`addressData[${index}].address`}>Address</FormLabel>
                                <Input name={`addressData[${index}].address`} ref={register()} defaultValue={item.address} />
                                <Box
                                    textAlign="center"
                                >
                                    <Checkbox
                                        name={`addressData[${index}].isPreferred`}
                                        ref={register()}
                                        defaultValue={item.isPreferred === 'true'}
                                        mt={1}
                                    >
                                        Preferred
                                    </Checkbox>
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
                                        variantColor="red"
                                        size="sm"
                                    >
                                        Remove
                                    </Button>
                                </Flex>
                            </Box>
                        </AccordionPanel>
                    </AccordionItem>
                );
            })}
        </Accordion>
    );
};

PaymentMethodsInput.propTypes = {
    control: PropTypes.any.isRequired,
    register: PropTypes.any.isRequired,
    fields: PropTypes.arrayOf(PropTypes.object),
    remove: PropTypes.func.isRequired,
};

PaymentMethodsInput.defaultProps = {
    fields: [],
};

export default PaymentMethodsInput;
