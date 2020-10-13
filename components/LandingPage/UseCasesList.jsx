import { Flex, List, ListItem, Text } from "@chakra-ui/core";

const useCasesArr = [
    '🔗 Accept donations anywhere on the web',
    '🌎 Accept tips in the real world using a QR Code',
    '🧑‍🤝‍🧑 Settle tabs with family, friends, and co-workers',
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
