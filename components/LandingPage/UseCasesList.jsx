import React from 'react';
import PropTypes from 'prop-types';
import { Flex, List, ListItem, ListIcon as ChakraListIcon, Text } from "@chakra-ui/core";

const useCasesArr = [
    'Accept donations on your website & social media pages',
    'Share with people who owe you money',
    'Accept tips in the real world (display link to the digital tip jar)',
];

const UseCasesList = () => (
    <List spacing={3} display="inline-block">
        {useCasesArr.map(text => (
            <ListItem>
                <Flex align="center">
                    <ChakraListIcon icon="check-circle" color="green.500" size="18px" />
                    <Text fontSize="1.25rem">
                        {text}
                    </Text>
                </Flex>
            </ListItem>
        ))}
    </List>
);

UseCasesList.propTypes = {

};

UseCasesList.defaultProps = {

};

export default UseCasesList;
