import { createBrowserRouter } from 'react-router-dom';
import LoginForm from 'src/auth/components/loginForm/LoginForm';
import { App } from 'src/App';
import { SignUpForm } from 'src/auth/components/signUpForm/SignUpForm';
import { BookingDetailsWrapper } from 'src/bookingDetails/BookingDetailsWrapper';
import { BookingList } from 'src/booking-list/components/BookingList';
import { WrapperForCreatingBooking } from 'src/createNewBooking/components/WrapperForCreatingBooking';
import { ErrorComponent } from 'src/errorComponent/ErrorComponent';

import {
  bookingListPath,
  creatingNewBookingPath,
  errorPath,
  initPath,
  loginPath,
  settingsPath,
  signUpFormPath,
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
        path: '/booking-details/:bookingId',
        element: <BookingDetailsWrapper />,
      },
      {
        path: creatingNewBookingPath,
        element: <WrapperForCreatingBooking />,
      },

      {
        path: settingsPath,
        element: <SettingsPage />,
      },
      {
        path: welcomePath,
        element: <WelcomeToHondaTracker />,
      },
    ],
  },

  {
    path: loginPath,
    element: <LoginForm />,
  },
  {
    path: signUpFormPath,
    element: <SignUpForm />,
  },
  {
    path: errorPath,
    element: <ErrorComponent />,
  },
]);

export default router;
