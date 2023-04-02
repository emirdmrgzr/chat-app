import { useSelector } from 'react-redux';
import { Routes, Route, Link, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutCheck } from '../store/auth';
import { logout } from '../firebase';

const ChatComponent = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const handleSubmit = async () =>{
    await logout()
    dispatch(logoutCheck());
    navigate("/",{
      replace: true
    })
  }

  if(user){
    return(
      <div className='chat-container w-full h-screen'>
        <div className='logout-btn flex justify-end w-full p-4'>
        <button className="shadow bg-indigo-500 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit" onClick={handleSubmit}>
            Log out
          </button>
        </div>
      </div>
    )
  }
  
  return (
    <div className='chat-component bg-gray-50 w-full h-full flex items-center justify-center gap-x-10'>
        <div className="friend-chat flex justify-center items-center w-1/6 h-1/5 bg-indigo-200 rounded-xl cursor-pointer transition ease-in-out delay-50 text-center
        font-semibold text-slate-800 shadow-[0_7px_12px_0_rgba(200,200,200,0.9)] hover:-translate-y-1 hover:scale-110 hover:bg-indigo-400 hover:text-white duration-300 ">
            <Link className='w-full h-full flex justify-center items-center' to="/login"><span>Login</span></Link>
        </div>
        <div className='ai-chat image-generator flex justify-center items-center w-1/6 h-1/5 bg-indigo-200 rounded-xl cursor-pointer transition ease-in-out delay-50 text-center
        font-semibold text-slate-800 shadow-[0_7px_12px_0_rgba(200,200,200,0.9)] hover:-translate-y-1 hover:scale-110 hover:bg-indigo-400 hover:text-white duration-300 "'>
            <Link className='w-full h-full flex justify-center items-center' to="/signup"><span>Sign Up</span></Link>
        </div>
    </div>
  )
}

export default ChatComponent;
/*<Link className='w-full h-full flex justify-center items-center' to="/login"><span>Login</span></Link>
<Link className='w-full h-full flex justify-center items-center' to="/signup"><span>Sign Up</span></Link>*/