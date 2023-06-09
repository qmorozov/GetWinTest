import { IUser } from '../../models/IUser';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: IUser;
  confirmPhone: boolean;
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
  confirmPhone: false,
};

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },

    updatePhone(state, action: PayloadAction<string>) {
      state.user = { ...state.user, phone: action.payload };
    },

    updateToken(state, action: PayloadAction<string>) {
      state.user = { ...state.user, token: action.payload };
    },

    clearUser(state) {
      state.user = initialState.user;
    },

    setConfirmPhone(state, action: PayloadAction<boolean>) {
      state.confirmPhone = action.payload;
    },
  },
});

export const { setUser, updatePhone, updateToken, clearUser, setConfirmPhone } =
  AuthSlice.actions;

export const AuthReducer = AuthSlice.reducer;

export default AuthReducer;
