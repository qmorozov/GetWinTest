import { Form, Input } from 'antd';
import Button from '../../UI/components/Button';
import { TimeIcon } from '../../UI/icons/TimeIcon';

interface ConfirmPhoneField {
  smsCode: string;
}

const ConfirmPhone = () => {
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
          <a href="tel:380507256009"> +38 (050) 725 60 09</a>
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

      <Button variant="primary">Подтвердить</Button>
    </Form>
  );
};

export default ConfirmPhone;
