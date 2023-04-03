import NormalPage from "../pages/NormalPage";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import UserProfileEdit from "./UserProfileEdit";
const MyRouter = () =>{
    return(
      <Routes>
        <Route path="/" element={<NormalPage />} />
        <Route path="/login" element={<Login/>} />
        <Route path="signup" element={<SignUp/>}/>
        <Route path="user-profile" element={<UserProfileEdit/>}/>
      </Routes>
    )
}

export default MyRouter;