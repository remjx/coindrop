import { FC } from 'react';
import { BoxProps, Container, useTheme } from '@chakra-ui/react';

type ContentContainerProps = {
    boxProps?: BoxProps
}

export const ContentContainer: FC<ContentContainerProps & { children: React.ReactNode }> = ({ boxProps, children }) => {
    const theme = useTheme();
    return (
    <Container
        my={24}
        maxW={theme.breakpoints.xl}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...boxProps}
    >
        {children}
    </Container>
    );
};
