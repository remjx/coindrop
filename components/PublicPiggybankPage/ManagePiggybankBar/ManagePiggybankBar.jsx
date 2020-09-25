import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { Link as ChakraLink, Button, Flex, useDisclosure } from '@chakra-ui/core';
import EditPiggybankModal from '../EditPiggybankModal/EditPiggybankModal';

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
    return (
        <>
        <EditPiggybankModal
            isOpen={isEditOpen}
            onClose={onEditClose}
        />
        <Flex
            justify="space-around"
            mt={2}
        >
            <LinkButton href="/dashboard" leftIcon="arrow-back">
                Dashboard
            </LinkButton>
            <Button
                leftIcon={editButtonOptions.iconName}
                onClick={onEditOpen}
                variantColor={editButtonOptions.color}
            >
                {editButtonOptions.text}
            </Button>
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
