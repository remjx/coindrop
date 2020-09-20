import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from '@chakra-ui/core';
import PoweredByCoindropLink from './PoweredByCoindropLink';

const Footer = (props) => {
    const { } = props;
    return (
        <Flex justify="center">
            <PoweredByCoindropLink />
        </Flex>
    );
};

Footer.propTypes = {

};

Footer.defaultProps = {

};

export default Footer;
