import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CompleteRideWindow } from 'src/booking-list/components/CompleteRideWindow';
import { ButtonUI } from 'src/commonComponents/ButtonUI';

export const ButtonsBar = () => {
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
        <ButtonUI onClick={completeRide}>{'Завершить поездку'}</ButtonUI>
        <ButtonUI onClick={editRide}>{'Редактировать'}</ButtonUI>
        <ButtonUI onClick={deleteRide}>{'Удалить'}</ButtonUI>
      </div>
      {isOpenCompleteRideWindow && <CompleteRideWindow />}
    </>
  );
};
