/* eslint-disable arrow-body-style */
// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { FC } from 'react';
import Footer from './components/footer';
import BaseEmailTemplate from './base';
import Title from './components/title';
import PrimaryText from './components/primary-text';

type Props = {
    title: string
}

const CondropCreationEmailTemplate: FC<Props> = ({
    title,
}) => {
    return (
        <BaseEmailTemplate>
            <Title>
                {title}
            </Title>
            <PrimaryText>
                Hello there, you are great.
            </PrimaryText>
            <Footer
                reason="This e-mail was sent to you because you signed up for an account at coindrop.to"
            />
        </BaseEmailTemplate>
    );
};

export default CondropCreationEmailTemplate;
