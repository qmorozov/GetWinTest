import { useState } from 'react';
import Button from '../../UI/components/Button';
import { Form, Input } from 'antd';
import { EyeIcon } from '../../UI/icons/EyeIcon';
import { ClosedEyeIcon } from '../../UI/icons/ClosedEyeIcon';
import CreateService from '../../API/apiService';

interface LoginFormField {
  email: string;
  password: string;
}

const Login = () => {
  const [form] = Form.useForm<LoginFormField>();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmitData = async (data: LoginFormField) => {
    CreateService.login(data.email, data.password)
      .then((response) => {
        console.log('Успешный логин', response.data);
      })
      .catch((error) => {
        console.log('Ошибка логина', error);
      });
  };

  return (
    <Form form={form} onFinish={handleSubmitData}>
      <Form.Item
        name="email"
        label="E-mail"
        className="input --password"
        rules={[
          { required: true, message: 'Укажите адрес эл. почты' },
          { type: 'email', message: 'Некорректный адрес эл. почты' },
        ]}
      >
        <Input placeholder="Адрес эл. почты" />
      </Form.Item>

      <Form.Item
        label="Пароль"
        name="confirm-password"
        className="input --password"
        rules={[{ required: true, message: 'Введите пароль' }]}
      >
        <Input
          suffix={
            <span
              className="show-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeIcon /> : <ClosedEyeIcon />}
            </span>
          }
          type={showPassword ? 'text' : 'password'}
          placeholder="Повторите ваш пароль"
        />
      </Form.Item>

      <Button type="submit" variant="primary">
        Войти
      </Button>
    </Form>
  );
};

export default Login;
