import {
  FC,
  ReactNode,
  MouseEvent,
  KeyboardEvent,
  ButtonHTMLAttributes,
} from 'react';
import classNames from 'classnames';

import './index.scss';
import '../../../styles/global.scss';

export enum ButtonVariant {
  system = 'system',
  primary = 'primary',
  secondary = 'secondary',
}

export type ButtonVariantString = keyof typeof ButtonVariant;

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  bare?: boolean;
  children: ReactNode;
  variant?: ButtonVariantString;
  onClick?: (
    event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>,
  ) => void;
  className?: string;
}

const Button: FC<IButton> = ({
  onClick,
  children,
  bare = false,
  className,
  variant = ButtonVariant.system,
  ...rest
}) => {
  const buttonClass = classNames(
    {
      btn: !bare,
      '--system': variant === ButtonVariant.system,
      '--primary': variant === ButtonVariant.primary,
      '--secondary': variant === ButtonVariant.secondary,
    },
    className,
  );

  return (
    <button
      {...rest}
      onClick={onClick}
      aria-label={rest['aria-label']}
      className={buttonClass}
    >
      {children}
    </button>
  );
};

export default Button;
