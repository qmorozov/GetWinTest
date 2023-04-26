export interface IUser {
  id: number;
  name: string;
  token: string;
  email: string;
  phone: string;
  lname: string;
  sname: string;
  password: string;
  gender_id: number;
  birth_date: string;
  is_confirm_email: number;
  is_confirm_phone: number;
  is_profile_created: number;
  confirm_phone_code: string;
  reset_password_token: string;
}
