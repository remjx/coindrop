import { FunctionComponent } from 'react';
import Image from 'next/image';
import { Icon, Heading, Button, Center } from '@chakra-ui/react';
import { CgShoppingCart } from 'react-icons/cg';
import tipCardPng from '../../../../public/shop/tip-card.png';

const TipCards: FunctionComponent = () => (
    <>
        <Heading
            as="h2"
            size="lg"
            mt={4}
        >
            Physical Cards
        </Heading>
        <Center mt={4}>
            <Image src={tipCardPng} height={225} width={225} alt="Tip Card example" />
        </Center>
        <Center>
            <a href="/shop">
                <Button
                    mt={4}
                    leftIcon={<Icon as={CgShoppingCart} />}
                    colorScheme="green"
                >
                    Buy Now
                </Button>
            </a>
        </Center>
    </>
);

export default TipCards;
