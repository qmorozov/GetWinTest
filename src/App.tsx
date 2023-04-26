import RegisterLayout from './modules/RegisterLayout/RegisterLayout';
import { useEffect, useState } from 'react';
import AuthForm from './modules/AuthForm';

import CreateService from './API/apiService';
import Profile from './modules/AuthForm/Profile';
import { useAppSelector } from './hooks/redux';

const companyInfo: string[] = [
  'Автоматизация HR',
  'Оценка персонала',
  'Безопасность данных',
  'Мультиязычность',
  'Интеграция с job-порталами',
  'Синхронизация с Outlook',
  'Парсинг резюме',
  'Конструктор отчетности',
];

const App = () => {
  const user = useAppSelector((state) => state.AuthReducer.user);
  const isUserFilled = Boolean(
    Object.values(user).find((value) => value !== '' && value !== 0),
  );

  const form = isUserFilled ? <Profile /> : <AuthForm />;
  const formClass = isUserFilled ? 'profile-form' : 'auth-form';

  return (
    <>
      <RegisterLayout
        layoutInfo={
          <div className="auth-info">
            <h1>Войти в аккаунт</h1>
            <p>
              Введите ваш E-mail и пароль, чтобы начать использовать все
              преимущества платформы:
            </p>
            <ul>
              {companyInfo.map((info: string, index: number) => (
                <li key={index}>
                  <span></span>
                  <p>{info}</p>
                </li>
              ))}
            </ul>
          </div>
          // <div className="register-info">
          //   <h1>Регистрация пользователя</h1>
          //   <p>
          //     Заполните информацию о себе, чтобы начать использовать все
          //     преимущества платформы
          //   </p>
          // </div>
        }
        small
        classes={formClass}
        layoutForm={form}
        // layoutForm={<ConfirmPhone />}
      />
    </>
  );
};

export default App;
