import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { Link, Box, Text, Flex, Heading, Button, useClipboard, useTheme } from '@chakra-ui/core';
import DeleteButton from './PiggybankListItem/DeleteButton';

function PiggybankListItem({ name, uid }) {
    const link = `coindrop.to/${name}`;
    const { onCopy, hasCopied } = useClipboard(link);
    return (
        <Flex
            p={5}
            shadow="md"
            borderWidth="1px"
            borderRadius="10px"
            mt={3}
            justify="space-between"
            wrap="wrap"
        >
            <Box>
                <Heading
                    fontSize="xl"
                >
                    {name}
                </Heading>
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
                    uid={uid}
                />
            </Flex>
        </Flex>
    );
}
PiggybankListItem.propTypes = {
    name: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
};

PiggybankListItem.defaultProps = {
};

export default PiggybankListItem;
