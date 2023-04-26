import Tabs from '../../UI/components/Tabs';
import { TabsProps } from 'antd';
import Social from '../../UI/components/Social';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';

const AuthForm = () => {
  const authTabs: TabsProps['items'] = [
    {
      key: 'login',
      label: 'Login',
      children: <Login />,
    },
    {
      key: 'register',
      label: 'Register',
      children: <Register />,
    },
  ];

  return (
    <div className="auth">
      <Tabs tabs={authTabs} />
      <div className="auth-social">
        <span>Или войдите с помощью</span>
        <div className="socials-wrapper">
          <Social link="/" variant="google" />
          <Social link="/" variant="facebook" />
          <Social link="/" variant="linkedin" />
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
