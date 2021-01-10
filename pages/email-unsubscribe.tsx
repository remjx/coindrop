import { FC } from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import Cryptr from 'cryptr';
import { db } from '../utils/auth/firebaseAdmin';
import { withDefaultLayout } from '../components/Layout/DefaultLayoutHOC';
import { EmailListIds } from '../src/email/types';

const cryptr = new Cryptr(process.env.EMAIL_TOKENS_CRYPTR_SECRET);

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const { query: { token }} = context;
        const [userEmail, emailListId]: [string, EmailListIds] = cryptr.decrypt(token).split(" ");
        console.log('userEmail', userEmail);
        console.log('emailListId', emailListId);
        const ref = db()
            .collection('email-lists')
            .doc(emailListId)
            .collection('user-emails')
            .doc(userEmail);
        const updateStatus = await ref.delete();
        console.log('update status', updateStatus);
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
        ? `${userEmail} been unsubscribed from ${emailListId} e-mails`
        : `Error unsubscribing. Try clicking the link in your e-mail again. Please contact support if you continue to encounter this error.`;
    const user = useUser();
    // if user is logged in, link to /account-settings
    // else, display log in button
    return (
        <Box textAlign="center" my={12}>
            <Heading>
                Unsubscribe
            </Heading>
            <Text>
                {message}
            </Text>
            <Text>
                <Link>
                    E-mail settings
                </Link>
            </Text>
        </Box>
    );
};

export default withDefaultLayout(EmailUnsubscribe);
