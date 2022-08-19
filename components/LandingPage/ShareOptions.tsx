import { FC } from 'react';
import Image from 'next/image';
import { Center, Flex, Button, Text, Box, Link, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { QRCodeExample } from './QRCodeExample';
import { ShareOption } from './ShareOption';
import tipCardPng from '../../public/shop/tip-card.png';
import tipCardRestaurantPng from '../../public/landing-page/tip-card-generic-restaurant.png';

export const ShareOptionsDefault: FC = () => {
    const { colorMode } = useColorMode();
    const yellow = useColorModeValue("yellow.400", "yellow.300");
    return (
        <Flex
            direction={["column", "row"]}
            wrap="wrap"
        >
            <ShareOption
                title="URL"
                description="For anywhere"
                bg={colorMode === 'light' ? 'logoPrimary' : 'orange.300'}
            >
                <b>
                    <Text
                        fontSize="lg"
                        color={colorMode === 'light' ? 'gray.800' : 'white'}
                    >
                        coindrop.to/your-name
                    </Text>
                </b>
            </ShareOption>
            <ShareOption
                title="Button"
                description="For your website"
                bg={colorMode === 'light' ? 'green.400' : 'green.300'}
            >
                <>
                <Box w="228px" h="57px">
                    <Link href="https://coindrop.to/satoshi-nakamoto" isExternal>
                        <img src="/embed-button.png" style={{borderRadius: "10px", height: "57px", width: "229px"}} alt="Coindrop.to me" />
                    </Link>
                </Box>
                </>
            </ShareOption>
            <ShareOption
                title="QR Code"
                description="For smartphone camera scanning"
                bg={yellow}
            >
                <QRCodeExample />
            </ShareOption>
            <ShareOption
                title="Tip Cards"
                description="For the real world"
                bg='#BBCBCB'
            >
                <Image src={tipCardPng} alt="Tip Card example" height="150px" width="150px" />
            </ShareOption>
        </Flex>
    );
};

export const ShareOptionsForRestaurants: FC = () => (
    <Center>
        <Box mt={6}>
            <Image src={tipCardRestaurantPng} height="350px" width="350px" />
            <Text mt={2} mb={2} textAlign="center">
                Text and design can be customized
            </Text>
            <Text mt={2} mb={3} textAlign="center">
                Starting at $19 for 500 cards
            </Text>
            <Center>
                <a
                    href="/shop"
                >
                    <Button>
                        Order Now
                    </Button>
                </a>
            </Center>
        </Box>
    </Center>
);
