import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../globalStore';
import { login, logout } from '../slices/userSlice';

export function useUserStore() {
  const user = useSelector((state: RootState) => state.userReducer.user);
  const dispatch = useDispatch<AppDispatch>();

  return {
    user,
    loginUser(newUserData: any) {
      dispatch(login(newUserData));
    },
    logoutUser() {
      dispatch(logout());
    },
  };
}
