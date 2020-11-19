import { Flex, List, ListItem, Text } from "@chakra-ui/react";

const useCasesArr = [
    '🔗 Accepting donations anywhere on the web',
    '🌎 Accepting tips in the real world using a QR Code',
    '🧑‍🤝‍🧑 Settling tabs with family, friends, and co-workers',
];

const UseCasesList = () => (
    <List spacing={3} display="inline-block">
        {useCasesArr.map(text => (
            <ListItem key={text}>
                <Flex align="center">
                    <Text fontSize="1.25rem">
                        {text}
                    </Text>
                </Flex>
            </ListItem>
        ))}
    </List>
);

export default UseCasesList;
