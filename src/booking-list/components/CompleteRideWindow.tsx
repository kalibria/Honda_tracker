import { useFormik } from 'formik';
import React from 'react';

export const CompleteRideWindow = () => {
  const formik = useFormik({
    initialValues: {
      carLocation: '',
    },
    onSubmit: (values) => {},
  });

  return (
    <div className={'completeRideWindow'}>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor={'carLocation'}>Местонахождение машины</label>
        <input
          id="carLocation"
          name="carLocation"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.carLocation}
        />
        <button type="submit">Подтвердить</button>
      </form>
    </div>
  );
};
