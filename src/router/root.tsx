import { createBrowserRouter } from 'react-router-dom';
import LoginForm from 'src/auth/components/loginForm/LoginForm';
import { LogOutButton } from 'src/auth/components/logOutFor/LogOutButton';
import { CalendarPage } from 'src/calendarPage/CalendarPage';
import { SettingsPage } from 'src/settings/SettingsPage';

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
    element: <SettingsPage />,
  },
  // {
  //   path: '/bookings',
  //   element: <BookingList />,
  // },
]);

export default router;
