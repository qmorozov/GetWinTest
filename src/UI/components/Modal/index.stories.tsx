import React from 'react';
import { Story, Meta } from '@storybook/react';
import CustomModal, { ICustomModal } from './index';

export default {
  title: 'Components/Modal',
  component: CustomModal,
} as Meta;

const Template: Story<ICustomModal> = (args: ICustomModal) => (
  <CustomModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  open: true,
  onCancel: () => console.log('cancel'),
  children: <div>This is a Custom Modal</div>,
};

export const FullScreen = Template.bind({});
FullScreen.args = {
  ...Default.args,
  fullScreen: true,
};
