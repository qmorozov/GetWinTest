import { http } from './http-common';
import { IUser } from '../models/IUser';

interface ILoginResponse {
  status: string;
  msg: string;
  user_data: IUser;
}

interface IConfirmPhoneResponse {
  status: string;
  msg: string;
}

interface IConfirmPhoneSendSmsResponse {
  status: string;
  msg: string;
}

class ProfileService {
  registerUser(user: { email: string; password: string; ref: string }) {
    return http.post('/registration', JSON.stringify(user));
  }

  confirmEmail(token: string, ref: string) {
    const data = { token, ref };
    return http.get('/confirmEmail', {
      params: { data: JSON.stringify(data) },
    });
  }

  loginUser(email: string, password: string) {
    const data = { email, password };
    return http.post<ILoginResponse>('/loginUser', JSON.stringify(data));
  }

  confirmPhone(userToken: string, confirmCode: number) {
    const data = { confirm_phone_code: confirmCode };
    const headers = { userToken };
    return http.post<IConfirmPhoneResponse>(
      '/profile/confirmPhone',
      JSON.stringify(data),
      { headers },
    );
  }

  confirmPhoneSendSms(userToken: string, phone: string) {
    const data = { phone };
    const headers = { userToken };
    return http.post<IConfirmPhoneSendSmsResponse>(
      '/profile/confirmPhoneSendSms',
      JSON.stringify(data),
      { headers },
    );
  }
}

export default new ProfileService();
