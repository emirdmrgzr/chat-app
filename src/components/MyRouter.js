import NormalPage from "../pages/NormalPage";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
const MyRouter = () =>{
    return(
      <Routes>
        <Route path="/" element={<NormalPage />} />
        <Route path="/login" element={<Login/>} />
        <Route path="signup" element={<SignUp/>}/>
      </Routes>
    )
}

export default MyRouter;