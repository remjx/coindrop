import { Flex, List, ListItem, Text as ChakraText } from "@chakra-ui/react";
import { FunctionComponent, ReactElement } from "react";

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
        value: <Text>✔️ Accept donations anywhere on the internet with your Coindrop link</Text>,
    },
    {
        id: "2",
        value: <Text>✔️ Accept tips in the real world by displaying your Coindrop QR Code</Text>,
    },
    {
        id: "3",
        // eslint-disable-next-line react/jsx-one-expression-per-line
        value: <Text>✔️ Free and open-source with <b>zero fees</b></Text>,
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
