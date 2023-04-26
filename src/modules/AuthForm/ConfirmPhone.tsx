import { Form, Input } from 'antd';
import Button from '../../UI/components/Button';
import { TimeIcon } from '../../UI/icons/TimeIcon';
import { ArrowIcon } from '../../UI/icons/ArrowIcon';
import { setConfirmPhone } from '../../store/reducers/AuthSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

interface ConfirmPhoneField {
  smsCode: string;
}

const ConfirmPhone = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.AuthReducer.user);

  const [form] = Form.useForm<ConfirmPhoneField>();

  const handleSubmitData = async (data: ConfirmPhoneField) => {
    console.log(data);
  };

  return (
    <Form form={form} onFinish={handleSubmitData} className="confirm-phone">
      <div className="confirm-phone__info">
        <h2 className="confirm-phone__title">Подтверждение телефона</h2>
        <p className="confirm-phone__text">
          Мы отправили SMS с 6-значным кодом подтверждения на номер
          <a href={`tel:${user.phone}`}> {user.phone}</a>
        </p>
      </div>
      <div className="confirm-phone__field">
        <Form.Item
          name="smsCode"
          label="SMS-код"
          className="input"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, код из SMS!',
            },
          ]}
        >
          <Input placeholder="Укажите код" />
        </Form.Item>
        <div className="confirm-phone__time">
          <TimeIcon />2 мин 55 сек
        </div>
      </div>

      <Button
        bare
        type="button"
        className="confirm-phone__leave-btn"
        onClick={() => dispatch(setConfirmPhone(false))}
      >
        <ArrowIcon /> Назад
      </Button>
      <Button variant="primary">Подтвердить</Button>
    </Form>
  );
};

export default ConfirmPhone;
