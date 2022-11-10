import { createBrowserRouter } from 'react-router-dom';
import LoginForm from 'src/auth/components/loginForm/LoginForm';
import { LogOutLogic } from 'src/auth/components/logOutForm/LogOutLogic';
import { App } from 'src/App';
import { Calendar } from 'src/calendar/Calendar';
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
import { WelcomeToHondaTracker } from 'src/welcom/WelcomeToHondaTracker';

const router = createBrowserRouter([
  {
    path: initPath,
    element: <App />,
    children: [
      {
        path: calendarPath,
        element: <Calendar />,
      },
      {
        path: welcomePath,
        element: <WelcomeToHondaTracker />,
      },
      {
        path: logOutPath,
        element: <LogOutLogic />,
      },

      {
        path: settingsPath,
        element: <WrapperForSettingPage />,
      },
    ],
  },
  {
    path: loginPath,
    element: <LoginForm />,
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
