import { useState } from "react";
import store from "../store";
//import { currentUser } from "../store/auth";
import { useSelector } from "react-redux";
import { updateUser , changeEmail, auth} from "../firebase";
import { updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { loginCheck } from "../store/auth";

export default function UserProfile(){
  const { user } = useSelector(state => state.auth);
  const [displayName, setDisplayName] = useState(user.displayName || "");
  const [email, setEmail] = useState(user.email || ""); 
    const [photoUrl, setPhotoUrl] = useState("");
    const dispatch = useDispatch();
    
    const handleSubmit = async(e) =>{
      e.preventDefault();
      await updateUser({
        displayName: displayName
      })
      await changeEmail(email)
      dispatch(loginCheck(auth.currentUser))
    }

     return(
      <>
      {user ?(
        //     <div className="w-full h-full flex flex-col ">
  //     <div className=" gap-x-6 gap-y-8 sm:grid-cols-6 w-full items-center">
  //          <div className="sm:col-span-3">
  //              <label className="block text-sm font-medium leading-6 text-gray-900">Name</label>
  //          <div className="mt-2">
  //      <input type="text" name="first-name" id="first-name" className="block w-2/5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
  //    </div>
  //  </div>
  //  </div>
  //  <div className="sm:col-span-4 w-full">
  //    <label className="block  text-sm font-medium leading-6 text-gray-900">Email address</label>
  //    <div className="mt-2 ">
  //      <input name="email" type="email" value={email} onChange={e=>setEmail(e.target.value)} className="block w-2/5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
  //    </div>
  //  </div>
  //  </div>
  <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center w-full">
  <div className="w-3/5">
    <div className="flex flex-col justify-center items-center mb-4">
      <label htmlFor="first-name" className="text-sm font-medium text-lg leading-6 text-gray-900 mb-1">
        Name
      </label>
      <input
        type="text"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        className="w-full py-2 px-4 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
      />
    </div>
    <div className="flex flex-col justify-center items-center">
      <label htmlFor="email" className="text-sm font-medium text-lg leading-6 text-gray-900 mb-1">
        Email address
      </label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full py-2 px-4 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
      />
    </div>
    <div className="flex flex-col mt-4 w-full items-end">
    <button className="shadow bg-indigo-500 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit" >
            Apply Changes
    </button>
    </div>
  </div>
</form>
      ) : (
        <div>Bad Bro</div>
      )}
  </>
    )
}