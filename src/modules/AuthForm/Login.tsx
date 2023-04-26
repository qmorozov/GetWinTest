import { useState } from 'react';
import { Form, Input } from 'antd';
import { EyeIcon } from '../../UI/icons/EyeIcon';
import { ClosedEyeIcon } from '../../UI/icons/ClosedEyeIcon';
import ProfileService from '../../API/apiService';
import Button from '../../UI/components/Button';
import md5 from 'md5';

interface LoginFormField {
  email: string;
  password: string;
}

const Login = () => {
  const [form] = Form.useForm<LoginFormField>();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmitData = async ({ email, password }: LoginFormField) => {
    try {
      const hashedPassword = await md5(password);

      const response = await ProfileService.loginUser(email, hashedPassword);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
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
