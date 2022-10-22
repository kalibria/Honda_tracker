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
      if (action.payload === 'Success') {
        console.log(action.payload);
        state.loggedIn = true;
      }
    },
  },
});

export const { isAuth } = authSlice.actions;

export default authSlice.reducer;
