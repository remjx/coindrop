/* eslint-disable react/jsx-props-no-spreading */
import { FunctionComponent, ComponentType } from 'react';
import { Box, Container, useTheme } from '@chakra-ui/react';
import { Navbar } from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

type Props = {
    [key: string]: any
}

export const withDefaultLayout = (Component: ComponentType): FunctionComponent<Props> => {
    const WrappedComponent: FunctionComponent = (props: Props) => {
        const theme = useTheme();
        return (
            <Container
                maxW={theme.breakpoints.lg}
                mx="auto"
                px={4}
                mb={6}
            >
                <Navbar />
                <Box mb={[2, 0]} />
                <hr />
                <Component {...props} />
                <Footer />
            </Container>
        );
    };
    return WrappedComponent;
};
