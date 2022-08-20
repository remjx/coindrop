import { FunctionComponent } from "react";
import { Text } from '@chakra-ui/react';

export const FooterText: FunctionComponent<{ children: React.ReactNode }> = ({ children }) => (
    <Text
        casing="uppercase"
        fontFamily="Changa, system-ui, sans-serif"
    >
        {children}
    </Text>
);
