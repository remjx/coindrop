import { FunctionComponent, ComponentType } from 'react';
import { Container } from '@chakra-ui/react';
import { Navbar } from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

export const withDefaultLayout = (Component: ComponentType): FunctionComponent => {
    const WrappedComponent: FunctionComponent = () => (
        <Container
            maxW="960px"
            mx="auto"
            px={4}
            mb={6}
        >
            <Navbar />
            <hr />
            <Component />
            <Footer />
        </Container>
    );
    return WrappedComponent;
};
