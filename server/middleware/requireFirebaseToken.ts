import { NextApiRequest, NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';
import { verifyIdToken } from '../../utils/auth/firebaseAdmin';

const requireFirebaseToken = async (req: NextApiRequest, res: NextApiResponse, next: NextHandler): Promise<void> => {
    try {
        const { token: tokenHeader } = req.headers;
        console.log('TOKEN::tokenHeader', tokenHeader);
        const token = Array.isArray(tokenHeader) ? tokenHeader[0] : tokenHeader;
        const verifiedIdToken = await verifyIdToken(token);
        req.headers.uid = verifiedIdToken.uid;
        req.headers.email = verifiedIdToken.email;
        return next();
    } catch (error) {
        console.error(error);
        return res.status(401).end();
    }
};

export default requireFirebaseToken;
