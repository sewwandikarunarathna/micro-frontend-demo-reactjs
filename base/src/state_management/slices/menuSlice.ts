import { createSlice } from '@reduxjs/toolkit';
import { sidebarMenuList } from '../../assets/sidebar-menu';

const initialState = {
  menuList: sidebarMenuList
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
