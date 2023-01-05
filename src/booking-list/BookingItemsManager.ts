import isWithinInterval from 'date-fns/isWithinInterval';
import { datesManager } from 'src/dates/datesTimeManager';
import {
  IBookingInfo,
  ICalendarRide,
  IStartEndDates,
  IUICalendar,
} from 'src/booking-list/types';

export class BookingItemsManager {
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
      if (item[1] === null) {
        if (item[0] !== null) {
          accum.push({
            date: datesManager.getFormattingDate(Number(item[0])),
            info: {
              username: '',
              description: 'Свободно',
            },
            id: Math.round(+item[0] / 1000).toString(), //id in seconds
          });
        }
      } else {
        accum.push({
          date: datesManager.getFormattingDate(Number(item[0])),
          info: {
            username: item[1]?.[0].username,
            description: item[1][0].description,
          },
          id:
            item[1][0].bookingOwner +
            '$' +
            item[1][0].carId +
            '$' +
            item[1][0].id,
        });
      }

      return accum;
    }, []);
  }
}

export const bookingItemsManager = new BookingItemsManager();
