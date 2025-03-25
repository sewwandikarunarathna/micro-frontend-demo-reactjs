import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../globalStore';
import { updateMenuList } from '../slices/menuSlice';

export function useMenuStore() {
  const menuList = useSelector((state: RootState) => state.menuReducer.menuList);
  const dispatch = useDispatch<AppDispatch>();

  return {
    menuList,
    updateMenu(newMenuList: any) {
      dispatch(updateMenuList(newMenuList));
    },
  };
}
