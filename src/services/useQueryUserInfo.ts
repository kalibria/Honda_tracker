import { useEffect, useState } from 'react';
import { useGetMeQuery, useLazyGetUserQuery } from 'src/services/hondaApi';
import { ISettings } from 'src/settings/types';
import { IUser, Roles } from 'src/user/types';

export const useQueryUserInfo = () => {
  const { data: meData, isSuccess } = useGetMeQuery({});
  const [trigger, result] = useLazyGetUserQuery();
  const [resultUserInfoIsSuccess, setResultUserInfoIsSuccess] = useState(false);
  const [resultUserInfo, setResultUserInfo] = useState<IUser>({
    username: '',
    firstName: '',
    roles: [],
    availableCars: [''],
    providedCars: [''],
    settings: <ISettings>{},
  });

  useEffect(() => {
    if (isSuccess) {
      trigger(meData.username);
    }
  }, [isSuccess, meData, trigger]);

  useEffect(() => {
    if (result.isSuccess) {
      setResultUserInfoIsSuccess(true);
      setResultUserInfo(result.currentData.user);
    }
  });

  return { resultUserInfoIsSuccess, resultUserInfo };
};
