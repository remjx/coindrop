import { verifyIdToken } from '../../utils/auth/firebaseAdmin';

const requireFirebaseToken = async (req, res, next) => {
    try {
        const {token} = req.headers;
        const verifiedIdToken = await verifyIdToken(token);
        req.headers.uid = verifiedIdToken.uid;
        req.headers.email = verifiedIdToken.email;
        return next();
    } catch (error) {
        return res.status(401).send('You are unauthorized');
    }
};

export default requireFirebaseToken;
