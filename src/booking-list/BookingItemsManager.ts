import isWithinInterval from 'date-fns/isWithinInterval';
import { datesManager } from 'src/booking-list/datesManager';
import {
  IBookingInfo,
  IRideInfoWithFormattingDates,
  ICalendarRide,
  IStartEndDates,
  IUICalendar,
} from 'src/booking-list/types';

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

  calendarItemMapToUI(calendarItems: ICalendarRide[]) {
    return calendarItems.reduce((accum: IUICalendar[], item, index) => {
      console.log('item', item[1]?.[0].username);

      if (item[1] === null) {
        accum.push({
          date: datesManager.getFormattingDate(Number(item[0])),
          info: {
            username: '',
            description: 'Свободно',
          },
        });
      } else {
        accum.push({
          date: datesManager.getFormattingDate(Number(item[0])),
          info: {
            username: item[1]?.[0].username,
            description: item[1][0].description,
          },
        });
      }

      return accum;
    }, []);
  }
}

export const bookingItemsManager = new BookingItemsManager();
