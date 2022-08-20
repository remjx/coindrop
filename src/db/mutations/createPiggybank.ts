import axios from 'axios';
import { User } from 'firebase/auth';

export async function createPiggybank(
    candidatePiggybankPath: string,
    user: User,
){
    const headers = {
        token: await user.getIdToken(),
    };
    try {
        await axios.post('/api/createPiggybank', {
            newPiggybankName: candidatePiggybankPath,
        }, { headers });
    } catch (err) {
        if (err.response) {
            if (err.response.status === 409) {
                throw new Error('A piggybank with this name already exists.');
            } else if (err.response.status === 406) {
                throw new Error('You\'ve reached the maximum number of piggybanks. Contact support to increase your limit.');
            } else if (err.response.status === 400) {
                throw new Error('Coindrop name does not meet the requirements.');
            } else {
                throw new Error('Server error. Please try again.');
            }
        } else if (err.request) {
            throw new Error('Request timed out. Please try again.');
        } else {
            throw new Error('Error sending request. Please try again.');
        }
    }
}

