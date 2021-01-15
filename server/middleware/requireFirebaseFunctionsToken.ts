import { NextApiRequest, NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';
import Cryptr from 'cryptr';

const cryptr = new Cryptr(process.env.FIREBASE_FUNCTIONS_CRYPTR_SECRET);

const requireFirebaseFunctionsToken = async (req: NextApiRequest, res: NextApiResponse, next: NextHandler): Promise<void> => {
        const { FIREBASE_FUNCTIONS_AUTH_TOKEN_ENCRYPTED: tokenEncryptedHeader } = req.headers;
        const tokenEncrypted = Array.isArray(tokenEncryptedHeader) ? tokenEncryptedHeader[0] : tokenEncryptedHeader;
        const tokenDecrypted = cryptr.decrypt(tokenEncrypted);
        if (tokenDecrypted === process.env.FIREBASE_FUNCTIONS_AUTH_TOKEN) {
            return next();
        }
        return res.status(401).end();
};

export default requireFirebaseFunctionsToken;
