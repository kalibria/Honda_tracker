import { createBrowserRouter } from 'react-router-dom';
import LoginForm from 'src/auth/components/loginForm/LoginForm';
import { LogOutButton } from 'src/auth/components/logOutFor/LogOutButton';
import { App } from 'src/App';
import { MainPage } from 'src/mainPage/MainPage';
import {
  calendarPath,
  errorPath,
  initPath,
  loginPath,
  logOutPath,
  settingsPath,
} from 'src/router/rootConstants';
import { SettingsPage } from 'src/settings/SettingsPage';
import { WrapperForSettingPage } from 'src/settings/WrapperForSettingPage';

const router = createBrowserRouter([
  {
    path: initPath,
    element: <App />,
  },
  {
    path: loginPath,
    element: <LoginForm />,
  },
  {
    path: logOutPath,
    element: <LogOutButton />,
  },
  {
    path: calendarPath,
    element: <MainPage />,
  },
  {
    path: settingsPath,
    element: <WrapperForSettingPage />,
  },
  {
    path: errorPath,
    element: <h1>Error...Please try reload</h1>,
  },
  // {
  //   path: '/bookings',
  //   element: <BookingList />,
  // },
]);

export default router;
