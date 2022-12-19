import { bookingItemsManager } from 'src/booking-list/BookingItemsManager';

describe('test bookingItemsManager class', () => {
  test('make one obj from two', () => {
    const input1 = [
      {
        date: 1669622973010,
        start: 1669582800000,
        end: 1669669199999,
      },
      {
        date: 1669709373010,
        start: 1669669200000,
        end: 1669755599999,
      },
      {
        date: 1669795773010,
        start: 1669755600000,
        end: 1669841999999,
      },
      {
        date: 1669882173010,
        start: 1669842000000,
        end: 1669928399999,
      },
      {
        date: 1669968573010,
        start: 1669928400000,
        end: 1670014799999,
      },
    ];
    const input2 = [
      {
        username: 'Мария',
        bookingOwner: 'miria_kalib',
        startTime: 1669719320000,
        description: 'Masha - buy presents for parents',
        carId: 'ho-123456',
        id: 1669719320000,
      },
      {
        username: 'Мария',
        bookingOwner: 'miria_kalib',
        startTime: 1669722920000,
        description: 'Masha - visit parents',
        carId: 'ho-123456',
        id: 1669722920000,
      },
      {
        username: 'Мария',
        bookingOwner: 'miria_kalib',
        startTime: 1669978520000,
        description: 'Зоопарк!',
        carId: 'ho-123456',
        id: 1669978520000,
      },
      {
        username: 'Мария',
        bookingOwner: 'miria_kalib',
        startTime: 1670410520000,
        description: 'За шубой',
        carId: 'ho-123456',
        id: 1670410520000,
      },
      {
        username: 'Мария',
        bookingOwner: 'miria_kalib',
        startTime: 1670583320000,
        description: 'К психологу в ЛОДЭ',
        carId: 'ho-123456',
        id: 1670583320000,
      },
    ];
    const output = {
      1669622973010: null,
      1669709373010: [
        {
          username: 'Мария',
          bookingOwner: 'miria_kalib',
          startTime: 1669719320000,
          description: 'Masha - buy presents for parents',
          carId: 'ho-123456',
          id: 1669719320000,
        },
        {
          username: 'Мария',
          bookingOwner: 'miria_kalib',
          startTime: 1669722920000,
          description: 'Masha - visit parents',
          carId: 'ho-123456',
          id: 1669722920000,
        },
      ],
      1669795773010: null,
      1669882173010: null,
      1669968573010: [
        {
          username: 'Мария',
          bookingOwner: 'miria_kalib',
          startTime: 1669978520000,
          description: 'Зоопарк!',
          carId: 'ho-123456',
          id: 1669978520000,
        },
      ],
    };

    expect(bookingItemsManager.makeOneArrayFromTwo(input1, input2)).toEqual(
      output,
    );
  });
});
