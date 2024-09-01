import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState:{
        isAuthenticate : false,
        followers : 200
    },
    reducers:{
        login:(state) =>{
            state.isAuthenticate = true
        },
        logout:(state) =>{
            state.isAuthenticate = false
        }
    }
}) 

export const {login,logout} = authSlice.actions
export default authSlice.reducer