import React from 'react';
import { bookingItemsManager } from 'src/booking-list/BookingItemsManager';
import { CalendarItems } from 'src/booking-list/components/CalendarItems';
import { datesManager } from 'src/booking-list/datesManager';
import { useBookingRides } from 'src/booking-list/useBookingRides';

export const CalendarItemsWrapper = () => {
  const requestRides = useBookingRides();

  const datesMS = datesManager.getDatesMS();

  const startEndDay = datesManager.getStartAndEndOfDays(datesMS);

  const datesWithRides = bookingItemsManager.makeOneArrayFromTwo(
    startEndDay,
    requestRides,
  );

  const datesRidesForUI = bookingItemsManager.calendarItemMapToUI(
    Object.entries(datesWithRides),
  );

  console.log('datesRidesForUI', datesRidesForUI);

  return <CalendarItems datesRidesForUI={datesRidesForUI} />;
};
