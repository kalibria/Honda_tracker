import { createBrowserRouter } from 'react-router-dom';
import LoginForm from 'src/auth/components/loginForm/LoginForm';
import { App } from 'src/App';
import { BookingList } from 'src/booking-list/BookingList';
import {
  bookingListPath,
  errorPath,
  initPath,
  loginPath,
  settingsPath,
  welcomePath,
} from 'src/router/rootConstants';
import { SettingsPage } from 'src/settings/SettingsPage';
import { WelcomeToHondaTracker } from 'src/welcom/WelcomeToHondaTracker';

const router = createBrowserRouter([
  {
    path: initPath,
    element: <App />,
    children: [
      {
        path: bookingListPath,
        element: <BookingList />,
      },
      {
        path: welcomePath,
        element: <WelcomeToHondaTracker />,
      },

      {
        path: settingsPath,
        element: <SettingsPage />,
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
