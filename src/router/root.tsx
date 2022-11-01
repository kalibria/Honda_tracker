import { createBrowserRouter } from 'react-router-dom';
import LoginForm from 'src/auth/components/loginForm/LoginForm';
import { LogOutButton } from 'src/auth/components/logOutFor/LogOutButton';
import { CalendarPage } from 'src/calendarPage/CalendarPage';
import { SettingsPage } from 'src/settings/SettingsPage';
import { WrapperForSettingPage } from 'src/settings/WrapperForSettingPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginForm />,
  },
  {
    path: '/logout',
    element: <LogOutButton />,
  },
  {
    path: '/calendar',
    element: <CalendarPage />,
  },
  {
    path: '/settings',
    element: <WrapperForSettingPage />,
  },
  {
    path: '/error',
    element: <h1>Error...Please try reload</h1>,
  },
  // {
  //   path: '/bookings',
  //   element: <BookingList />,
  // },
]);

export default router;
