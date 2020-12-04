// This is only used to create a new piggybank from scratch, not replace an existing one.

import axios from 'axios';
import { useState, useEffect } from 'react';
import { mutate } from 'swr';
import cookies from 'js-cookie';

const useCreatePiggybank = (candidatePiggybankPath, setCandidatePiggybankPath, user, isTriggered, setIsTriggered) => {
    const [submitStatus, setSubmitStatus] = useState('idle');
    const [error, setError] = useState();
    async function triggerCreation() {
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
            setSubmitStatus('success');
            mutate(user.id);
        } catch (err) {
            setSubmitStatus('error');
            setError(err.statusText);
            if (err.response) {
                if (err.response.status === 409) {
                    setError('A piggybank with this name already exists.');
                } else if (err.response.status === 406) {
                    setError('You\'ve reached the maximum number of piggybanks. Contact support to increase your limit.');
                } else {
                    setError('Server error. Please try again.');
                }
            } else if (err.request) {
                setError('Request timed out. Please try again.');
            } else {
                setError('Error sending request. Please try again.');
            }
        } finally {
            setIsTriggered(false);
            setCandidatePiggybankPath('');
            cookies.remove('pendingLoginCreatePiggybankPath');
        }
    }
    useEffect(() => {
        if (isTriggered && user) {
            triggerCreation();
        }
    }, [isTriggered, user]);
    return { submitStatus, error, setError };
};

export default useCreatePiggybank;
