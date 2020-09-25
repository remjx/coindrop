import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { Link, Box, Flex, Heading, Button, useClipboard } from '@chakra-ui/core';
import DeleteButton from './PiggybankListItem/DeleteButton';

function PiggybankListItem({ id, uid }) {
    const publicUrl = `coindrop.to/${id}`;
    const { onCopy, hasCopied } = useClipboard(publicUrl);
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
                <Heading fontSize="xl">{id}</Heading>
            </Box>
            <Flex wrap="wrap">
                <Button
                    leftIcon={hasCopied ? "check" : "link"}
                    m={1}
                    onClick={onCopy}
                >
                    {hasCopied ? "Copied Link" : "Share"}
                </Button>
                <NextLink href={`/${id}`} passHref>
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
                    id={id}
                    uid={uid}
                />
            </Flex>
        </Flex>
    );
}
PiggybankListItem.propTypes = {
    id: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
};

export default PiggybankListItem;
