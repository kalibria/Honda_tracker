import { amountOfDays } from 'src/booking-list/constants';

class DatesManager {
  getDatesMS() {
    let arrOfDays: number[] = [];
    arrOfDays.length = amountOfDays - 1;
    arrOfDays.fill(0);

    let currentDate = new Date();
    let currentDateMS = currentDate.getTime();

    const arrDatesMs = arrOfDays.reduce(
      (acc: number[], item, index) => {
        let currentDate = new Date(acc[index]);
        let nextDateMS = new Date().setDate(currentDate.getDate() + 1);
        acc.push(nextDateMS);

        return acc;
      },
      [currentDateMS],
    );
    return arrDatesMs;
  }

  getFormattingAllDates(dates: number[]) {
    return dates.map((item) => {
      return this.formatter.format(item);
    });
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
