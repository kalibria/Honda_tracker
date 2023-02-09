import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CompleteRideWindow } from 'src/booking-list/components/CompleteRideWindow';
import { ButtonUI } from 'src/ui-kit/ButtonUI';

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
  const deleteRide = () => {};

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
        <ButtonUI onClick={deleteRide}>{'Удалить'}</ButtonUI>
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
