import { useState } from 'react';
import { Form, Input, message } from 'antd';
import md5 from 'md5';
import { useAppDispatch } from '../../hooks/redux';
import { AuthSlice } from '../../store/reducers/AuthSlice';
import ProfileService from '../../API/apiService';
import { ClosedEyeIcon } from '../../UI/icons/ClosedEyeIcon';
import { EyeIcon } from '../../UI/icons/EyeIcon';
import Button from '../../UI/components/Button';

interface LoginFormField {
  email: string;
  password: string;
}

const Login = () => {
  const dispatch = useAppDispatch();

  const [form] = Form.useForm<LoginFormField>();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmitData = async ({ password, email }: LoginFormField) => {
    try {
      const hashedPassword = await md5(password);

      const { data } = await ProfileService.loginUser(email, hashedPassword);

      if (data?.user_data) {
        dispatch(AuthSlice.actions.setUser(data.user_data));
      } else {
        message.error(data.msg);
      }
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
        name="password"
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
          placeholder="Введите пароль"
        />
      </Form.Item>

      <Button type="submit" variant="primary">
        Войти
      </Button>
    </Form>
  );
};

export default Login;
