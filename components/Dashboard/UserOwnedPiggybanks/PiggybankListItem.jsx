import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Text, Flex, Heading, Button, useClipboard } from '@chakra-ui/core';
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
                    variantColor={hasCopied ? "green" : undefined}
                >
                    {hasCopied ? "Copied" : "Copy Link"}
                </Button>
                <Button leftIcon="view" m={1}>
                    View / Edit
                </Button>
                {/* <Button leftIcon="settings" m={1}>
                    Settings
                </Button> */}
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
