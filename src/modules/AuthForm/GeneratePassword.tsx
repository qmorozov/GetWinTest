import { FC, ReactNode, useEffect, useState } from 'react';
import md5 from 'md5';
import { CopyIcon } from '../../UI/icons/CopyIcon';
import { OneReloadIcon } from '../../UI/icons/OneReloadIcon';
import Dialog from '../../UI/components/Dialog';
import { useAppSelector } from '../../hooks/redux';

interface IGeneratePassword {
  isOpen: boolean;
  button: ReactNode;
  setIsOpen: (isOpen: boolean) => void;
  onPasswordGenerated: (password: string) => void;
}

const GeneratePassword: FC<IGeneratePassword> = ({
  button,
  isOpen = false,
  setIsOpen,
  onPasswordGenerated,
}) => {
  const [generatedPassword, setGeneratedPassword] = useState<string>('');

  const generateNewPassword = () => {
    const randomPassword = Math.random().toString(36).slice(-10);

    const passwordArray = randomPassword.split('');

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
    passwordArray.splice(
      Math.floor(Math.random() * passwordArray.length),
      0,
      randomLetter,
    );

    const newPassword = passwordArray.join('');

    setGeneratedPassword(newPassword);
  };

  const copyPasswordToClipboard = () => {
    navigator.clipboard.writeText(generatedPassword);
  };

  const handleApplyPassword = () => {
    setIsOpen(false);
    onPasswordGenerated(generatedPassword);
  };

  useEffect(() => {
    if (isOpen) {
      generateNewPassword();
    }
  }, [isOpen]);

  return (
    <Dialog
      isOpen={isOpen}
      button={button}
      setIsOpen={setIsOpen}
      classes="generate-password"
    >
      <div className="generate-password__label">
        <p>{generatedPassword}</p>
        <CopyIcon onClick={copyPasswordToClipboard} />
        <OneReloadIcon onClick={generateNewPassword} />
      </div>
      <button type="button" onClick={handleApplyPassword}>
        Применить сгенерированный пароль
      </button>
    </Dialog>
  );
};

export default GeneratePassword;
