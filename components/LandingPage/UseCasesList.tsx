import { Flex, List, ListItem, Text as ChakraText } from "@chakra-ui/react";
import { FunctionComponent, ReactElement } from "react";
import { QRCodeIcon } from '../Icons/CustomIcons';

const Text: FunctionComponent = ({ children }) => (
    <ChakraText
        fontSize="1.25rem"
    >
        {children}
    </ChakraText>
);

type UseCase = {
    id: string
    value: ReactElement
}

const useCasesArr: UseCase[] = [
    {
        id: "1",
        value: (
            <Text>
                {'✔️ Accept donations from anywhere with your link '}
            </Text>
        ),
    },
    {
        id: "2",
        value: (
            <Text>
                {'✔️ Accept tips from smartphone cameras with your QR Code '}
                <QRCodeIcon />
            </Text>
        ),
    },
    {
        id: "3",
        value: <Text>✔️ Zero fees</Text>,
    },
    {
        id: "4",
        value: <Text>✔️ Open-source</Text>,
    },
];

const UseCasesList: FunctionComponent = () => (
    <List spacing={2}>
        {useCasesArr.map(({id, value}) => (
            <ListItem key={id}>
                <Flex justify="center">
                    <Text>
                        {value}
                    </Text>
                </Flex>
            </ListItem>
        ))}
    </List>
);

export default UseCasesList;
