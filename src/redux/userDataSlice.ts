import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isAuth, logOut, setIsAuthenticated } from 'src/redux/authSlice';

interface IInitState {
  username: string;
  role: string;
}

const initState = {
  username: '',
  role: '',
};

const userDataSlice = createSlice({
  name: 'userData',
  initialState: initState,
  reducers: {
    setCurrentUsername: (state, action) => {
      state.username = action.payload;
    },
    deleteUserName: (state) => {
      state.username = '';
    },
    setUserRole: (state, action) => {
      state.role = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logOut, (state, { payload }) => {
      state.username = '';
    });

    builder.addCase(setIsAuthenticated, (state, { payload }) => {
      state.username = payload;
    });
  },
});

export const { setUserRole, deleteUserName, setCurrentUsername } =
  userDataSlice.actions;
export default userDataSlice.reducer;
