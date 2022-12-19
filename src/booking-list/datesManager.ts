import { AMOUNT_OF_DAYS } from 'src/booking-list/constants';
import { endOfDay, startOfDay } from 'date-fns';
import { IStartEndDates } from 'src/booking-list/types';

class DatesManager {
  getDatesMS() {
    let arrOfDays: number[] = [];
    arrOfDays.length = AMOUNT_OF_DAYS - 1;
    arrOfDays.fill(0);

    const currentDate = new Date();
    const currentDateMS = currentDate.getTime();

    const arrDatesMs = arrOfDays.reduce(
      (acc: number[], item, index) => {
        const currentDate = new Date(acc[index]);
        const nextDateMS = new Date().setDate(currentDate.getDate() + 1);
        acc.push(nextDateMS);

        return acc;
      },
      [currentDateMS],
    );
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

  getFormattingDate(date: number) {
    return this.formatter.format(date);
  }

  private formatter = new Intl.DateTimeFormat('ru', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}

export const datesManager = new DatesManager();
