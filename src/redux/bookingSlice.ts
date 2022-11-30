import { createSlice } from '@reduxjs/toolkit';
import { IRTKQueryBookingResponse } from 'src/booking-list/types';

const initState: { bookingList: IRTKQueryBookingResponse[] } = {
  bookingList: [
    {
      bookingDescription: '',
      bookingOwner: {
        username: '',
        firstName: '',
        roles: [],
        availableCars: [],
        providedCars: [],
        settings: {},
      },
      bookingOwnerId: '',
      bookingStartTime: '',
      carNumber: '',
    },
  ],
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState: initState,
  reducers: {
    setBookingsInfo: (state, action) => {
      state.bookingList = action.payload.bookings;
    },
  },
});

export const { setBookingsInfo } = bookingSlice.actions;
export default bookingSlice.reducer;
