import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';

import { useFormik } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IUsersSettings } from 'src/createNewBooking/bookingTypes';
import { hondaApi, useLazyUpdateUserDataQuery } from 'src/services/hondaApi';

import { carProvider } from 'src/settings/constants';
import { debounce } from 'lodash';
import { ButtonUI } from 'src/ui-kit/ButtonUI';

export const SettingsPage = () => {
  const selectMeResult = hondaApi.endpoints.getMe.select({});
  const meResultSelector = useSelector(selectMeResult);

  const arg = meResultSelector.data ? meResultSelector.data.username : '';

  const selectUserData = hondaApi.endpoints.getUser.select(arg);

  const {
    data: { user },
  } = useSelector(selectUserData);

  const isCarProvider = user.roles.includes(carProvider);

  const [initNotifiedWhenCreated, setInitNotifiedWhenCreated] = useState(false);

  const [initNotifiedWhenChanged, setNotifiedWhenChanged] = useState(false);

  const [rideCompletionText, setRideCompletionText] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (meResultSelector.isSuccess && user) {
      setRideCompletionText(user.settings.rideCompletionText);
      setInitNotifiedWhenCreated(
        user.settings.notifications.getNotifiedAboutNewBookings,
      );

      setNotifiedWhenChanged(
        user.settings.notifications.getNotifiedAboutBookingChanges,
      );
    }
  }, [meResultSelector.isSuccess, user]);

  const [triggerUpdate] = useLazyUpdateUserDataQuery();

  const formik = useFormik({
    initialValues: {
      isCreated: initNotifiedWhenCreated,
      isChanged: initNotifiedWhenChanged,
      textField: rideCompletionText,
    },
    onSubmit: (values) => {},
    enableReinitialize: true,
  });

  const debounceUpdate = useCallback(
    debounce(async (newSettings: IUsersSettings) => {
      const settings: IUsersSettings = {
        settings: {
          rideCompletionText: newSettings.settings.rideCompletionText,
          notifications: {
            getNotifiedWhenBookingChanged:
              newSettings.settings.notifications.getNotifiedWhenBookingChanged,
            getNotifiedWhenBookingCreated:
              newSettings.settings.notifications.getNotifiedWhenBookingCreated,
          },
        },
      };
      triggerUpdate({ username: user.username, settings });
    }, 2000),
    [],
  );

  useEffect(() => {
    const newSettings: IUsersSettings = {
      settings: {
        rideCompletionText: formik.values.textField,
        notifications: {
          getNotifiedWhenBookingChanged: formik.values.isChanged,
          getNotifiedWhenBookingCreated: formik.values.isCreated,
        },
      },
    };
    debounceUpdate(newSettings);
  }, [
    formik.values.isChanged,
    formik.values.isCreated,
    formik.values.textField,
  ]);

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <div className={'sm:w-60 mainContainer appBackground'}>
      {user && (
        <form
          className={'flex flex-col space-y-3.5 formWrapper'}
          onChange={formik.handleChange}>
          {isCarProvider && (
            <div className={'widthFormItem'}>
              <FormControl component="fieldset" variant="standard">
                <FormLabel component="legend">
                  {'Получать уведомления когда ...'}
                </FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        name={'isCreated'}
                        checked={formik.values.isCreated}
                        onChange={formik.handleChange}
                        value={formik.values.isCreated}
                      />
                    }
                    label={'авто забронировано'}
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        name={'isChanged'}
                        checked={formik.values.isChanged}
                        onChange={formik.handleChange}
                        value={formik.values.isChanged}
                      />
                    }
                    label={'бронирование изменено'}
                  />
                </FormGroup>
              </FormControl>
            </div>
          )}
          <div className={'widthFormItem'}>
            <TextField
              fullWidth
              id="fullWidth"
              label={'Где оставлен автомобиль?'}
              variant="standard"
              name={'textField'}
              value={formik.values.textField}
            />
          </div>
        </form>
      )}
      <ButtonUI onClick={handleClick}>{'Назад'}</ButtonUI>
    </div>
  );
};
