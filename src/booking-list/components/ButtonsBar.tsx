import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CompleteRideWindow } from 'src/booking-list/components/CompleteRideWindow';
import { ButtonUI } from 'src/ui-kit/ButtonUI';
import { DeleteButton } from '../../redux/deleteButton';

export interface IButtonsBar {
  startTimeSec: string;
  isComplete: boolean;
}

export const ButtonsBar = ({ startTimeSec, isComplete }: IButtonsBar) => {
  const navigate = useNavigate();
  const [isOpenCompleteRideWindow, setIsOpenCompleteRideWindow] =
    useState(false);

  const goBack = () => {
    navigate(-1);
  };
  const completeRide = () => {
    setIsOpenCompleteRideWindow(true);
  };
  const editRide = () => {};

  return (
    <>
      <div className={'bookingButtonsWrapper'}>
        <ButtonUI onClick={goBack}>{'Назад'}</ButtonUI>
        <ButtonUI onClick={completeRide} disabled={isComplete ? true : false}>
          {'Завершить поездку'}
        </ButtonUI>
        <ButtonUI onClick={editRide} disabled={isComplete ? true : false}>
          {'Редактировать'}
        </ButtonUI>
        <DeleteButton />
      </div>
      {isOpenCompleteRideWindow && (
        <CompleteRideWindow
          startTimeSec={startTimeSec}
          setIsOpenCompleteRideWindow={setIsOpenCompleteRideWindow}
        />
      )}
    </>
  );
};
