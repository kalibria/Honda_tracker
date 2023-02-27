import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CompleteRideWindow } from 'src/completeRide/CompleteRideWindow';
import { ButtonUI } from 'src/ui-kit/ButtonUI';
import { DeleteButton } from 'src/redux/deleteButton';

export interface IButtonsBar {
  startTimeSec: string;
  isComplete: boolean;
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  requestData: {
    username: string;
    carId: string;
    startTimeSec: string;
  };
}

export const ButtonsBar = ({
  startTimeSec,
  isComplete,
  requestData,
  isEdit,
  setIsEdit,
}: IButtonsBar) => {
  const navigate = useNavigate();
  const [isOpenCompleteRideWindow, setIsOpenCompleteRideWindow] =
    useState(false);

  const goBack = () => {
    navigate(-1);
  };
  const completeRide = () => {
    setIsOpenCompleteRideWindow(true);
  };
  const editRide = () => {
    setIsEdit(true);
  };

  return (
    <>
      <div className={'bookingButtonsWrapper'}>
        <ButtonUI onClick={goBack}>{'Назад'}</ButtonUI>
        <ButtonUI onClick={completeRide} disabled={isComplete ? true : false}>
          {'Завершить поездку'}
        </ButtonUI>
        <ButtonUI onClick={editRide}>{'Редактировать'}</ButtonUI>
        <DeleteButton requestData={requestData} />
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
