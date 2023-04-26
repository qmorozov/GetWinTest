import { FC, HTMLProps } from 'react';
import { GoogleIcon } from '../../icons/GoogleIcon';
import { FacebookIcon } from '../../icons/FacebookIcon';
import { LinkedInIcon } from '../../icons/LinkedInIcon';

export enum SocialVariant {
  facebook = 'facebook',
  google = 'google',
  linkedin = 'linkedin',
}

export type SocialVariantString = keyof typeof SocialVariant;

export interface ISocial extends HTMLProps<HTMLAnchorElement> {
  link: string;
  variant: SocialVariantString;
}

const Social: FC<ISocial> = ({ variant, link, ...rest }) => {
  let IconComponent;

  switch (variant as SocialVariant) {
    case SocialVariant.facebook:
      IconComponent = FacebookIcon;
      break;
    case SocialVariant.google:
      IconComponent = GoogleIcon;
      break;
    case SocialVariant.linkedin:
      IconComponent = LinkedInIcon;
      break;
    default:
      console.error(`Unknown social variant: ${variant}`);
      return null;
  }

  return (
    <a
      {...rest}
      href={link}
      target="_blank"
      className="social"
      title={`Click to go to ${variant}`}
    >
      <IconComponent />
    </a>
  );
};

export default Social;
