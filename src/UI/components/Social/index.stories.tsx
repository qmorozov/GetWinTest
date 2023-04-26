import { Meta, Story } from '@storybook/react';
import Social, { ISocial, SocialVariant } from './index';
import { FacebookIcon } from '../../icons/FacebookIcon';
import { GoogleIcon } from '../../icons/GoogleIcon';
import { LinkedInIcon } from '../../icons/LinkedInIcon';

export default {
  component: Social,
  title: 'Components/Social',
} as Meta;

const Template: Story<ISocial> = (args: ISocial) => <Social {...args} />;

export const Facebook = Template.bind({});
Facebook.args = {
  variant: SocialVariant.facebook,
  link: 'https://www.facebook.com/',
  children: <FacebookIcon />,
};

export const Google = Template.bind({});
Google.args = {
  variant: SocialVariant.google,
  link: 'https://www.google.com/',
  children: <GoogleIcon />,
};

export const LinkedIn = Template.bind({});
LinkedIn.args = {
  variant: SocialVariant.linkedin,
  link: 'https://www.linkedin.com/',
  children: <LinkedInIcon />,
};
