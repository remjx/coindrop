import { FC } from 'react';
import { Box, UnorderedList, ListItem, Text } from '@chakra-ui/react';

export const CoindropRequirements: FC = () => (
    <Box mt={2} textAlign="center">
        <Text>
            Coindrop URLs must:
        </Text>
        <UnorderedList listStylePosition="inside">
            <ListItem>Start with a letter</ListItem>
            <ListItem>Only include letters, numbers, dashes (-), and underscores (_)</ListItem>
            <ListItem>End with a letter or number</ListItem>
            <ListItem>Be between 3 and 32 characters in length</ListItem>
        </UnorderedList>
    </Box>
);
