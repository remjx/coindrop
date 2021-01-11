import { FunctionComponent } from 'react';
import {
    Box,
    Button,
    Heading,
    Text,
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Checkbox,
} from "@chakra-ui/react";
import useSWR from 'swr';
import { useForm } from "react-hook-form";
import { useUser } from '../../utils/auth/useUser';
import { withDefaultLayout } from '../Layout/DefaultLayoutHOC';
import Title from '../Title/Title';
import { getUserData } from '../../src/db/queries/user-settings/get-user-settings';
import { UserData } from '../../src/db/schema/user';
import { updateUserData } from '../../src/db/mutations/user/update-user';

const onSubmit = (formData) => {
    const transformedData = formData;
    updateUserData(transformedData);
};

const allEmailLists: Record<EmailListId, string> = {
    newsletter: "Coindrop Newsletter",
    // analytics: "Coindrop Analytics",
};

const UserSettings: FunctionComponent = () => {
    const { user } = useUser();
    const userId = user?.id;
    const { data, error } = useSWR(userId ? 'user-settings' : null, () => getUserData(userId));
    const userData: UserData = data;
    const email = userData?.email;
    const email_lists = userData?.email_lists;
    const { register, handleSubmit, watch, errors } = useForm();
    console.log('data', userData);
    console.log('error', error); // use error to create a toast notification
    return (
        <Box>
            <Title title="My Account" />
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl id="email" isDisabled isReadOnly>
                    <FormLabel>Email address</FormLabel>
                    <Input type="email" name="email" defaultValue={email} ref={register} />
                    {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                </FormControl>
                <Heading>
                    E-mail Preferences
                </Heading>
                {Object.entries(allEmailLists).map(([emailListId, emailListDisplayName]) => (
                    <Checkbox
                        name="email_lists"
                        colorScheme="orange"
                        value={emailListId}
                        ref={register()}
                    >
                        {emailListDisplayName}
                    </Checkbox>

                ))}
                {errors.exampleRequired && <span>This field is required</span>}
                <Button colorScheme="green" type="submit">
                    Save
                </Button>
            </form>
        </Box>
    );
};

export default withDefaultLayout(UserSettings);
