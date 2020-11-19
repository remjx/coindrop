import { db } from '../../utils/auth/firebaseAdmin';

const requireBetaInvite = async (req, res, next) => {
    try {
        const { email } = req.headers;
        const inviteDoc = await db().collection('invites').doc(email).get();
        if (inviteDoc.exists) {
            return next();
        }
        throw new Error('User not invited to beta.');
    } catch (error) {
        return res.status(428).send('Your beta access invite has not yet been approved');
    }
};

export default requireBetaInvite;
