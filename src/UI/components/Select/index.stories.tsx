import { Meta, Story } from '@storybook/react';
import CustomSelect, { ICustomSelect, IOption } from './index';

export default {
  component: CustomSelect,
  title: 'components/CustomSelect',
} as Meta;

const options: IOption[] = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

const Template: Story<ICustomSelect> = (args: ICustomSelect) => (
  <CustomSelect {...args} />
);

export const Default = Template.bind({});
Default.args = {
  options,
  placeholder: 'Select an option',
  onChange: (value: string) => console.log(value),
};

export const Required = Template.bind({});
Required.args = {
  options,
  placeholder: 'Select a required option',
  required: true,
  onChange: (value: string) => console.log(value),
};

export const WithDefaultValue = Template.bind({});
WithDefaultValue.args = {
  options,
  placeholder: 'Select an option with default value',
  defaultValue: 'option1',
  onChange: (value: string) => console.log(value),
};
