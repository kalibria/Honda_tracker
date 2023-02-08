import React from 'react';
import { bookingItemsManager } from 'src/booking-list/BookingItemsManager';
import { CalendarItems } from 'src/booking-list/components/CalendarItems';
import { datesManager } from 'src/dates/datesTimeManager';
import { useBookingRides } from 'src/booking-list/useBookingRides';
import { useLazyGetBookingsQuery } from '../../services/hondaApi';

export const CalendarItemsWrapper = () => {
  const requestRides = useBookingRides();
  const datesMS = datesManager.getDatesForCalendarMS();

  const startEndDay = datesManager.getStartAndEndOfDays(datesMS);

  const datesWithRides = bookingItemsManager.makeOneArrayFromTwo(
    startEndDay,
    requestRides,
  );

  const datesRidesForUI = bookingItemsManager.calendarItemMapToUI(
    Object.entries(datesWithRides),
  );

  return <CalendarItems datesRidesForUI={datesRidesForUI} />;
};
