import { useState } from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { Spinner, Box, Link, PseudoBox, Flex, Heading, useTheme } from '@chakra-ui/core';

function PiggybankListItem({ id }) {
    const { colors } = useTheme();
    const [isLoading, setIsLoading] = useState();
    return (
        <PseudoBox
            onClick={() => setIsLoading(true)}
            cursor="pointer"
            mt={3}
            bg={isLoading ? colors.gray['200'] : undefined}
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
                        textAlign="center"
                    >
                        <Heading fontSize="xl">
                            {isLoading
                            ? (
                                <Flex align="center" justify="center">
                                    <Spinner />
                                    <Box ml={2}>
                                        Loading
                                    </Box>
                                </Flex>
                            ) : (
                                `coindrop.to/${id}`
                                )}
                        </Heading>
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
