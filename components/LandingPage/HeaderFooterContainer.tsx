import { FC } from 'react';
import { Container, useTheme } from '@chakra-ui/react';

export const HeaderFooterContainer: FC<{ children: React.ReactNode }> = ({ children }) => {
    const theme = useTheme();
    return (
        <Container
            maxW={theme.breakpoints.xl}
        >
            {children}
        </Container>
    );
};
