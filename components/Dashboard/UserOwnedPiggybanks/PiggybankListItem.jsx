import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { Link, Box, Text, Flex, Heading, Button, useClipboard } from '@chakra-ui/core';
import { useUser } from '../../../utils/auth/useUser';
import DeleteButton from './PiggybankListItem/DeleteButton';

function PiggybankListItem({ name }) {
    const { user } = useUser();
    const link = `coindrop.to/${name}`;
    const { onCopy, hasCopied } = useClipboard(link);
    return (
        <Flex
            p={5}
            shadow="md"
            borderWidth="1px"
            mt={3}
            justify="space-between"
            wrap="wrap"
        >
            <Box>
                <Heading fontSize="xl">{name}</Heading>
            </Box>
            <Flex wrap="wrap">
                <Button
                    leftIcon={hasCopied ? "check" : "link"}
                    m={1}
                    onClick={onCopy}
                >
                    {hasCopied ? "Copied Link" : "Share"}
                </Button>
                <NextLink href={`/${name}`} passHref>
                    <Link style={{textDecoration: 'none'}}>
                        <Button
                            leftIcon="view"
                            m={1}
                            role="link"
                        >
                            View
                        </Button>
                    </Link>
                </NextLink>
                <DeleteButton
                    name={name}
                    user={user}
                />
            </Flex>
        </Flex>
    );
}
PiggybankListItem.propTypes = {
    name: PropTypes.string.isRequired,
};

export default PiggybankListItem;
