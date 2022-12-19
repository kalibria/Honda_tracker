import { createSlice } from '@reduxjs/toolkit';
import { IBookingInfo } from 'src/booking-list/types';

const initState: { bookingList: IBookingInfo[] } = {
  bookingList: [
    {
      username: '',
      bookingOwner: '',
      startTime: 0,
      description: '',
      carId: '',
      id: 0,
    },
  ],
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState: initState,
  reducers: {
    setBookingsInfo: (state, action) => {
      state.bookingList = action.payload;
    },
  },
});

export const { setBookingsInfo } = bookingSlice.actions;
export default bookingSlice.reducer;
