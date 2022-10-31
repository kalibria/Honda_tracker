import { createSlice } from '@reduxjs/toolkit';

export interface IAuth {
  cookieId: boolean;
  username: string;
}

const initialAuth: IAuth = {
  cookieId: false,
  username: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuth,
  reducers: {
    isAuth: (state, action) => {
      state.cookieId = true;
      state.username = action.payload;
    },
    logOut: (state) => {
      state.cookieId = false;
      state.username = '';
    },
  },
});

export const { isAuth, logOut } = authSlice.actions;

export default authSlice.reducer;
