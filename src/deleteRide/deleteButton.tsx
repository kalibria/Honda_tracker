import React, { useEffect } from 'react';
import { ButtonUI } from 'src/ui-kit/ButtonUI';
import { useDeleteBookingMutation } from 'src/services/hondaApi';
import { useNavigate } from 'react-router-dom';
import { bookingListPath, errorPath } from 'src/router/rootConstants';

export interface IDeleteButton {
  requestData: { username: string; carId: string; startTimeSec: string };
}

export const DeleteButton = ({ requestData }: IDeleteButton) => {
  const [deleteBookingTrigger, resultDeleteBooking] =
    useDeleteBookingMutation();
  const navigate = useNavigate();
  const deleteRide = () => {
    deleteBookingTrigger(requestData);
  };

  useEffect(() => {
    if (resultDeleteBooking.isSuccess) {
      navigate(bookingListPath);
    }
    if (resultDeleteBooking.error) {
      navigate(errorPath);
    }
  }, [resultDeleteBooking.isSuccess, resultDeleteBooking.error, navigate]);

  return <ButtonUI onClick={deleteRide}>{'Удалить'}</ButtonUI>;
};
