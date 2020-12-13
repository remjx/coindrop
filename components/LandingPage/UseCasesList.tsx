import { Flex, List, ListItem, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { QRCodeIcon } from '../Icons/CustomIcons';

const UseCasesText: FunctionComponent = ({ children }) => (
    <Text
        fontSize="1.25rem"
        textAlign="center"
    >
        {children}
    </Text>
);

const UseCasesListItem: FunctionComponent = ({ children }) => (
    <ListItem>
        <Flex justify="center">
            <UseCasesText>
                {children}
            </UseCasesText>
        </Flex>
    </ListItem>
);

const UseCasesList: FunctionComponent = () => (
    <List spacing={2}>
        <UseCasesListItem>
            ✔️ Accept donations from anywhere with your Coindrop link
        </UseCasesListItem>
        <UseCasesListItem>
            ✔️ Accept tips from smartphone cameras with your Coindrop QR Code
            <QRCodeIcon ml={2} />
        </UseCasesListItem>
        <UseCasesListItem>
            ✔️ Open-source
        </UseCasesListItem>
    </List>
);

export default UseCasesList;
