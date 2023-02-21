import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BookingDetailsCard } from 'src/bookingDetails/BookingDetailsCard';
import { EditBookingPage } from 'src/editBooking/EditBookingPage';
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

  // const [] = useState();

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
      setIsComplete(bookingsIdResult.currentData.booking.isFinished);
      setCarLocation(
        bookingsIdResult.currentData.booking.carLocationAfterRideText,
      );

      setUsername(bookingsIdResult.currentData.booking.bookingOwner.username);

      setDataFromResponse({
        firstname: bookingsIdResult.currentData.booking.bookingOwner.firstName,
        carId: bookingsIdResult.currentData.booking.carNumber,
        startTime: bookingsIdResult.currentData.booking.bookingStartTime,
        endTime: bookingsIdResult.currentData.booking.bookingEndTime,
        description: bookingsIdResult.currentData.booking.bookingDescription,
        isCompleted: isComplete ? 'Да' : 'Нет',
        carLocation: carLocation,
      });
    }
  }, [
    bookingsIdResult.isSuccess,
    bookingsIdResult.currentData,
    isComplete,
    carLocation,
    bookingsIdResult,
  ]);

  useEffect(() => {
    if (isComplete) {
      setCarLocation(
        bookingsIdResult.currentData.booking.bookingOwner.settings
          .rideCompletionText,
      );
    }
  }, [bookingsIdResult.currentData, isComplete]);

  return (
    <div className={'bookingPage'}>
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
                    isEdit={isEdit}
                    setIsEdit={setIsEdit}
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
        />
      )}
    </div>
  );
};
