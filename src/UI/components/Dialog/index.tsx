import { FC, ReactNode, useEffect, useRef } from 'react';

export interface IDialog {
  classes?: string;
  isOpen: boolean;
  button: ReactNode;
  children: ReactNode;
  setIsOpen: (isOpen: boolean) => void;
}

const Dialog: FC<IDialog> = ({
  children,
  isOpen,
  button,
  setIsOpen,
  classes,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeDialog = (event: any) => {
      if (
        isOpen &&
        dialogRef.current &&
        !dialogRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', closeDialog);
    document.addEventListener('keydown', closeDialog);
    return () => {
      document.removeEventListener('mousedown', closeDialog);
      document.removeEventListener('keydown', closeDialog);
    };
  }, [isOpen]);

  return (
    <div ref={dialogRef} className={classes ? classes : ''}>
      {button}
      {isOpen && <div className="dialog-container">{children}</div>}
    </div>
  );
};

export default Dialog;
