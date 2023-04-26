import { Form, Input, message } from 'antd';
import { ExitIcon } from '../../UI/icons/ExitIcon';
import { MaskedInput } from 'antd-mask-input';
import Select, { IOption } from '../../UI/components/Select';
import Button from '../../UI/components/Button';
import button from '../../UI/components/Button';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  clearUser,
  setConfirmPhone,
  updatePhone,
} from '../../store/reducers/AuthSlice';
import CustomModal from '../../UI/components/Modal';
import { ErrorIcon } from '../../UI/icons/ErrorIcon';
import { SuccessIcon } from '../../UI/icons/SuccessIcon';

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
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.AuthReducer.user);

  const [form] = Form.useForm<ProfileFormField>();
  const [isExitModalVisible, setIsExitModalVisible] = useState<boolean>(false);
  const [isNextModalVisible, setIsNextModalVisible] = useState<boolean>(false);

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

  const handleConfirmPhone = () => {
    const phone = form.getFieldValue('phone');
    if (phone) {
      dispatch(updatePhone(phone));
      dispatch(setConfirmPhone(true));
    } else {
      message.error('Пожалуйста, введите свой телефон');
    }
  };

  const handleExit = () => {
    localStorage.removeItem('user');
    dispatch(clearUser());
  };

  const handleSubmitData = async (data: ProfileFormField) => {
    console.log(data);
    setIsNextModalVisible(true);
  };

  return (
    <>
      <Form
        form={form}
        className="profile"
        onFinish={handleSubmitData}
        initialValues={{ email: user.email }}
      >
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
                onClick={handleConfirmPhone}
              >
                Подтвердить телефон
              </button>
            }
          />
        </Form.Item>

        <Form.Item name="email" label="E-Mail" className="input">
          <Input placeholder="E-Mail" disabled />
        </Form.Item>

        <Button className="profile-next" variant="primary">
          Далее
        </Button>

        <Button
          bare
          type="button"
          className="profile-exit"
          onClick={() => setIsExitModalVisible(true)}
        >
          <ExitIcon />
          <span>Выход</span>
        </Button>
      </Form>
      <CustomModal
        open={isExitModalVisible}
        classes="exit-profile"
        onCancel={() => setIsExitModalVisible(false)}
      >
        <ErrorIcon />
        <div className="exit-profile__info">
          <span>Подтверждение выхода из аккаунта</span>
          <p>Вы действительно хотите выйти из своей учетной записи?</p>
        </div>
        <div className="exit-profile__btn">
          <Button
            variant="primary"
            onClick={() => setIsExitModalVisible(false)}
          >
            Продолжить
          </Button>
          <Button variant="secondary" onClick={handleExit}>
            Выйти
          </Button>
        </div>
      </CustomModal>
      <CustomModal
        fullScreen
        classes="next-profile"
        open={isNextModalVisible}
        onCancel={() => setIsNextModalVisible(false)}
      >
        <SuccessIcon />
        <p>
          Новая компания успешно создана и добавлена в базу данных. Пройдите
          верификацию, чтобы завершить регистрацию компании
        </p>
        <div className="next-profile__btn">
          <Button variant="primary">Пройти верификацию</Button>
          <Button variant="secondary">Перейти в Профиль Компаний</Button>
        </div>
      </CustomModal>
    </>
  );
};

export default Profile;
