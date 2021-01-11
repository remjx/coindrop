import { FunctionComponent } from 'react';
import {
    Box,
    Flex,
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
import { EmailListIds, UserData } from '../../src/db/schema/user';
import { updateUserData } from '../../src/db/mutations/user/update-user';

const onSubmit = (formData) => {
    console.log('formData', formData)
    // const transformedData = formData;
    // updateUserData(transformedData);
};

const optionalEmailLists: Record<EmailListIds, string> = {
    newsletter: "Main Newsletter",
    // analytics: "Coindrop Analytics",
};
const alwaysEnabledEmailLists = [
    "Terms of Service Updates",
];

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
            <Heading as="h1" textAlign="center" my={4}>
                Account Settings
            </Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Heading as="h2" size="md">
                    E-mail Preferences
                </Heading>
                <Box
                    id="email-preferences-content"
                    m={4}
                >
                    <FormControl id="email" isDisabled isReadOnly>
                        <FormLabel>Email address</FormLabel>
                        <Input type="email" name="email" defaultValue={email} ref={register} />
                        {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                    </FormControl>
                    <Flex>
                        {Object.entries(optionalEmailLists).map(([emailListId, emailListDisplayName]: [EmailListIds, string]) => (
                            <Checkbox
                                mr={2}
                                name="email_lists"
                                colorScheme="orange"
                                defaultChecked={email_lists?.includes(emailListId)}
                                ref={register()}
                            >
                                {emailListDisplayName}
                            </Checkbox>

                        ))}
                        {alwaysEnabledEmailLists.map(listName => (
                            <Checkbox
                                mr={2}
                                colorScheme="orange"
                                defaultChecked
                                isDisabled
                            >
                                {listName}
                            </Checkbox>
                        ))}
                    </Flex>
                </Box>
                <Box>
                    <Button colorScheme="green" type="submit">
                        Save
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default withDefaultLayout(UserSettings);
