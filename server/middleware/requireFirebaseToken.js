import { verifyIdToken } from '../../utils/auth/firebaseAdmin';

const requireFirebaseToken = async (req, res, next) => {
    try {
        const {token} = req.headers;
        console.log('token', token)
        const verifiedIdToken = await verifyIdToken(token);
        console.log('verifiedIdToken', verifiedIdToken);
        req.headers.email = verifiedIdToken.email;
        req.headers.uid = verifiedIdToken.uid;
        return next();
    } catch (error) {
        return res.status(401).send('You are unauthorized');
    }
};

export default requireFirebaseToken;
