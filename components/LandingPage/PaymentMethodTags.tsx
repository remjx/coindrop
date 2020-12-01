import { FunctionComponent } from 'react';
import { paymentMethodCategories, paymentMethodNames } from '../../src/paymentMethods';
import PaymentMethodTag from './PaymentMethodTag';

type PaymentMethodTagsProps = {
    category: "app" | "digital-asset"
}

const PaymentMethodTagAndManyMore = () => (
    <PaymentMethodTag
        label="... and many more"
        color="gray"
        tagColorScheme="gray"
    />
);

const paymentMethodCategoriesArr = Object.entries(paymentMethodCategories);
export const PaymentMethodTags: FunctionComponent<PaymentMethodTagsProps> = ({ category }) => (
    <>
    {paymentMethodCategoriesArr
        .filter(([, paymentMethodCategory]) => paymentMethodCategory === category)
        .map(([paymentMethodId]) => {
            let iconSize;
            switch (paymentMethodId) {
                case 'venmo':
                    iconSize = '32px';
                    break;
                case 'bitcoinBCH':
                    iconSize = '22px';
                    break;
                default:
                    iconSize = undefined;
            }
            return (
                <PaymentMethodTag
                    key={paymentMethodId}
                    label={paymentMethodNames[paymentMethodId]}
                    iconName={paymentMethodId}
                    iconSize={iconSize}
                />
            );
        })}
    <PaymentMethodTagAndManyMore />
    </>
);
