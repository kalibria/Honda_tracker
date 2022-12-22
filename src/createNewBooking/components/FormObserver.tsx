import { useFormikContext } from 'formik';
import React, { useEffect } from 'react';

export const FormObserver: React.FC = () => {
  const { values } = useFormikContext();

  useEffect(() => {
    console.log('FormObserver::values', values);
  }, [values]);

  return null;
};
