import { NextPage } from 'next';
import { useColorMode } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import LandingPage from '../../components/LandingPage/LandingPage';
import { ShareOptionsForRestaurants } from '../../components/LandingPage/ShareOptions';

const LandingPageForRestaurants: NextPage = () => {
    const { colorMode } = useColorMode();
    return (
        <>
            <NextSeo
                title="Accept tips on take-out orders | Coindrop"
                description="Print tip cards and include them in the to-go box"
            />
            <LandingPage
                headingTextPrimaryPreUnderline="The "
                headingTextPrimaryUnderline="best"
                headingTextPrimaryPostUnderline=" way to accept tips on carry-out &amp; delivery orders"
                headingTextSecondary="Include tip cards in to-go and delivery boxes. Let customers tip you when their expectations are exceeded."
                headingTextTertiary="Web app is free to use. Tip Cards start at $19 for 500."
                smartphoneMockupImagePublicPath={`/landing-page/smartphone-mockup-${colorMode}-for-restaurants.png`}
                showSubscriptionPlatforms={false}
                shareOptionsHeading="Include tip cards in your to-go boxes"
                shareOptions={ShareOptionsForRestaurants}
                advertiseOpenSource={false}
                getStartedText="Coindrop is 100% free to sign up and use."
                smartphoneMockupImageWidth={800}
                smartphoneMockupImageHeight={606}
            />
        </>
    );
};

export default LandingPageForRestaurants;
