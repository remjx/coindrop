import { FC } from 'react';
import Cryptr from 'cryptr';
import { baseUrl, coindropBusinessAddress } from '../../../src/settings';
import SocialLink from './social-link';

const cryptr = new Cryptr(process.env.EMAIL_TOKENS_CRYPTR_SECRET);

type Props = {
    userEmail: string
    emailListId: string | null
}

const Footer: FC<Props> = ({ userEmail, emailListId }) => {
    let unsubscribeUrl;
    if (userEmail && emailListId) {
        const unsubscribeTokenUnencrypted = `${userEmail} ${emailListId}`;
        const unsubscribeTokenEncrypted = cryptr.encrypt(unsubscribeTokenUnencrypted);
        const unsubscribePath = `/email-unsubscribe?token=${unsubscribeTokenEncrypted}`;
        unsubscribeUrl = `${baseUrl}${unsubscribePath}`;
    }
    return (
        <div
            id="footer"
            style={{
                fontSize: "12px",
                textAlign: "center",
                marginTop: "40px",
            }}
        >
            <hr />
            <div
                id="social-links"
                style={{
                    paddingTop: "8px",
                    margin: "auto",
                    textAlign: "center",
                }}
            >
                <SocialLink
                    href="https://twitter.com/coindrop_to"
                    title="Twitter"
                    alt="TWTR"
                    srcPath="/images/twitter-logo-black.png"
                />
                <SocialLink
                    href="https://www.youtube.com/channel/UCpkybbAV94VUkZOsxboJtmQ"
                    title="YouTube"
                    alt="YT"
                    srcPath="/images/youtube-logo-black.png"
                />
                <SocialLink
                    href="https://www.facebook.com/Coindrop.to/"
                    title="Facebook"
                    alt="FB"
                    srcPath="/images/facebook-logo-black.png"
                />
            </div>
            <div
                id="reply"
            >
                You can reply to this e-mail with any questions or feedback
            </div>
            <div
                id="address"
                style={{
                    marginTop: "4px",
                }}
            >
                Coindrop, {coindropBusinessAddress}
            </div>
            <div
                id="unsubscribe-options"
                style={{
                    marginTop: "4px",
                }}
            >
                {unsubscribeUrl ? (
                    <span>
                        <a
                            style={{color: "black"}}
                            href={`${baseUrl}/dashboard`}
                        >
                            My Account
                        </a>
                        {' | '}
                        <a
                            style={{color: "black"}}
                            href={unsubscribeUrl}
                        >
                            Unsubscribe
                        </a>
                    </span>
                ) : (
                    <span>
                        {'This is a one-time e-mail | '}
                        <a
                            style={{color: "black"}}
                            href={`${baseUrl}/account`}
                        >
                            Account Settings
                        </a>
                    </span>
                )}
            </div>
        </div>
    );
};

export default Footer;
