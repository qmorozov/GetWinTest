import { Meta, Story } from '@storybook/react';
import RegisterLayout, { IRegisterLayout } from './RegisterLayout';

export default {
  title: 'layouts/RegisterLayout',
  component: RegisterLayout,
  argTypes: {
    small: {
      type: 'boolean',
      description: 'Add small class to layout',
      control: {
        type: 'boolean',
      },
    },
  },
} as Meta;

const Template: Story<IRegisterLayout> = (args: IRegisterLayout) => (
  <RegisterLayout {...args} />
);

export const Default = Template.bind({});
Default.args = {
  layoutInfo: <p>Layout info goes here</p>,
  layoutForm: <form>Layout form goes here</form>,
};
