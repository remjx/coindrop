import { FunctionComponent } from 'react';
import { paymentMethods, Category } from '../../src/paymentMethods';
import PaymentMethodTag from './PaymentMethodTag';

const paymentMethodsForLandingPage = paymentMethods
    .filter(paymentMethod => paymentMethod.displayOnLandingPage === true);

type PaymentMethodTagsProps = {
    category: Category
}

const PaymentMethodTagAndManyMore = () => (
    <PaymentMethodTag
        label="... and many more"
        color="gray"
        tagColorScheme="gray"
    />
);

export const PaymentMethodTags: FunctionComponent<PaymentMethodTagsProps> = ({ category }) => (
    <>
    {paymentMethodsForLandingPage
        .filter(paymentMethod => paymentMethod.category === category)
        .map(paymentMethod => {
            let iconSize;
            switch (paymentMethod.id) {
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
                    key={paymentMethod.id}
                    label={paymentMethod.displayName}
                    iconName={paymentMethod.id}
                    iconSize={iconSize}
                />
            );
        })}
    <PaymentMethodTagAndManyMore />
    </>
);
