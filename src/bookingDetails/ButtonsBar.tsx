import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CompleteRideWindow } from 'src/completeRide/CompleteRideWindow';
import { ButtonUI } from 'src/ui-kit/ButtonUI';
import { DeleteButton } from 'src/redux/deleteButton';

export interface IButtonsBar {
  startTimeSec: string;
  isComplete: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  requestData: {
    username: string;
    carId: string;
    startTimeSec: string;
  };
  isOpenCompleteRideWindow: boolean;
  setIsOpenCompleteRideWindow: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ButtonsBar = ({
  startTimeSec,
  isComplete,
  requestData,
  setIsEdit,
  isOpenCompleteRideWindow,
  setIsOpenCompleteRideWindow,
}: IButtonsBar) => {
  const navigate = useNavigate();

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
        <ButtonUI onClick={completeRide} disabled={isComplete}>
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
