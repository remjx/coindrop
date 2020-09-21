import React from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { Link as ChakraLink, Button, Flex, Icon, useDisclosure } from '@chakra-ui/core';
import EditPiggybankModal from '../EditPiggybankModal/EditPiggybankModal';

const LinkButton = ({ href, children, ...rest }) => (
    <NextLink href={href} passHref>
        <ChakraLink style={{textDecoration: "none"}}>
            <Button {...rest}>
                {children}
            </Button>
        </ChakraLink>
    </NextLink>
);

const ManagePiggybankBar = (props) => {
    const { } = props;
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
                leftIcon="edit"
                onClick={onEditOpen}
            >
                Edit
            </Button>
        </Flex>
        </>
    );
};

ManagePiggybankBar.propTypes = {

};

ManagePiggybankBar.defaultProps = {

};

export default ManagePiggybankBar;
