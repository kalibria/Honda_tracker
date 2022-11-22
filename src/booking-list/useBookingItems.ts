import { datesManager } from 'src/booking-list/datesManager';
import { useBookingRides } from 'src/booking-list/useBookingRides';

export const useBookingItems = () => {
  const dates = datesManager.getFormattingDates();
  const bookingRides = useBookingRides();
};
