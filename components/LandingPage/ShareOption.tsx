import { FC } from 'react';
import { useColorMode, Flex, Heading, Text } from '@chakra-ui/react';

export const ShareOption: FC<{title: string, description: string, bg: string} & { children: React.ReactNode }> = ({ bg, description, title, children }) => {
    const { colorMode } = useColorMode();
    return (
        <Flex
            direction="column"
            flex={["0 1 auto", "1 0 50%", "1 0 50%", "1 0 33.33%"]}
            align="center"
        >
            <Heading
                textAlign="center"
                as="h3"
                size="md"
                mt={[3, null]}
            >
                {title}
            </Heading>
            <Text
                textAlign="center"
                fontSize="lg"
                mb={4}
            >
                {description}
            </Text>
            <Flex
                bg={bg}
                borderRadius="50%"
                borderColor={colorMode === 'light' ? 'gray.800' : 'gray.600'}
                borderWidth="8px"
                borderStyle="solid"
                mx={[0, 4]}
                w="275px"
                h="275px"
                justify="center"
                direction="column"
            >
                <Flex justify="center" align="center" direction="column" h="150px">
                    {children}
                </Flex>
            </Flex>
        </Flex>
    );
};
