import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import PiggybankListItem from './PiggybankListItem';

export default {
  title: 'Components/PiggybankListItem',
  component: PiggybankListItem,
} as ComponentMeta<typeof PiggybankListItem>;

// const Template: ComponentStory<typeof PiggybankListItem> = (args) => <PiggybankListItem {...args} />;

// export const Default = Template.bind({});
// Default.args = {
//     id: '1',
//     loadingCoindropId: null
// };

// export const Loading = Template.bind({});
// Loading.args = {
//     id: '1',
//     loadingCoindropId: '1'
// };

export const All = () => {
    return (
        <>
            {/** Duplicate first two to be able to hover on one of them */}
            <PiggybankListItem id="1" loadingCoindropId="1" setLoadingCoindropId={() => undefined} />
            <PiggybankListItem id="2" loadingCoindropId="1" setLoadingCoindropId={() => undefined} />
            <PiggybankListItem id="3" loadingCoindropId="1" setLoadingCoindropId={() => undefined} />
        </>
    )
}