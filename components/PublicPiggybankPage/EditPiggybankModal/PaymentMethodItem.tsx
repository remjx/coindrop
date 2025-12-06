import { MinusIcon, StarIcon, QuestionOutlineIcon } from "@chakra-ui/icons";
import {
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
import { paymentMethodIcons, paymentMethodNames } from "paymentMethods";
import { FC, useState } from "react";
import { PaymentMethod } from "./PaymentMethodsInput";

type PaymentMethodItemProps = {
    item: any;
    setIsAddressTouched: any;
    openAccordionItemIndex: number;
    index: number;
    paymentMethodsDataWatch: PaymentMethod[];
    setOpenAccordionItemIndex: any;
    register: any;
    fieldArrayName: string;
    containsInvalidAddress: boolean;
    isAddressTouched: boolean;
    remove: (index: number) => void
}

export const PaymentMethodItem: FC<PaymentMethodItemProps> = (props) => {
    const { item, remove, setIsAddressTouched, openAccordionItemIndex, index, paymentMethodsDataWatch, setOpenAccordionItemIndex, register, fieldArrayName, containsInvalidAddress, isAddressTouched } = props;
    const watchedData = paymentMethodsDataWatch.find(watchedPaymentMethod => watchedPaymentMethod.id === item.id);
    const PaymentMethodIcon = paymentMethodIcons[watchedData?.paymentMethodId]; // TODO: or use custom svg
    const [isCustomPaymentMethod, setIsCustomPaymentMethod] = useState(false);
    const { colors } = useTheme();
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
            <AccordionPanel pb={4} id={`accordion-panel-${watchedData.paymentMethodId ?? item.id}`}>
                <input
                    ref={register()}
                    name={`${fieldArrayName}[${index}].id`}
                    defaultValue={item.id}
                    style={{display: 'none'}}
                />
                    {isCustomPaymentMethod ? (
                        null
                    ) : (
                        <Box
                            data-cy={`select-payment-method-container-${watchedData.paymentMethodId ?? item.id}`}
                        >
                            <Select
                                name={`${fieldArrayName}[${index}].paymentMethodId`}
                                ref={register()}
                                defaultValue={paymentMethodNames[item.paymentMethodId] ? item.paymentMethodId : 'default-blank'}
                                isInvalid={containsInvalidAddress && isAddressTouched}
                                onChange={() => setIsAddressTouched(false)}
                            >
                                <option hidden disabled value="default-blank">Select...</option>
                                {/* optgroup not compatible with Chakra dark mode: https://github.com/chakra-ui/chakra-ui/issues/2853 */}
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
                                            style={{display: paymentMethodsDataWatch.map(paymentMethod => paymentMethod.paymentMethodId).includes(paymentMethodId) ? "none" : undefined }}
                                        >
                                            {paymentMethodDisplayName}
                                        </option>
                                    ))}
                            </Select>
                        </Box>

                    )}
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
                        <Button onClick={() => setIsCustomPaymentMethod(true)}>
                            Add custom payment method
                        </Button>
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
};
