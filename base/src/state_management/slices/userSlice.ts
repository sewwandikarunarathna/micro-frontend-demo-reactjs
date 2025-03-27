import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    username: '',
    email: '',
    password: '',
    userRole: '',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = {
        username: '',
        email: '',
        password: '',
        userRole: '',
      };
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;