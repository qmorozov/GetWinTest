import { IUser } from '../../models/IUser';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: IUser;
  error: string;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: {
    id: 0,
    name: '',
    email: '',
  },
  isLoading: false,
  error: '',
};

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
  },
});

export const AuthReducer = AuthSlice.reducer;

export default AuthReducer;
