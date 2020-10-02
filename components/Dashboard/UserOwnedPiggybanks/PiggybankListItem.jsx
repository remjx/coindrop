import { useState } from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { Spinner, Box, Icon, PseudoBox, Flex, Heading, useTheme } from '@chakra-ui/core';

function PiggybankListItem({ id }) {
    const { colors } = useTheme();
    const [isLoading, setIsLoading] = useState();
    return (
        <PseudoBox
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
                <a>
                    <Box
                        py={5}
                        shadow="md"
                        borderWidth="1px"
                        borderRadius="10px"
                    >
                        {isLoading ? (
                            <Flex align="center" justify="center">
                                <Spinner size="32px" />
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
                                <Icon size="32px" name="chevron-right" />
                            </Flex>
                        )}
                    </Box>
                </a>
            </NextLink>
        </PseudoBox>
    );
}
PiggybankListItem.propTypes = {
    id: PropTypes.string.isRequired,
};

export default PiggybankListItem;
