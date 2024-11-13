import {configureStore} from '@reduxjs/toolkit';
import userProfileReducer from './userProfileSlice';

export const store=configureStore({
    reducer:{
        userProfile:userProfileReducer,
    },
});