import dayjs from 'dayjs';
import { useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import { datesManager } from 'src/dates/datesTimeManager';

interface IFormObserver {
  setNewTime: React.Dispatch<React.SetStateAction<string>>;
}

interface IValues {
  car: string;
  description: string;
  driver: string;
  endDate: string;
  endTime: string;
  startDate: string;
  startTime: string;
}

export const FormObserver: React.FC<IFormObserver> = ({ setNewTime }) => {
  const { values } = useFormikContext<IValues>();
  useEffect(() => {
    const date = values.startDate + ', ' + values.startTime;

    const newIncreasedTime = datesManager.increaseTime(date);

    setNewTime(newIncreasedTime);
  }, [setNewTime, values]);

  return null;
};
