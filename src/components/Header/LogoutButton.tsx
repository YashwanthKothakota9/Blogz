import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';

export default function LogoutButton() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };

  return (
    <button
      className="text-apple-900 px-2 hover:underline hover:underline-offset-8 transition duration-500 text-xl hover:font-semibold"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}
