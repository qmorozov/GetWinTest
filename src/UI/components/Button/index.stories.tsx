import Button, { ButtonVariant, IButton } from './index';
import { Story } from '@storybook/react';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      options: Object.values(ButtonVariant),
      defaultValue: ButtonVariant.system,
      description: 'Defines the color scheme of the button',
      control: {
        type: 'radio',
      },
    },
    disabled: {
      type: 'boolean',
      defaultValue: false,
      description: 'Disables the button',
    },
    bare: {
      type: 'boolean',
      defaultValue: false,
      description: 'Removes default styles of the button',
    },
    children: {
      type: { name: 'string', required: true },
      defaultValue: 'Click',
      description: 'The content of the button',
      control: {
        type: 'text',
      },
    },
    onClick: {
      description: 'Function called when the button is clicked',
      action: 'clicked',
    },
  },
};

const Template: Story<IButton> = (args: IButton) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Click',
  variant: ButtonVariant.primary,
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'Primary',
  variant: ButtonVariant.primary,
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Secondary',
  variant: ButtonVariant.secondary,
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: 'Disabled',
  variant: ButtonVariant.system,
  disabled: true,
};

export const Bare = Template.bind({});
Bare.args = {
  children: 'Bare',
  variant: ButtonVariant.system,
  bare: true,
};
