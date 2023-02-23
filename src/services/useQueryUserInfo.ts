import { useEffect, useState } from 'react';
import { useGetMeQuery, useLazyGetUserQuery } from 'src/services/hondaApi';
import { ISettings } from 'src/settings/types';
import { IUser } from 'src/user/types';

export const useQueryUserInfo = () => {
  const { data: meData, isSuccess } = useGetMeQuery({});
  const [getUserTrigger, result] = useLazyGetUserQuery();
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
      getUserTrigger(meData.username);
    }
  }, [isSuccess, meData, getUserTrigger]);

  useEffect(() => {
    if (result.isLoading) {
      setIsLoading(true);
    }
  }, [result.isLoading]);

  useEffect(() => {
    if (result.isSuccess) {
      setResultUserInfoIsSuccess(true);
      setResultUserInfo(result.data.user);
      setIsLoading(false);
    }
  }, [result.isSuccess, result.data]);

  return { resultUserInfoIsSuccess, resultUserInfo, isLoading };
};
