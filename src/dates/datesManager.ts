import { addDays, endOfDay, startOfDay } from 'date-fns';
import { AMOUNT_OF_DAYS } from 'src/booking-list/constants';
import { IStartEndDates } from 'src/booking-list/types';
import { IMonths } from 'src/dates/types';

class DatesManager {
  getDatesForCalendarMS() {
    let arrOfDays: number[] = [];
    arrOfDays.length = AMOUNT_OF_DAYS - 1;
    arrOfDays.fill(0);

    const arrDatesMs = arrOfDays.reduce((acc: number[], item, index) => {
      let currentDate = new Date();
      let nextDateMS = +addDays(currentDate, index);
      acc.push(nextDateMS);

      return acc;
    }, []);
    return arrDatesMs;
  }

  getStartAndEndOfDays(datesMs: number[]) {
    return datesMs.reduce((accum: IStartEndDates[], item) => {
      const dateItem: IStartEndDates = {
        date: item,
        start: +startOfDay(new Date(item)),
        end: +endOfDay(new Date(item)),
      };
      accum.push(dateItem);
      return accum;
    }, []);
  }

  getAllMonths() {
    const months = Array.from({ length: 12 }, (_, monthNumber) => {
      const date = new Date(0, monthNumber);
      return date.toLocaleDateString('ru', { month: 'long' });
    });

    return months;
  }

  getAllDaysForMonth(month: number, year: number) {
    let date = new Date(year, month, 1);
    let days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

  getFormattingMonthDay(date: number) {
    return this.formatterMonthDay.format(date);
  }

  getFormattingDate(date: number) {
    return this.formatter.format(date);
  }

  getFormattingDateTime(date: number) {
    return this.formatterDateTime.format(date);
  }

  private formatterMonthDay = new Intl.DateTimeFormat('ru', {
    month: 'long',
    day: 'numeric',
  });

  private formatter = new Intl.DateTimeFormat('ru', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  private formatterDateTime = new Intl.DateTimeFormat('ru', {
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
}

export const datesManager = new DatesManager();
