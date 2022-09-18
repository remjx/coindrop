import { NextPage } from 'next';
import { useColorMode } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import LandingPage from '../components/LandingPage/LandingPage';
import { ShareOptionsDefault } from '../components/LandingPage/ShareOptions';

const Home: NextPage = () => {
    const { colorMode } = useColorMode();
    return (
        <>
            <NextSeo
                title="Coindrop - Accept payments and donations 100% Free with Zero Fees"
                description="Create your page. Let the sender choose how to pay you. Supports all payment apps and cryptocurrencies."
            />
            <LandingPage
                headingTextPrimaryPreUnderline="Your landing page for "
                headingTextPrimaryUnderline="zero-fee"
                headingTextPrimaryPostUnderline=" donations and tips"
                headingTextSecondary="List all your payment apps. Let the sender choose how to pay you."
                headingTextTertiary=""
                smartphoneMockupImagePublicPath={`/landing-page/smartphone-mockup-${colorMode}.png`}
                showSubscriptionPlatforms
                ShareOptions={ShareOptionsDefault}
                shareOptionsHeading="Share &amp; Get Paid"
                advertiseOpenSource
                getStartedText="Coindrops are 100% free and only take ~2 minutes to set up."
                smartphoneMockupImageWidth={305}
                smartphoneMockupImageHeight={606}
                logoSubtitle={null}
            />
        </>
    );
};

export default Home;
