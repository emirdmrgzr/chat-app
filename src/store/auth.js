import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) ?? false
}

const auth = createSlice({
    name: "auth",
    initialState,
    reducers:{
        loginCheck: (state,action) =>{
            localStorage.setItem("user", JSON.stringify(action.payload));
            state.user = action.payload;
        },
        logoutCheck: state =>{
            localStorage.removeItem("user");
            state.user = false;
        }
    }
})

export const { loginCheck, logoutCheck} = auth.actions;
export default auth.reducer;