import { createSlice } from '@reduxjs/toolkit';
import { logOut, setIsAuthenticated } from 'src/redux/authSlice';

interface IInitState {
  username: string;
  role: string;
  carId: string[];
}

const initState = {
  username: '',
  role: '',
  carId: [],
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
    setCarId: (state, action) => {
      state.carId = action.payload;
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

export const { setUserRole, deleteUserName, setCurrentUsername, setCarId } =
  userDataSlice.actions;
export default userDataSlice.reducer;
