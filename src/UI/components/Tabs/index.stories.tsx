import { Story, Meta } from '@storybook/react';
import CustomTabs, { ICustomTabs } from './index';

export default {
  title: 'Components/Tabs',
  component: CustomTabs,
} as Meta;

const Template: Story<ICustomTabs> = (args: ICustomTabs) => (
  <CustomTabs {...args} />
);

export const Default = Template.bind({});
Default.args = {
  tabs: [
    {
      key: '1',
      label: 'Tab 1',
      children: 'Content of tab 1',
    },
    {
      key: '2',
      label: 'Tab 2',
      children: 'Content of tab 2',
    },
    {
      key: '3',
      label: 'Tab 3',
      children: 'Content of tab 3',
    },
  ],
};
