import { Form, Input } from 'antd';
import { ExitIcon } from '../../UI/icons/ExitIcon';
import { MaskedInput } from 'antd-mask-input';
import Select, { IOption } from '../../UI/components/Select';
import Button from '../../UI/components/Button';
import button from '../../UI/components/Button';

const sexOptions: IOption[] = [
  { value: 'man', label: 'Мужчина' },
  { value: 'woman', label: 'Женщина' },
  { value: 'other', label: 'Другой' },
];

interface ProfileFormField {
  name: string;
  sex: string;
  phone: string;
  email: string;
  lastName: string;
  birthday: string;
  middleName: string;
}
const Profile = () => {
  const [form] = Form.useForm<ProfileFormField>();

  const handleSubmitData = async (data: ProfileFormField) => {
    console.log(data);
  };

  const validatePhone = (rule: any, value: string) => {
    if (value && value.replace(/[^0-9]/g, '').length !== 12) {
      return Promise.reject('Неправильный формат номера телефона!');
    }
    return Promise.resolve();
  };

  const validateDate = (rule: any, value: string) => {
    if (value && !/\d{2}\/\d{2}\/\d{4}/.test(value)) {
      return Promise.reject('Неправильный формат даты!');
    }
    return Promise.resolve();
  };

  return (
    <Form form={form} onFinish={handleSubmitData} className="profile">
      <h2 className="profile__title">Профиль пользователя</h2>
      <div className="field-group">
        <Form.Item
          name="lastName"
          label="Фамилия"
          className="input"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите свою фамилию!',
            },
          ]}
        >
          <Input placeholder="Михайлов" />
        </Form.Item>

        <Form.Item
          name="name"
          label="Имя"
          className="input"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите свое имя!',
            },
          ]}
        >
          <Input placeholder="Михаил" />
        </Form.Item>

        <Form.Item
          name="middleName"
          label="Отчество"
          className="input"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите вашу фамилию!',
            },
          ]}
        >
          <Input placeholder="Михайлович" />
        </Form.Item>
      </div>

      <Form.Item
        name="birthday"
        label="Дата рождения"
        className="input"
        rules={[
          {
            required: true,
            message: 'Пожалуйста, укажите свой день рождения!',
          },
          {
            validator: validateDate,
          },
        ]}
      >
        <MaskedInput mask="00/00/0000" />
      </Form.Item>

      <Select
        placeholder="Пол"
        options={sexOptions}
        onChange={(value: string) => console.log(value)}
      />

      <Form.Item
        name="phone"
        label="Телефон"
        className="input"
        rules={[
          {
            required: true,
            message: 'Пожалуйста, введите свой телефон!',
          },
          {
            validator: validatePhone,
          },
        ]}
      >
        <MaskedInput
          mask={'+38 (000) 000 00 00'}
          suffix={
            <button
              type="button"
              className="profile-confirm-phone"
              onClick={() => console.log('click')}
            >
              Подтвердить телефон
            </button>
          }
        />
      </Form.Item>

      <Form.Item name="email" label="E-Mail" className="input">
        <Input placeholder="E-Mail" />
      </Form.Item>

      <Button className="profile-next" variant="primary">
        Далее
      </Button>
      <Button className="profile-exit" bare>
        <ExitIcon />
        <span>Выход</span>
      </Button>
    </Form>
  );
};

export default Profile;
