import { FC } from 'react';
import { useColorModeValue, Text } from '@chakra-ui/react';

export const CreateCoindropError: FC<{ error: string }> = ({ error }) => {
    const errorTextColor = useColorModeValue("red.500", "red.300");
    return (
        <Text mt={2} textAlign="center" color={errorTextColor}>
            {error}
        </Text>
    );
};
