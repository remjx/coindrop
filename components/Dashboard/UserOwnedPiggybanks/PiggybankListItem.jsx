import { useState } from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { Spinner, Box, Flex, Heading, useTheme } from '@chakra-ui/react';
import { ChevronRightIcon } from "@chakra-ui/icons";

function PiggybankListItem({ id }) {
    const { colors } = useTheme();
    const [isLoading, setIsLoading] = useState();
    return (
        <Box
            onClick={() => setIsLoading(true)}
            cursor="pointer"
            mt={3}
            bg={isLoading ? colors.gray['100'] : undefined}
            _hover={{
                bg: colors.gray['100'],
                textDecoration: "none",
            }}
            _active={{
                bg: colors.gray['200'],
            }}
        >
            <NextLink href={`/${id}`} passHref>
                <a id={`link-to-coindrop-${id}`}>
                    <Box
                        py={5}
                        shadow="md"
                        borderWidth="1px"
                        borderRadius="10px"
                    >
                        {isLoading ? (
                            <Flex align="center" justify="center">
                                <Spinner boxSize="32px" />
                                <Heading ml={2} fontSize="xl">
                                    Loading
                                </Heading>
                            </Flex>
                        ) : (
                            <Flex
                                justify="space-between"
                                align="center"
                                mx={4}
                            >
                                <Heading fontSize="xl" wordBreak="break-word">
                                    coindrop.to/
                                    {id}
                                </Heading>
                                <ChevronRightIcon boxSize="32px" />
                            </Flex>
                        )}
                    </Box>
                </a>
            </NextLink>
        </Box>
    );
}
PiggybankListItem.propTypes = {
    id: PropTypes.string.isRequired,
};

export default PiggybankListItem;
