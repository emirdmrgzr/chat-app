import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

// const storedUser = localStorage.getItem("user");

//let user = false;

// if (storedUser !== null) {
//   try {
//     user = JSON.parse(storedUser);
//   } catch (e) {
//     console.error("Invalid JSON in localStorage: ", storedUser);
//   }
// }
// const initialState = {
//     user: user
// }

const initialState = {
  user: false
}
  
  const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      loginCheck: (state, action) => {
        state.user = action.payload;
        // localStorage.setItem("user", JSON.stringify(action.payload));
      },
      logoutCheck: (state) => {
        state.user = null;
         //localStorage.removeItem("user");
         toast.success("You logged out successfully");
      },
    },
  });
  
  export const { loginCheck, logoutCheck } = authSlice.actions;
  //export const currentUser = user;
  
  export default authSlice.reducer;


// const initialState = {
//     user: JSON.parse(localStorage.getItem("user")) ?? false
// }

// const auth = createSlice({
//     name: "auth",
//     initialState,
//     reducers:{
//         loginCheck: (state,action) =>{
//             localStorage.setItem("user", JSON.stringify(action.payload));
//             state.user = action.payload;
//         },
//         logoutCheck: state =>{
//             localStorage.removeItem("user");
//             state.user = null;
//         }
//     }
// })

// export const { loginCheck, logoutCheck} = auth.actions;
// export default auth.reducer;