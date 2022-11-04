import { createSlice } from '@reduxjs/toolkit';

export interface IAuth {
  isAuth: boolean;
}

const initialAuth: IAuth = {
  isAuth: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuth,
  reducers: {
    isAuth: (state, action) => {
      state.isAuth = true;
    },
    logOut: (state) => {
      state.isAuth = false;
    },
  },
});

export const { isAuth: setIsAuthenticated, logOut } = authSlice.actions;

export default authSlice.reducer;
