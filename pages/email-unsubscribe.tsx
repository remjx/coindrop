import { FC } from 'react';
import { Box, Text, Link } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import NextLink from 'next/link';
import Cryptr from 'cryptr';
import { db } from '../utils/auth/firebaseAdmin';
import { withDefaultLayout } from '../components/Layout/DefaultLayoutHOC';
import { EmailListIds } from '../src/db/schema/user';

const cryptr = new Cryptr(process.env.EMAIL_TOKENS_CRYPTR_SECRET);

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const { query: { token }} = context;
        const [userEmail, emailListId]: [string, EmailListIds] = cryptr.decrypt(token).split(" ");
        const ref = await db()
            .collection('users')
            .where('email', '==', userEmail);
        const usersQuerySnapshot = await ref.get();
        if (usersQuerySnapshot.empty) {
            throw new Error('No matching user e-mail');
        }
        if (usersQuerySnapshot.size > 1) {
            throw new Error('More than one e-mail matched');
        }
        let userDoc;
        usersQuerySnapshot.forEach(userDocTemp => {
            userDoc = userDocTemp;
        });
        const emailListsCurrent = userDoc.data().email_lists;
        const emailListsNew = Array.from(emailListsCurrent);
        emailListsNew.splice(emailListsNew.indexOf(emailListId), 1);
        await userDoc.ref.update({ email_lists: emailListsNew }, { merge: true });
        return {
            props: {
                isUnsubscribeSuccessful: true,
                emailListId,
                userEmail,
            },
        };
    } catch (err) {
        console.error(err);
        return {
            props: {
                isUnsubscribeSuccessful: false,
            },
        };
    }
};

type Props = {
    isUnsubscribeSuccessful: boolean
    userEmail: string
    emailListId: EmailListIds
};

const EmailUnsubscribe: FC<Props> = ({ isUnsubscribeSuccessful, emailListId, userEmail }) => {
    const message = isUnsubscribeSuccessful && userEmail && emailListId
        ? (
            <Text>
                ✔️ {userEmail} been unsubscribed from {emailListId} e-mails
            </Text>
        ) : (
            <Text>
                Error unsubscribing. Try clicking the link in your e-mail again. Please contact support if you continue to encounter this error.
            </Text>
        );
    return (
        <Box textAlign="center" my={12}>
            {message}
            <Text mt={2}>
                <NextLink href="/user-settings" passHref>
                    <Link>
                        <u>
                            View all e-mail settings
                        </u>
                    </Link>
                </NextLink>
            </Text>
        </Box>
    );
};

export default withDefaultLayout(EmailUnsubscribe);
