import React from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { Link as ChakraLink, Button, Flex, Icon } from '@chakra-ui/core';

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
    return (
        <Flex
            justify="space-between"
            backgroundColor="gray.100"
        >
            <LinkButton href="/dashboard" leftIcon="home">
                Dashboard
            </LinkButton>
            <LinkButton href={"/"} leftIcon="edit">
                Edit
            </LinkButton>
        </Flex>
    );
};

ManagePiggybankBar.propTypes = {

};

ManagePiggybankBar.defaultProps = {

};

export default ManagePiggybankBar;
