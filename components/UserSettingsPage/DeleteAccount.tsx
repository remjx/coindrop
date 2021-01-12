import { Button, Box, Input, Text, Spinner } from '@chakra-ui/react';
import { FC, useState, Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import { useUser } from '../../utils/auth/useUser';
import { User } from '../../utils/auth/mapUserData';

const deleteUser = async (user: User) => {
    const { token } = user;
    try {
        await axios.get('/api/user/delete', { headers: { token }});
        return;
    } catch (err) {
        throw new Error('Error deleting user');
    }
};

type Status = 'initial' | 'user-confirmation' | 'error' | 'success';

const handleDelete = async (
    logout,
    setIsSubmitting: Dispatch<SetStateAction<boolean>>,
    user: User,
    setStatus: Dispatch<SetStateAction<Status>>,
) => {
    setIsSubmitting(true);
    try {
        await deleteUser(user);
        const redirectDelay = 5000;
        setTimeout(logout, redirectDelay);
    } catch (err) {
        console.error('error in handleDelete', err);
        setStatus('error');
    } finally {
        setIsSubmitting(false);
    }
};

const DeleteAccount: FC = () => {
    const { user, logout } = useUser();
    const id = user?.id;
    const email = user?.email;
    const [status, setStatus] = useState<Status>('initial');
    const [confirmingInput, setConfirmingInput] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    if (!id || !email) {
        return <Spinner data-testid="no-user-spinner" />;
    }
    if (status === 'initial') {
        return (
            <Box>
                <Button
                    colorScheme="red"
                    variant="outline"
                    onClick={() => setStatus('user-confirmation')}
                >
                    Delete Account
                </Button>
            </Box>
        );
    }
    if (status === 'user-confirmation') {
        return (
            <Box>
                <Text mb={1}>
                    Type your e-mail address to confirm account deletion:
                </Text>
                <Input
                    placeholder={email}
                    onChange={(event) => setConfirmingInput(event.target.value)}
                    value={confirmingInput}
                    type="text"
                />
                {confirmingInput === email && (
                    <Text mt={2}>
                        All your Coindrops will be deleted. This cannot be undone!
                    </Text>
                )}
                <Box align="center">
                    <Button
                        colorScheme="red"
                        onClick={() => handleDelete(logout, setIsSubmitting, user, setStatus)}
                        leftIcon={isSubmitting ? <Spinner size="sm" /> : undefined}
                        isDisabled={confirmingInput !== email || isSubmitting}
                        mt={2}
                    >
                        {isSubmitting ? 'Deleting' : 'Delete Account'}
                    </Button>
                </Box>
            </Box>
        );
    }
    if (status === 'success') {
        return (
            <Text textAlign="center">
                ✔️ Account deleted. Redirecting to homepage...
            </Text>
        );
    }
    if (status === 'error') {
        return (
            <Text textAlign="center">
                ⚠️ Error deleting account. Please try again and contact support if you continue to receive this error.
            </Text>
        );
    }
    return null;
};

export default DeleteAccount;
