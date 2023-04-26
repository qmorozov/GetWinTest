import RegisterLayout from './modules/RegisterLayout/RegisterLayout';
import { useEffect, useState } from 'react';
import AuthForm from './modules/AuthForm';

import CreateService from './API/apiService';
import Profile from './modules/AuthForm/Profile';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { AuthSlice, setUser } from './store/reducers/AuthSlice';
import ConfirmPhone from './modules/AuthForm/ConfirmPhone';
import Languages from './modules/Languages';

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
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.AuthReducer.user);
  const showConfirmPhone = useAppSelector(
    (state) => state.AuthReducer.confirmPhone,
  );
  const isUserFilled = Boolean(
    Object.entries(user).find(
      ([key, value]) => value !== '' && value !== 0 && key !== 'token',
    ),
  );

  const form = isUserFilled ? <Profile /> : <AuthForm />;
  const formClass = isUserFilled ? 'profile-form' : 'auth-form';
  const info = isUserFilled ? (
    <div className="register-info">
      <h1>Регистрация пользователя</h1>
      <p>
        Заполните информацию о себе, чтобы начать использовать все преимущества
        платформы
      </p>
    </div>
  ) : (
    <div className="auth-info">
      <h1>Войти в аккаунт</h1>
      <p>
        Введите ваш E-mail и пароль, чтобы начать использовать все преимущества
        платформы:
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
  );

  return (
    <>
      <RegisterLayout
        small
        layoutInfo={info}
        layoutForm={showConfirmPhone ? <ConfirmPhone /> : form}
        classes={showConfirmPhone ? 'confirm-phone-form' : formClass}
      />
      <Languages />
    </>
  );
};

export default App;
