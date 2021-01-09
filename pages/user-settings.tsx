import { FunctionComponent } from 'react';
import {
    Box,
    // useTheme,
} from "@chakra-ui/react";
import { withDefaultLayout } from '../components/Layout/DefaultLayoutHOC';
import Title from '../components/Title/Title';

const UserSettings: FunctionComponent = () => {
    // const theme = useTheme();
    return (
        <Box>
            <Title title="My Account" />
            This page is not created yet.
        </Box>
    );
};

export default withDefaultLayout(UserSettings);
