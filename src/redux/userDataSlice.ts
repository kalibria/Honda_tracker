import { createSlice } from '@reduxjs/toolkit';
import { logOut, setIsAuthenticated } from 'src/redux/authSlice';

const initState = {
  username: '',
  firstName: '',
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
    setFirstName: (state, action) => {
      state.firstName = action.payload;
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

export const {
  setUserRole,
  deleteUserName,
  setCurrentUsername,
  setCarId,
  setFirstName,
} = userDataSlice.actions;
export default userDataSlice.reducer;
