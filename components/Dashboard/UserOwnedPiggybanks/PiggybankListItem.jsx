import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Text, Flex, Heading, Button, useClipboard } from '@chakra-ui/core';

function PiggybankListItem({ name }) {
    const link = `coindrop.to/${name}`;
    const { onCopy, hasCopied } = useClipboard(link);
    return (
        <Flex
            p={5}
            shadow="md"
            borderWidth="1px"
            mt={3}
            justify="space-between"
        >
            <Box>
                <Heading fontSize="xl">{name}</Heading>
                <Text>{link}</Text>
            </Box>
            <Flex>
                <Button leftIcon="view" mx={1}>
                    Preview
                </Button>
                <Button leftIcon="edit" mx={1}>
                    Edit
                </Button>
                <Button leftIcon={hasCopied ? "check" : "link"} mx={1} onClick={onCopy}>
                    {hasCopied ? "Copied!" : "Copy Link"}
                </Button>
                <Button leftIcon="settings" mx={1}>
                    Settings
                </Button>
            </Flex>
        </Flex>
    );
}
PiggybankListItem.propTypes = {
    name: PropTypes.string.isRequired,
};

export default PiggybankListItem;
