import { useState } from 'react';
import { login } from '../firebase';
import { ToastContainer } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const user = await login(email,password);
    console.log(user);
  }
  
  return (
    <div className="flex items-center justify-center h-screen">
    <div className='bg-gray-100 p-16 rounded-2xl shadow-lg'>
    <p className="mb-8 text-center font-medium text-3xl text-indigo-400 ">LOGIN</p>
    <form className="w-full max-w-sm" onSubmit={handleSubmit}>
    <div className="md:flex md:items-center mb-6">
      <div className="md:w-1/3">
        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
          Email
        </label>
      </div>
      <div className="md:w-2/3">
        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" onChange={e=>setEmail(e)} type="email" value={email} placeholder="you@example.com"/>
      </div>
    </div>
    <div className="md:flex md:items-center mb-6">
      <div className="md:w-1/3">
        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
          Password
        </label>
      </div>
      <div className="md:w-2/3">
        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" onChange={e=>setPassword(e)} type="password" value={password} placeholder="Password"/>
      </div>
    </div>
    
    <div className="md:flex md:items-center">
      <div className="md:w-1/3"></div>
      <div className="md:w-2/3">
        <button className="shadow bg-indigo-500 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded  " type="submit">
          Login
        </button>
      </div>
    </div>
  </form>
  </div>
  </div>
  

   
  )
}

export default Login;