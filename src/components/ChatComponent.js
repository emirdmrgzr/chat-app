import { Routes, Route, Link, NavLink } from 'react-router-dom';

const ChatComponent = () => {
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