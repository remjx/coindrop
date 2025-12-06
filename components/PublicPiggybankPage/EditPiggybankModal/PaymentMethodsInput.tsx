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
    Checkbox,
    Select,
    Text,
    useTheme,
} from "@chakra-ui/react";
import { useWatch, Control } from "react-hook-form";
import paymentMethods, { paymentMethodNames, paymentMethodIcons } from '../../../src/paymentMethods';
import { AdditionalValidation } from './AdditionalValidationContext';
import { PaymentMethodItem } from './PaymentMethodItem';

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

const PaymentMethodsInput: FC<Props> = (props) => {
    console.log('PaymentMethodsInput props', props);
    const { fieldArrayName, fields, control, register, remove, append } = props;
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
    // optgroup not compatible with Chakra dark mode: https://github.com/chakra-ui/chakra-ui/issues/2853
        // const optionsGroup = (category: Category) => {
        //     const optgroupLabels: Record<Category, string> = {
        //         "digital-wallet": 'Digital Wallets',
        //         "digital-asset": "Digital Assets",
        //         "subscription-platform": "Subscription Platforms",
        //     };
        //     return (
        //         <optgroup label={optgroupLabels[category]}>
        //             {paymentMethods
        //             .filter(paymentMethod => paymentMethod.category === category)
        //             .sort((a, b) => (a.id < b.id ? -1 : 1))
        //             .map(({ id, displayName }) => (
        //                 <option
        //                     key={id}
        //                     value={id}
        //                     style={{display: paymentMethodsDataWatch.map(paymentMethodDataWatch => paymentMethodDataWatch.paymentMethodId).includes(id) ? "none" : undefined }}
        //                 >
        //                     {displayName}
        //                 </option>
        //             ))}
        //         </optgroup>
        //     );
        // };
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
                        console.log('');
                        return (
                            <PaymentMethodItem
                                register={register}
                                fieldArrayName={fieldArrayName}
                                containsInvalidAddress={containsInvalidAddress}
                                isAddressTouched={isAddressTouched}
                                index={index}
                                item={item}
                                openAccordionItemIndex={openAccordionItemIndex}
                                paymentMethodsDataWatch={paymentMethodsDataWatch}
                                setIsAddressTouched={setIsAddressTouched}
                                setOpenAccordionItemIndex={setOpenAccordionItemIndex}
                                remove={remove}
                            />
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
