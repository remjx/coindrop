import { useState } from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { Link, Box, Flex, Heading, Button, useTheme } from '@chakra-ui/core';
import CopyLinkShareButton from '../../Buttons/CopyLinkShareButton';

function PiggybankListItem({ id }) {
    const { colors } = useTheme();
    const publicUrl = `coindrop.to/${id}`;
    const [isLoading, setIsLoading] = useState();
    return (
        <Flex
            p={5}
            shadow="md"
            borderWidth="1px"
            borderRadius="10px"
            mt={3}
            justify="space-between"
            wrap="wrap"
            align="center"
        >
            <Flex
                align="center"
            >
                <NextLink href={`/${id}`} passHref>
                    <Link style={{textDecorationColor: colors.orange['500']}}>
                        <Heading fontSize="xl">
                            coindrop.to/
                            {id}
                        </Heading>
                    </Link>
                </NextLink>
            </Flex>
            <Flex wrap="wrap">
                <Box
                    m={1}
                >
                    <CopyLinkShareButton textToCopy={publicUrl} />
                </Box>
                <Box
                    m={1}
                    onClick={() => setIsLoading(true)}
                >
                    <NextLink href={`/${id}`} passHref>
                        <Link style={{textDecoration: 'none'}}>
                            <Button
                                leftIcon="settings"
                                role="link"
                                isLoading={isLoading}
                                loadingText="Loading"
                            >
                                Manage
                            </Button>
                        </Link>
                    </NextLink>
                </Box>
            </Flex>
        </Flex>
    );
}
PiggybankListItem.propTypes = {
    id: PropTypes.string.isRequired,
};

export default PiggybankListItem;
