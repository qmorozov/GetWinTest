import { ChangeEvent, useEffect, useState } from 'react';
import { Input, Form } from 'antd';
import { EyeIcon } from '../../UI/icons/EyeIcon';
import { ClosedEyeIcon } from '../../UI/icons/ClosedEyeIcon';
import { KeyIcon } from '../../UI/icons/KeyIcon';
import { AxiosResponse } from 'axios';
import { useAppDispatch } from '../../hooks/redux';
import { AuthSlice } from '../../store/reducers/AuthSlice';
import ProfileService from '../../API/apiService';
import GeneratePassword from './GeneratePassword';
import Button from '../../UI/components/Button';
import CustomModal from '../../UI/components/Modal';
import { SuccessIcon } from '../../UI/icons/SuccessIcon';
import md5 from 'md5';

interface RegisterFormField {
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const dispatch = useAppDispatch();

  const [form] = Form.useForm<RegisterFormField>();

  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [validationState, setValidationState] = useState({
    length: false,
    letter: false,
    upperCase: false,
  });
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const handlePasswordGenerated = (generatedPassword: string) => {
    setPassword(generatedPassword);
    form.setFieldsValue({ password: generatedPassword });
  };

  useEffect(() => {
    const lengthRegex = /^(?=.*[A-Za-z0-9]).{8,14}$/;
    const letterRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,14}$/;
    const upperCaseRegex = /(?=.*[a-z])(?=.*[A-Z])[A-Za-z0-9]{8,14}$/;

    const isValid =
      lengthRegex.test(password) &&
      letterRegex.test(password) &&
      upperCaseRegex.test(password) &&
      form.getFieldValue('email');

    setIsFormValid(isValid);
    setValidationState({
      length: lengthRegex.test(password),
      letter: letterRegex.test(password),
      upperCase: upperCaseRegex.test(password),
    });
  }, [form, password]);

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmitData = async (values: RegisterFormField) => {
    let token = '';

    const user = {
      email: values.email,
      password: md5(values.password),
      ref: window.location.href,
    };

    if (isFormValid) {
      ProfileService.registerUser(user)
        .then(({ data }: AxiosResponse) => {
          token = data.user_data.token;
          localStorage.setItem('token', token);
          dispatch(AuthSlice.actions.setToken(data.user_data));
          setIsModalVisible(true);
          form.resetFields();
          setPassword('');
        })
        .then(() => {
          return ProfileService.confirmEmail(token, window.location.href);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <>
      <Form form={form} onFinish={handleSubmitData}>
        <Form.Item
          name="email"
          label="E-mail"
          className="input --password"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите свой email!',
            },
            {
              type: 'email',
              message: 'Пожалуйста, введите действительный email!',
            },
          ]}
          validateTrigger={['onBlur']}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Пароль"
          className="input --password"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите свой пароль!',
            },
          ]}
        >
          <Input
            type={showPassword ? 'text' : 'password'}
            value={password}
            suffix={
              <>
                <GeneratePassword
                  onPasswordGenerated={handlePasswordGenerated}
                  isOpen={dialogVisible}
                  setIsOpen={setDialogVisible}
                  button={
                    <span
                      className="generate-password___key"
                      onClick={() => setDialogVisible(true)}
                    >
                      <KeyIcon className={dialogVisible ? '--open' : ''} />
                    </span>
                  }
                />
                <span
                  className="show-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeIcon /> : <ClosedEyeIcon />}
                </span>
              </>
            }
            onChange={handlePasswordChange}
            placeholder="Password"
          />
        </Form.Item>

        {password && (
          <ul className="password-validate">
            <li className={validationState.length ? '--completed' : ''}>
              Длина пароля должна быть не менее 8 и не более 14 символов
            </li>
            <li className={validationState.letter ? '--completed' : ''}>
              Пароль должен состоять из букв латинского алфавита (A-z), арабских
              цифр (0-9)
            </li>
            <li className={validationState.upperCase ? '--completed' : ''}>
              Буквенная часть пароля должна содержать как строчные, так и
              прописные (заглавные) буквы
            </li>
          </ul>
        )}

        <Form.Item
          name="confirm-password"
          label="Повторите пароль"
          className="input --password"
          rules={[
            { required: true, message: 'Повторите пароль' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Пароли не совпадают'));
              },
            }),
          ]}
        >
          <Input
            suffix={
              <span
                className="show-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeIcon /> : <ClosedEyeIcon />}
              </span>
            }
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Подтвердите пароль"
          />
        </Form.Item>

        <Button type="submit" variant="primary">
          Зарегистрироваться
        </Button>
      </Form>

      <CustomModal
        fullScreen
        open={isModalVisible}
        classes="registered-profile"
        onCancel={() => setIsModalVisible(false)}
      >
        <SuccessIcon />
        <p>
          Аккаунт был успешно зарегистрирован. На ваш E-Mail отправлено письмо с
          ссылкой для подтверждения
        </p>
      </CustomModal>
    </>
  );
};

export default Register;
