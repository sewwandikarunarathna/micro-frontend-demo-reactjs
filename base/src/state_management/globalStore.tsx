import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import menuReducer from './slices/menuSlice';

const globalStore = configureStore({
    reducer: {
      userReducer,
      menuReducer,
    },
  });
  
  export default globalStore;
  
  export type RootState = ReturnType<typeof globalStore.getState>;
  export type AppDispatch = typeof globalStore.dispatch;

// export function StoreProvider({children}: StoreProviderProps){
//     return (
//         <Provider store={store}>
//             {children}
//         </Provider>
//     )
// };

// export function useGlobalStore(){
//     const user = useSelector((state: any) => state.userReducer.user);
//     const dispatch = useDispatch();

//     return {
//         user,
//         login: (newUser: any) => dispatch(login(newUser))
//     }
// } 
