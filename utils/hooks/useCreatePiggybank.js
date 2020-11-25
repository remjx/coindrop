// This is only used to create a new piggybank from scratch, not replace an existing one.

import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { mutate } from 'swr';
import { CreatePiggybankContext } from '../../components/AppContext/AppContext';

const useCreatePiggybank = (candidatePiggybankPath, setCandidatePiggybankPath, user, isTriggered, setIsTriggered) => {
    const [submitStatus, setSubmitStatus] = useState('idle');
    const [error, setError] = useState();
    const { setPendingLoginCreatePiggybankPath } = useContext(CreatePiggybankContext);
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
            setCandidatePiggybankPath('');
            mutate(user.id);
            setPendingLoginCreatePiggybankPath(null);
        } catch (err) {
            setSubmitStatus('error');
            setError(err.statusText);
            if (err.response) {
                if (err.response.status === 409) {
                    setError('A piggybank with this name already exists.');
                } else if (err.response.status === 406) {
                    setError('You\'ve reached the maximum number of piggybanks. Contact support to increase your limit.');
                } else if (err.response.status === 428) {
                    setError('Beta invite is required. DM @coindrop_to on Twitter to request an invite.');
                } else {
                    setError('Server error. Please try again.');
                }
              } else if (err.request) {
                setError('Request timed out. Please try again.');
              } else {
                setError('Error sending request. Please try again.');
              }
        }
        setIsTriggered(false);
    }
    useEffect(() => {
        if (isTriggered && user) {
            triggerCreation();
        }
    }, [isTriggered, user]);
    return { submitStatus, error, setError };
};

export default useCreatePiggybank;
