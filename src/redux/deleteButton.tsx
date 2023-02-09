import React from 'react';
import { ButtonUI } from '../ui-kit/ButtonUI';

export const DeleteButton = () => {
  const deleteRide = () => {};

  return <ButtonUI onClick={deleteRide}>{'Удалить'}</ButtonUI>;
};
