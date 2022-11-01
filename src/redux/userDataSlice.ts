import { createSlice } from '@reduxjs/toolkit';

interface IInitState {
  role: string;
}

const initState = {
  role: '',
};

const userDataSlice = createSlice({
  name: 'userData',
  initialState: initState,
  reducers: {
    setUseRole: (state, action) => {
      state.role = action.payload;
    },
  },
});

export const { setUseRole } = userDataSlice.actions;
export default userDataSlice.reducer;
