import { FC } from 'react';
import { baseUrl } from '../../../src/settings';

const Logo: FC = () => (
    <a
        href={baseUrl}
        target="_blank"
        rel="noreferrer"
    >
        <img
            src={`${baseUrl}/images/logo-light.png`}
            alt=""
            width="269"
            height="73"
        />
    </a>
);

export default Logo;
