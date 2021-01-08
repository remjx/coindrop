// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import styled from '@emotion/styled';
import { FC } from 'react';
import { baseUrl } from '../../../src/settings';
import SocialLink from './social-link';

const A = styled.a`
  color: black;
`;

type Props = {
    reason: string
}

const Footer: FC<Props> = ({
    reason,
}) => (
    <div
        id="footer"
        css={css`
            font-size: 12px;
            text-align: center;
        `}
    >
        <div
            id="social-links"
            css={css`
                display: flex;
                flex-direction: row;
                margin: auto;
                justify-content: center;
            `}
        >
            <SocialLink
                href="https://www.facebook.com/Coindrop.to/"
                title="Facebook"
                alt="FB"
                srcPath="/images/facebook-logo-black.png"
            />
            <SocialLink
                href="https://twitter.com/coindrop_to"
                title="Twitter"
                alt="TWTR"
                srcPath="/images/twitter-logo-black.png"
            />
            <SocialLink
                href="https://www.instagram.com/coindrop.to"
                title="Instagram"
                alt="IG"
                srcPath="/images/instagram-logo-black.png"
            />
            <SocialLink
                href="https://www.youtube.com/channel/UCpkybbAV94VUkZOsxboJtmQ"
                title="YouTube"
                alt="YT"
                srcPath="/images/youtube-logo-black.png"
            />
        </div>
        <div
            id="reason"
        >
            {reason}
        </div>
        <div
            id="unsubscribe-options"
            css={css`
                margin-top: 4px;
            `}
        >
            <span>
                <A
                    href={`${baseUrl}`} // TODO: MAKE THIS FUNCTIONAL
                >
                    Preferences
                </A>
                {' | '}
                <A
                    href={`${baseUrl}`} // TODO: MAKE THIS FUNCTIONAL
                >
                    Unsubscribe
                </A>
            </span>
        </div>
    </div>
);

export default Footer;
