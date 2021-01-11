import { FunctionComponent } from 'react';
import {
    Box,
    Heading,
    Text,
} from "@chakra-ui/react";
import useSWR from 'swr';
import { useUser } from '../../utils/auth/useUser';
import { withDefaultLayout } from '../Layout/DefaultLayoutHOC';
import Title from '../Title/Title';
import { getUserData } from '../../src/db/queries/user-settings/get-user-settings';
import { UserData } from '../../src/db/schema/user';

const UserSettings: FunctionComponent = () => {
    const { user } = useUser();
    const userId = user?.id;
    const { data, error } = useSWR(userId ? 'user-settings' : null, () => getUserData(userId));
    const userData: UserData = data;
    console.log('data', userData);
    console.log('error', error);
    return (
        <Box>
            <Title title="My Account" />
            <Heading>
                E-mail Preferences
            </Heading>
            <Text>
                User data: {JSON.stringify(userData)}
            </Text>
        </Box>
    );
};

export default withDefaultLayout(UserSettings);
