import React from 'react';
import { ButtonUI } from 'src/commonComponents/ButtonUI';

export const ButtonsBar = () => {
  const goBack = () => {};
  const completeRide = () => {};
  const editRide = () => {};
  const deleteRide = () => {};

  return (
    <div>
      <ButtonUI onClick={goBack}>{'Назад'}</ButtonUI>
      <ButtonUI onClick={completeRide}>{'Завершить поездку'}</ButtonUI>
      <ButtonUI onClick={editRide}>{'Редактировать'}</ButtonUI>
      <ButtonUI onClick={deleteRide}>{'Удалить'}</ButtonUI>
    </div>
  );
};
