import Button from '@mui/material/Button';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { myRtkQueryResultProcessor } from 'src/redux/rtkQueryResultProcessor';
import { bookingListPath } from 'src/router/rootConstants';
import { useLazySignUpQuery } from 'src/services/hondaApi';
import { myLocalStorage } from 'src/services/localStorage';
import { AlertForm, MyTextInput } from 'src/ui-kit/components';
import * as Yup from 'yup';

export const SignUpForm = () => {
  const [trigger, result] = useLazySignUpQuery();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (result.isSuccess) {
      myLocalStorage.setItem('RefreshToken', result.currentData.RefreshToken);
      sessionStorage.setItem('AccessToken', result.currentData.AccessToken);
      navigate(bookingListPath);
    } else if (result.isError) {
      setErrorMsg(myRtkQueryResultProcessor.getErrorMessage(result.error));
    }
  }, [navigate, result]);

  return (
    <div className="mainContainer">
      <div className="flex flex-col justify-center items-center formWrapper">
        <div className="w-24 mb-4">
          <img
            src="https://www.nicepng.com/png/detail/138-1388174_login-account-icon.png"
            alt="Sign-up"
          />
        </div>
        <h1 className="text-center">Регистрация</h1>

        <Formik
          initialValues={{
            nickname: '',
            email: '',
            password: '',
          }}
          validationSchema={Yup.object({
            nickname: Yup.string().required('Required'),
            email: Yup.string().required('Required'),
            password: Yup.string()
              .max(20, 'Must be 20 characters or less')
              .required('Required'),
          })}
          onSubmit={(values, { setSubmitting }) => {
            trigger({
              firstName: values.nickname,
              username: values.email,
              password: values.password,
              providedCarIds: [],
              availableCarIds: ['ho-12345'],
            });

            setSubmitting(false);
          }}>
          {(props) => {
            return (
              <Form className="flex flex-col space-y-3.5 widthFormItem">
                <MyTextInput
                  id={'outlined-nickname-input'}
                  label={'Nickname'}
                  type={'text'}
                  autoComplete={'current-nickname'}
                  name={'nickname'}
                />
                <MyTextInput
                  id={'outlined-login-input'}
                  label={'Email'}
                  type={'email'}
                  autoComplete={'current-login'}
                  name={'email'}
                />
                <MyTextInput
                  id={'outlined-password-input'}
                  label={'Password'}
                  type={'password'}
                  autoComplete={'current-password'}
                  name={'password'}
                />

                <div className={'button'}>
                  <Button variant="contained" type="submit">
                    {'Зарегистрироваться'}
                  </Button>
                </div>

                {errorMsg && <AlertForm message={errorMsg} />}
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};
