import { createBrowserRouter } from 'react-router-dom';
import LoginForm from 'src/auth/components/loginForm/LoginForm';
import { LogOutButton } from 'src/auth/components/logOutFor/LogOutButton';
import { App } from 'src/App';
import { MainPage } from 'src/mainPage/MainPage';
import { SettingsPage } from 'src/settings/SettingsPage';
import { WrapperForSettingPage } from 'src/settings/WrapperForSettingPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/login',
    element: <LoginForm />,
  },
  {
    path: '/logout',
    element: <LogOutButton />,
  },
  {
    path: '/calendar',
    element: <MainPage />,
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
