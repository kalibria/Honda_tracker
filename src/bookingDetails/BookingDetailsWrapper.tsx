import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BookingDetailsCard } from 'src/bookingDetails/BookingDetailsCard';
import { EditBookingPage } from 'src/editBooking/EditBookingPage';
import { errorPath } from 'src/router/rootConstants';
import { Loading } from 'src/ui-kit/Loading';
import { useLazyGetBookingsIdQuery } from 'src/services/hondaApi';
import { ButtonsBar } from 'src/bookingDetails/ButtonsBar';

export const BookingDetailsWrapper = () => {
  const params = useParams();

  const [bookingsIdTrigger, bookingsIdResult] = useLazyGetBookingsIdQuery();

  const idParams = params.bookingId;

  const [isComplete, setIsComplete] = useState(false);

  const [isEdit, setIsEdit] = useState(false);

  const [startTimeSec, setStartTimeSec] = useState('');

  const [username, setUsername] = useState('');

  const [isOpenCompleteRideWindow, setIsOpenCompleteRideWindow] =
    useState(false);

  const navigate = useNavigate();

  const [dataFromResponse, setDataFromResponse] = useState({
    firstname: '',
    carId: '',
    startTime: '',
    endTime: '',
    description: '',
    isCompleted: '',
    carLocation: '',
  });

  const [requestData, setRequestData] = useState({
    username: '',
    carId: '',
    startTimeSec: '',
  });

  const [carLocation, setCarLocation] = useState('');

  useEffect(() => {
    if (idParams) {
      const parsedParams = idParams.split('$');
      const username = parsedParams[0];

      const carId = parsedParams[1];
      const timeSec = parsedParams[2];
      setStartTimeSec(timeSec);

      setRequestData({
        username: username,
        carId: carId,
        startTimeSec: timeSec,
      });

      bookingsIdTrigger({ username, carId, startTime: timeSec });
    }
  }, [bookingsIdTrigger, idParams]);

  useEffect(() => {
    if (bookingsIdResult.isSuccess) {
      setIsComplete(bookingsIdResult.data.booking.isFinished);
      setCarLocation(bookingsIdResult.data.booking.carLocationAfterRideText);

      setUsername(bookingsIdResult.data.booking.bookingOwner.username);

      setDataFromResponse({
        firstname: bookingsIdResult.data.booking.bookingOwner.firstName,
        carId: bookingsIdResult.data.booking.carNumber,
        startTime: bookingsIdResult.data.booking.bookingStartTime,
        endTime: bookingsIdResult.data.booking.bookingEndTime,
        description: bookingsIdResult.data.booking.bookingDescription,
        isCompleted: isComplete ? 'Да' : 'Нет',
        carLocation: carLocation,
      });
    } else if (bookingsIdResult.isError) {
      navigate(errorPath);
    }
  }, [
    bookingsIdResult.isSuccess,
    bookingsIdResult.data,
    isComplete,
    carLocation,
    bookingsIdResult,
  ]);

  useEffect(() => {
    if (isComplete) {
      setCarLocation(
        bookingsIdResult.data.booking.bookingOwner.settings.rideCompletionText,
      );
    }
  }, [bookingsIdResult.data, isComplete]);

  return (
    <div className={'bookingDetails'}>
      {bookingsIdResult.isLoading ? (
        <Loading />
      ) : (
        <>
          <div className={'bookingWrapper'}>
            {bookingsIdResult.isSuccess && !isEdit && (
              <>
                <div className={'bookingDetailCardWrapper'}>
                  <BookingDetailsCard
                    dataForCard={dataFromResponse}
                    isComplete={isComplete}
                  />
                  <ButtonsBar
                    startTimeSec={startTimeSec}
                    isComplete={isComplete}
                    requestData={requestData}
                    setIsEdit={setIsEdit}
                    isOpenCompleteRideWindow={isOpenCompleteRideWindow}
                    setIsOpenCompleteRideWindow={setIsOpenCompleteRideWindow}
                  />
                </div>
              </>
            )}
          </div>
        </>
      )}
      {bookingsIdResult.isSuccess && isEdit && (
        <EditBookingPage
          setIsEdit={setIsEdit}
          dataForFormik={dataFromResponse}
          isComplete={isComplete}
          username={username}
          setIsOpenCompleteRideWindow={setIsOpenCompleteRideWindow}
        />
      )}
    </div>
  );
};
