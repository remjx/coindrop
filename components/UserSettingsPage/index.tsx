/* eslint-disable arrow-body-style */
import { FC, useState } from 'react';
import {
    Box,
    Center,
    Flex,
    Button,
    Heading,
    FormLabel,
    Checkbox,
    Spinner,
    useToast,
    Text,
} from "@chakra-ui/react";
import useSWR from 'swr';
import { useForm } from "react-hook-form";
import { useUser } from '../../utils/auth/useUser';
import { withDefaultLayout } from '../Layout/DefaultLayoutHOC';
import { getUserData } from '../../src/db/queries/user/get-user-data';
import { EmailListIds } from '../../src/db/schema/user';
import { updateUserData } from '../../src/db/mutations/user/update-user';
import DeleteAccount from './DeleteAccount';

const optionalEmailLists: Record<EmailListIds, string> = {
    newsletter: "Coindrop Newsletter",
};
const alwaysEnabledEmailLists = [
    "Privacy Policy Updates",
    "Terms of Service Updates",
];

type SectionHeadingProps = {
    size: "sm" | "md" | "lg"
    children: React.ReactNode
}

const SectionHeading: FC<SectionHeadingProps> = ({ size, children }) => (
    <Box mt={6} mb={3}>
        <Heading as="h2" mb={2} size={size}>
            {children}
        </Heading>
        <hr />
    </Box>
);

const SectionContainer: FC<{ children: React.ReactNode }> = ({ children }) => (
    <Box mx={4}>
        {children}
    </Box>
);

type UserDataFormProps = {
    userData: Record<string, any>
    mutate: any
    userId: string
}

export const UserDataForm: FC<UserDataFormProps> = ({ userData, mutate, userId }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const toast = useToast();
    const { register, handleSubmit, formState: { isDirty }, reset } = useForm();
    const email_lists = userData?.email_lists;
    const onSubmit = async (rawFormData) => {
        setIsSubmitting(true);
        const userDataForDb = {
            email_lists: [],
        };
        Object.keys(optionalEmailLists).forEach(emailListId => {
            if (rawFormData.email_lists[emailListId]) {
                userDataForDb.email_lists.push(emailListId);
            }
        });
        try {
            await updateUserData({ data: userDataForDb, userId });
            mutate(userDataForDb);
            reset();
            toast({
                title: "Account updated",
                status: "success",
                duration: 6000,
                isClosable: true,
            });
        } catch (err) {
            toast({
                title: "Error updating account",
                description: "Please try again or contact support",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <SectionContainer>
            <form onSubmit={handleSubmit(onSubmit)} data-testid="settings-form">
                <SectionHeading size="md">
                    E-mail
                </SectionHeading>
                <Box
                    id="email-preferences-content"
                    m={4}
                >
                    <FormLabel>Newsletters</FormLabel>
                    <Flex wrap="wrap">
                        {Object.entries(optionalEmailLists).map(([emailListId, emailListDisplayName]: [EmailListIds, string]) => {
                            return (
                                <Checkbox
                                    key={emailListId}
                                    mr={6}
                                    name={`email_lists.${emailListId}`}
                                    colorScheme="orange"
                                    defaultChecked={email_lists?.includes(emailListId)}
                                    ref={register()}
                                >
                                    {emailListDisplayName}
                                </Checkbox>
                            );
                        })}
                        {alwaysEnabledEmailLists.map(listName => (
                            <Checkbox
                                key={listName}
                                mr={6}
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
                    <Button
                        colorScheme="green"
                        type="submit"
                        isDisabled={!isDirty || isSubmitting}
                        leftIcon={isSubmitting ? <Spinner size="sm" /> : undefined}
                    >
                        {isSubmitting ? 'Saving' : 'Save'}
                    </Button>
                </Box>
            </form>
        </SectionContainer>
    );
};

export const UserSettingsPage: FC = () => {
    const { user } = useUser();
    const userId = user?.uid;
    const fetcher = () => getUserData(userId);
    const { data: userData, error: fetchError, mutate } = useSWR(
        userId ? 'user-data' : null,
        fetcher,
    );
    const email = user?.email;
    const Settings = () => {
        if (fetchError) {
            return (
                <Text>
                    ⚠️ Error fetching user data. Please refresh the page or contact support.
                </Text>
            );
        }
        if (userData) {
            return (
                <UserDataForm
                    userData={userData}
                    mutate={mutate}
                    userId={userId}
                />
            );
        }
        return (
            <Center mt={10}>
                <Spinner data-testid="no-user-data-spinner" />
            </Center>
        );
    };
    if (!user) {
        return (
            <Center mt={10}>
                <Spinner data-testid="no-user-spinner" />;
            </Center>
        );
    }
    return (
        <Box>
            <Heading as="h1" textAlign="center" my={4}>
                My Account
            </Heading>
            <SectionHeading size="lg">
                Profile
            </SectionHeading>
            <SectionContainer>
                <FormLabel>Email address</FormLabel>
                <Text ml={2}>{email}</Text>
            </SectionContainer>
            <SectionHeading size="lg">
                Settings
            </SectionHeading>
            <Settings />
            <SectionHeading size="lg">
                Danger Zone
            </SectionHeading>
            <DeleteAccount />
        </Box>
    );
};

export default withDefaultLayout(UserSettingsPage);
