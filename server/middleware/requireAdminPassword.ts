import { NextApiRequest, NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';

const requireAdminPassword = (req: NextApiRequest, res: NextApiResponse, next: NextHandler): any => {
    const { password: pw } = req.body;
    const password = Array.isArray(pw) ? pw[0] : pw;
    if (password === process.env.ADMIN_PASSWORD) {
        return next();
    }
    return res.status(401).send('Unauthorized');
};

export default requireAdminPassword;
