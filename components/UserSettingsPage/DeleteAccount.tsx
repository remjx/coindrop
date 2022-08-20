import { Button, Box, Input, Text, Spinner } from '@chakra-ui/react';
import { FC, useState, Dispatch, SetStateAction } from 'react';
import { User } from 'firebase/auth';
import axios from 'axios';
import { useUser } from '../../utils/auth/useUser';

const deleteUser = async (user: User) => {
    const token = await user.getIdToken();
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
        setStatus('success');
        const redirectDelay = 5000;
        setTimeout(logout, redirectDelay);
    } catch (err) {
        setStatus('error');
    } finally {
        setIsSubmitting(false);
    }
};

const DeleteAccount: FC = () => {
    const { user, logout } = useUser();
    const id = user?.uid;
    const email = user?.email;
    const [status, setStatus] = useState<Status>('initial');
    const [confirmingInput, setConfirmingInput] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        handleDelete(logout, setIsSubmitting, user, setStatus);
    };
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
            <form
                onSubmit={onSubmit}
            >
                <Text mb={1}>
                    Type your e-mail address to confirm account deletion:
                </Text>
                <Input
                    placeholder={email}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setConfirmingInput(event.target.value)}
                    value={confirmingInput}
                    type="text"
                />
                {confirmingInput === email && (
                    <Text mt={2}>
                        All your Coindrops will be deleted. This cannot be undone!
                    </Text>
                )}
                <Box>
                    <Button
                        type="submit"
                        colorScheme="red"
                        leftIcon={isSubmitting ? <Spinner size="sm" /> : undefined}
                        isDisabled={confirmingInput !== email || isSubmitting}
                        mt={2}
                    >
                        {isSubmitting ? 'Deleting' : 'Delete Account'}
                    </Button>
                </Box>
            </form>
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
            <Box>
                <Button
                    colorScheme="red"
                    variant="outline"
                    onClick={() => setStatus('user-confirmation')}
                >
                    Delete Account
                </Button>
                <Text textAlign="center">
                    ⚠️ Error deleting account. Please try again and contact support if you continue to receive this error.
                </Text>
            </Box>
        );
    }
    return null;
};

export default DeleteAccount;
