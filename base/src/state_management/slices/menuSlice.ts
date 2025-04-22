import { createSlice } from '@reduxjs/toolkit';
import { userMenuList } from '../../assets/sidebar-menu';

const initialState = {
  menuList: userMenuList
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    updateMenuList(state, action) {
      state.menuList = action.payload;
    },
  },
});

export const { updateMenuList } = menuSlice.actions;
export default menuSlice.reducer;
