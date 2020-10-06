import PropTypes from 'prop-types';
import { Flex, List, ListItem, ListIcon as ChakraListIcon, Text } from "@chakra-ui/core";

const useCasesArr = [
    'Accepting donations anywhere on the web 🔗',
    'Accepting tips in the real world with the QR Code 🌎',
    'Settling tabs with family / friends / co-workers 🧑‍🤝‍🧑',
];

const UseCasesList = () => (
    <List spacing={3} display="inline-block">
        {useCasesArr.map(text => (
            <ListItem key={text}>
                <Flex align="center">
                    <ChakraListIcon mr={3} icon="check-circle" color="green.500" size="18px" />
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
