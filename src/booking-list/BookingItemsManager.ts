import { useEffect } from 'react';
import isWithinInterval from 'date-fns/isWithinInterval';
import loginForm from 'src/auth/components/loginForm/LoginForm';
import { datesManager } from 'src/booking-list/datesManager';
import {
  IBookingInfo,
  IConnectedDatesAndRides,
  IRideInfoWithFormattingDates,
  IRidesWithKeys,
  ICalendarRide,
  IStartEndDates,
} from 'src/booking-list/types';
import { useBookingRides } from 'src/booking-list/useBookingRides';

export class BookingItemsManager {
  formattingRideItems(rideItems: IBookingInfo[]) {
    return rideItems.reduce((accum: IRideInfoWithFormattingDates[], item) => {
      const formattingDate = datesManager.getFormattingDate(item.startTime);
      const rideItem: IRideInfoWithFormattingDates = {
        username: item.username,
        startDate: formattingDate,
        startTime: item.startTime,
        description: item.description,
      };
      accum.push(rideItem);
      return accum;
    }, []);
  }

  highlightKeys(rideItems: IBookingInfo[]) {
    return rideItems.reduce((accum: Record<string, IBookingInfo>, item) => {
      const key = item.startTime;
      accum[key] = item;

      return accum;
    }, {});
  }

  makeOneArrayFromTwo(
    datesArr: IStartEndDates[],
    ridesArr: IBookingInfo[],
  ): ICalendarRide {
    return datesArr.reduce(
      (accum: ICalendarRide, dateWithInterval: IStartEndDates) => {
        const ridesForCurrentDay = ridesArr.filter((ride) => {
          return isWithinInterval(ride.startTime, {
            start: dateWithInterval.start,
            end: dateWithInterval.end,
          });
        });

        if (ridesForCurrentDay.length > 0) {
          if (Array.isArray(accum[dateWithInterval.date])) {
            accum[dateWithInterval.date]?.push(...ridesForCurrentDay);
          } else {
            accum[dateWithInterval.date] = ridesForCurrentDay;
          }
        } else {
          accum[dateWithInterval.date] = null;
        }

        return accum;
      },
      {},
    );
  }
}

export const bookingItemsManager = new BookingItemsManager();
