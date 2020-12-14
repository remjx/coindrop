// This is only used to create a new piggybank from scratch, not replace an existing one.

import axios from 'axios';
import { useState, useEffect, SetStateAction, Dispatch } from 'react';
import { mutate } from 'swr';
import { useRouter } from 'next/router';
import cookies from 'js-cookie';
import { User } from '../auth/mapUserData';

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

type UseCreatePiggybank = {
    submitStatus: SubmitStatus
    error: string
    setError: Dispatch<SetStateAction<string>>
}

function useCreatePiggybank(
    candidatePiggybankPath: string,
    setCandidatePiggybankPath: Dispatch<SetStateAction<string>>,
    user: User,
    isTriggered: boolean,
    setIsTriggered: Dispatch<SetStateAction<boolean>>,
): UseCreatePiggybank {
    const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
    const [error, setError] = useState('');
    const { push } = useRouter();
    async function triggerCreation() {
        setIsTriggered(false);
        setSubmitStatus('submitting');
        setError(null);
        const data = {
            newPiggybankName: candidatePiggybankPath,
        };
        const headers = {
            token: user.token,
        };
        try {
            await axios.post('/api/createPiggybank', data, { headers });
            setCandidatePiggybankPath('');
            setSubmitStatus('success');
            push(`/${candidatePiggybankPath}`);
        } catch (err) {
            setSubmitStatus('error');
            setError(err.statusText);
            if (err.response) {
                if (err.response.status === 409) {
                    setError('A piggybank with this name already exists.');
                } else if (err.response.status === 406) {
                    setError('You\'ve reached the maximum number of piggybanks. Contact support to increase your limit.');
                } else if (err.response.status === 400) {
                    setError('Coindrop name does not meet the requirements.');
                } else {
                    setError('Server error. Please try again.');
                }
            } else if (err.request) {
                setError('Request timed out. Please try again.');
            } else {
                setError('Error sending request. Please try again.');
            }
        } finally {
            cookies.remove('pendingLoginCreatePiggybankPath');
        }
    }
    useEffect(() => {
        if (isTriggered && user) {
            triggerCreation();
        }
    }, [isTriggered, user]);
    return { submitStatus, error, setError };
}

export default useCreatePiggybank;
