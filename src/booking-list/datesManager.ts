import { AMOUNT_OF_DAYS } from 'src/booking-list/constants';

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

  getFormattingDates() {
    return this.getDatesMS().map((item) => {
      return this.formatter.format(item);
    });
  }

  private formatter = new Intl.DateTimeFormat('ru', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}

export const datesManager = new DatesManager();
