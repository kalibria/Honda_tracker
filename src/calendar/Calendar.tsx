import React from 'react';
import { Loading } from 'src/commonComponents/Loading';
import { useGetMeQuery } from 'src/services/hondaApi';

export const Calendar = () => {
  const { isLoading, isSuccess } = useGetMeQuery({});

  return (
    <div>
      {(isLoading && <Loading />) || (isSuccess && <div>Calendar</div>)}
    </div>
  );
};
