import { FC } from 'react';
import { Box, UnorderedList, ListItem, Text } from '@chakra-ui/react';

export const CoindropRequirements: FC = () => (
    <Box mt={2}>
        <Text
            textAlign="center"
        >
            Requirements:
            <UnorderedList listStylePosition="inside">
                <ListItem>Starts with a letter</ListItem>
                <ListItem>Only includes letters, numbers, dashes (-), and underscores (_)</ListItem>
                <ListItem>Ends with a letter or number</ListItem>
                <ListItem>Has a maximum length of 32 characters</ListItem>
            </UnorderedList>
        </Text>
    </Box>
);
