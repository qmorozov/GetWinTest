import { IUser } from '../../models/IUser';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: IUser;
  token: string;
}

const initialState: AuthState = {
  user: {
    id: 0,
    name: '',
    email: '',
    token: '',
    phone: '',
    lname: '',
    sname: '',
    password: '',
    gender_id: 0,
    birth_date: '',
    is_confirm_email: 0,
    is_confirm_phone: 0,
    is_profile_created: 0,
    confirm_phone_code: '',
    reset_password_token: '',
  },
  token: '',
};

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },

    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
  },
});

export const { setUser, setToken } = AuthSlice.actions;
export const AuthReducer = AuthSlice.reducer;

export default AuthReducer;
