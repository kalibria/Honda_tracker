import { ISettings } from 'src/settings/types';

export interface IUser {
  username: string;
  firstName: string;
  roles: Roles[];
  availableCars: string[];
  providedCars: string[];
  settings: ISettings;
}

export enum Roles {
  DRIVER = 'driver',
  CAR_PROVIDER = 'carProvider',
}
