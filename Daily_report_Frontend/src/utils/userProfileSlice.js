import { createSlice } from "@reduxjs/toolkit";
import { makeAuthenticatedGETRequest } from "./fetchConfig";

const initialState ={
    profile: null,
    loading: false,
    error: null,
};

const userProfileSlice=createSlice({
    name:'userProfile',
    initialState,
    reducers:{
        getUserProfileStart:(state) =>{
            state.loading=true;
        },
        getUserProfileSuccess: (state,action) => {
            console.log(action);
            console.log(state);
            state.profile = action.payload;
            state.loading = false;
            console.log("state.profile is:",state.profile);
            console.log(state);
           
        },
        getUserProfileError: (state,action) =>{
            state.error =action.payload;
            state.loading = false;
        },
    },
});

export const fetchUserProfile =() => async(dispatch) =>{
    try{
        dispatch(getUserProfileStart());
        const response = await makeAuthenticatedGETRequest("/auth/userprofile");
        //console.log(response);
        dispatch(getUserProfileSuccess(response));
    } catch (error) {
        console.log(error);
        dispatch(getUserProfileError(error.message));
    }
};

export const {getUserProfileStart,getUserProfileSuccess,getUserProfileError}=userProfileSlice.actions;
export default userProfileSlice.reducer;