import { createBrowserRouter } from 'react-router-dom';
import LoginForm from 'src/auth/components/loginForm/LoginForm';
import { App } from 'src/App';
import { SignUpForm } from 'src/auth/components/signUpForm/SignUpForm';
import { BookingDetails } from 'src/booking-list/components/BookingDetails';
import { BookingList } from 'src/booking-list/components/BookingList';
import { CreatingNewBooking } from 'src/createNewBooking/components/CreatingNewBooking';
import { WrapperForCreatingBooking } from 'src/createNewBooking/components/WrapperForCreatingBooking';
import {
  // bookingDetailsPath,
  bookingListPath,
  creatingNewBooking,
  errorPath,
  initPath,
  loginPath,
  settingsPath,
  signUpForm,
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
        element: <BookingDetails />,
      },
      {
        path: creatingNewBooking,
        element: <WrapperForCreatingBooking />,
      },

      {
        path: settingsPath,
        element: <SettingsPage />,
      },
    ],
  },
  {
    path: welcomePath,
    element: <WelcomeToHondaTracker />,
  },
  {
    path: loginPath,
    element: <LoginForm />,
  },
  {
    path: signUpForm,
    element: <SignUpForm />,
  },
  {
    path: errorPath,
    element: <h1>Error...Please try reload</h1>,
  },
]);

export default router;
