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
    isAuth: (state) => {
      state.cookieId = true;
    },
    logOut: (state) => {
      state.cookieId = false;
      state.username = '';
    },
    setCurrentUsername: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const { isAuth, logOut, setCurrentUsername } = authSlice.actions;

export default authSlice.reducer;
