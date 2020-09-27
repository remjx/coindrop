import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { Link, Box, Flex, Heading, Button, useTheme } from '@chakra-ui/core';
import DeleteButton from './PiggybankListItem/DeleteButton';
import CopyLinkShareButton from '../../Buttons/CopyLinkShareButton';

function PiggybankListItem({ id, uid }) {
    const { colors } = useTheme();
    const publicUrl = `coindrop.to/${id}`;
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
                <Heading fontSize="xl">
                    <span style={{color: colors.gray['400']}}>coindrop.to/</span>
                    {id}
                </Heading>
            </Flex>
            <Flex wrap="wrap">
                <Box
                    m={1}
                >
                    <CopyLinkShareButton textToCopy={publicUrl} />
                </Box>
                <Box
                    m={1}
                >
                    <NextLink href={`/${id}`} passHref>
                        <Link style={{textDecoration: 'none'}}>
                            <Button
                                leftIcon="settings"
                                role="link"
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
    uid: PropTypes.string.isRequired,
};

export default PiggybankListItem;
