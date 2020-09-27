import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Box, Link as ChakraLink, Button, Flex, useDisclosure } from '@chakra-ui/core';
import EditPiggybankModal from '../EditPiggybankModal/EditPiggybankModal';
import CopyLinkShareButton from '../../Buttons/CopyLinkShareButton';

/* eslint-disable react/jsx-props-no-spreading */
const LinkButton = ({ href, children, ...rest }) => (
    <NextLink href={href} passHref>
        <ChakraLink style={{textDecoration: "none"}}>
            <Button {...rest}>
                {children}
            </Button>
        </ChakraLink>
    </NextLink>
);
LinkButton.propTypes = {
    href: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired,
};
/* eslint-enable react/jsx-props-no-spreading */

const ManagePiggybankBar = ({ editButtonOptions }) => {
    const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
    const { query: { piggybankName }} = useRouter();
    return (
        <>
        {isEditOpen && ( // this conditional is needed to force remount of form so latest values are used
            <EditPiggybankModal
                isOpen={isEditOpen}
                onClose={onEditClose}
            />
        )}
        <Flex
            justify="space-around"
            mt={2}
            wrap="wrap"
        >
            <Box mt={2}>
                <LinkButton
                    href="/dashboard"
                    leftIcon="arrow-back"
                >
                    Dashboard
                </LinkButton>
            </Box>
            <Box mt={2}>
                <CopyLinkShareButton textToCopy={`coindrop.to/${piggybankName}`} />
            </Box>
            <Box mt={2}>
                <Button
                    leftIcon={editButtonOptions.iconName}
                    onClick={onEditOpen}
                    variantColor={editButtonOptions.color}
                >
                    {editButtonOptions.text}
                </Button>
            </Box>
        </Flex>
        </>
    );
};

ManagePiggybankBar.propTypes = {
    editButtonOptions: PropTypes.shape({
        text: PropTypes.string.isRequired,
        color: PropTypes.string,
        iconName: PropTypes.string.isRequired,
    }),
};

ManagePiggybankBar.defaultProps = {
    editButtonOptions: {
        text: 'Configure',
        color: undefined,
        iconName: "settings",
    },
};

export default ManagePiggybankBar;
