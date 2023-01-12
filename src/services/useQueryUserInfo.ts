import { useEffect, useState } from 'react';
import { useGetMeQuery, useLazyGetUserQuery } from 'src/services/hondaApi';
import { ISettings } from 'src/settings/types';
import { IUser } from 'src/user/types';

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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      trigger(meData.username);
    }
  }, [isSuccess, meData, trigger]);

  useEffect(() => {
    if (result.isLoading) {
      setIsLoading(true);
    }
  }, [result.isLoading]);

  useEffect(() => {
    if (result.isSuccess) {
      setResultUserInfoIsSuccess(true);
      setResultUserInfo(result.currentData.user);
      setIsLoading(false);
    }
  }, [result.isSuccess, result.currentData]);

  return { resultUserInfoIsSuccess, resultUserInfo, isLoading };
};
