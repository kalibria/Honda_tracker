import { createSlice } from '@reduxjs/toolkit';

export interface IAuth {
  loggedIn: boolean;
}

const initialAuth: IAuth = {
  loggedIn: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuth,
  reducers: {
    isAuth: (state, action) => {
      if (action.payload.status === 'Success') {
        state.loggedIn = true;
      }
    },
  },
});

export const { isAuth } = authSlice.actions;

export default authSlice.reducer;
