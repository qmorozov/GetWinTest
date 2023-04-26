import { FC, ReactNode } from 'react';

export interface IRegisterLayout {
  layoutInfo: ReactNode;
  layoutForm: ReactNode;
  small?: boolean;
  classes?: string;
}

const RegisterLayout: FC<IRegisterLayout> = ({
  small = false,
  layoutInfo,
  layoutForm,
  classes,
}) => {
  return (
    <section className={`register-layout ${small ? '--small' : ''}`}>
      <div className="register-layout__info">{layoutInfo}</div>
      <div className={`register-layout__form ${classes ? classes : ''}`}>
        {layoutForm}
      </div>
    </section>
  );
};

export default RegisterLayout;
