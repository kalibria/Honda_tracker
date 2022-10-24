import { createSlice } from '@reduxjs/toolkit';

export interface IAuth {
  cookieId: boolean;
}

const initialAuth: IAuth = {
  cookieId: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuth,
  reducers: {
    isAuth: (state) => {
      state.cookieId = true;
    },
  },
});

export const { isAuth } = authSlice.actions;

export default authSlice.reducer;
