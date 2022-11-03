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
    isAuth: (state, action) => {
      state.cookieId = true;
    },
    logOut: (state) => {
      state.cookieId = false;
    },
  },
});

export const { isAuth: setIsAuthenticated, logOut } = authSlice.actions;

export default authSlice.reducer;
