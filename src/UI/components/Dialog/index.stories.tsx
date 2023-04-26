import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import Dialog, { IDialog } from './index';

export default {
  title: 'Components/Dialog',
  component: Dialog,
} as Meta;

const Template: Story<IDialog> = (args: IDialog) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>{args.button}</button>
      <Dialog {...args} button={null} isOpen={isOpen} setIsOpen={setIsOpen}>
        <div>{args.children}</div>
      </Dialog>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  button: 'Open Dialog',
  children: 'This is the dialog content',
};
