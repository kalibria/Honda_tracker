import { createBrowserRouter } from 'react-router-dom';
import LoginForm from 'src/auth/components/loginForm/LoginForm';
import { LogOutLogic } from 'src/auth/components/logOutForm/LogOutLogic';
import { App } from 'src/App';
import { MainPage } from 'src/mainPage/MainPage';
import {
  calendarPath,
  errorPath,
  initPath,
  loginPath,
  logOutPath,
  settingsPath,
  welcomePath,
} from 'src/router/rootConstants';
import { WrapperForSettingPage } from 'src/settings/WrapperForSettingPage';
import { WelcomeToHondaTracker } from 'src/WelcomeToHondaTracker';

const router = createBrowserRouter([
  {
    path: initPath,
    element: <App />,
    children: [
      {
        path: welcomePath,
        element: <WelcomeToHondaTracker />,
      },
      {
        path: logOutPath,
        element: <LogOutLogic />,
      },
      {
        path: calendarPath,
        element: <MainPage />,
      },
      {
        path: settingsPath,
        element: <WrapperForSettingPage />,
      },
    ],
  },

  {
    path: errorPath,
    element: <h1>Error...Please try reload</h1>,
  },

  {
    path: loginPath,
    element: <LoginForm />,
  },
  // {
  //   path: '/bookings',
  //   element: <BookingList />,
  // },
]);

export default router;
