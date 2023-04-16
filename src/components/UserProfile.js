import { useState, useEffect} from "react";
import store from "../store";
//import { currentUser } from "../store/auth";
import { useSelector } from "react-redux";
import { updateUser , changeEmail, auth, db} from "../firebase";
import { updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { loginCheck } from "../store/auth";
import toast from "react-hot-toast";
import { doc, getDoc } from "firebase/firestore";

export default function UserProfile(){
  const { user } = useSelector(state => state.auth);
  const [displayName, setDisplayName] = useState(user.displayName || "");
  const [email, setEmail] = useState(user.email || ""); 
  // const [photoUrl, setPhotoUrl] = useState("");
  const dispatch = useDispatch();

  const getUser = async() =>{
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const storeData = docSnap.data();
      setDisplayName(storeData.name);
      setEmail(storeData.email);
    } else {
      console.log("No such document!");
    }
  }
  
  useEffect(() => {
    getUser();
  }, []);

    const handleSubmit = async(e) =>{
      e.preventDefault();
      await Promise.all([
        updateUser({
          displayName: displayName
        }),
        changeEmail(email),
      ])
      dispatch(loginCheck({
        displayName: auth.currentUser.displayName,
        email: auth.currentUser.email,
        emailVerified: auth.currentUser.emailVerified,
        photoUrl: auth.currentUser.photoUrl,
        uid: auth.currentUser.uid,
      }))
      toast.success("User information updated!")
    }

    useEffect(() => {
      setDisplayName(user.displayName || "");
      setEmail(user.email || "");
      //setPhotoUrl(user.photoUrl || "");
    }, [user]);

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
        
          <div className='flex w-full h-full justify-center items-center' role="status">
          <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <span className="sr-only">Loading...</span>
      </div>
      )}
  </>
    )
}