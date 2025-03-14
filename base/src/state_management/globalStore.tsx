import React from 'react'
import {configureStore, createSlice} from '@reduxjs/toolkit';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { ReactNode } from 'react';

interface StoreProviderProps {
    children: ReactNode;
}

const initialState = {
    user: {
        username: '',
        email: '',
        password: '',
        userRole: '',
    }
};

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        login: (state, action) => {
            console.log(action.payload);
            
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

const { login } = userSlice.actions;

const store = configureStore({
    reducer: {
        userReducer: userSlice.reducer,
    }
});

export function StoreProvider({children}: StoreProviderProps){
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
};

export function useGlobalStore(){
    const user = useSelector((state: any) => state.userReducer.user);
    const dispatch = useDispatch();

    return {
        user,
        login: (newUser: any) => dispatch(login(newUser))
    }
} 
