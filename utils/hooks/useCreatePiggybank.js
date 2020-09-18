import axios from 'axios';
import { useState, useEffect } from 'react';
import { mutate } from 'swr';

const useCreatePiggybank = (candidatePiggybankPath, setCandidatePiggybankPath, user, isTriggered, setIsTriggered) => {
    const [submitStatus, setSubmitStatus] = useState('idle');
    async function triggerCreation() {
        setSubmitStatus('submitting');
        const data = {
            piggybankName: candidatePiggybankPath,
        };
        const headers = {
            token: user.token,
        };
        try {
            await axios.post('/api/updatePiggybank', data, { headers });
            setSubmitStatus('success');
            setCandidatePiggybankPath('');
            mutate(user.id);
        } catch (error) {
            setSubmitStatus('error');
        }
        setIsTriggered(false);
    }
    useEffect(() => {
        if (isTriggered && user) {
            triggerCreation();
        }
    }, [isTriggered, user]);
    return { submitStatus };
};

export default useCreatePiggybank;
