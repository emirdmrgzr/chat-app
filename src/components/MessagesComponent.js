import React, { useState, useEffect } from 'react'
import { ArrowDown2, AddCircle} from 'iconsax-react';
import { db } from "../firebase";
import { collection, query, where, getDocs, setDoc, doc, updateDoc, getDoc, onSnapshot} from 'firebase/firestore';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const MessagesComponent = () => {
  const [name, setName] = useState("");
  const [userList, setUserList] = useState([]);
  const usersRef = collection(db, "users");
  let sumId = "";

  const { user } = useSelector(state => state.auth);

  const handleSearch = async() =>{
    const q = query(usersRef, where("name", "==", name));
    try{
      const users = []
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) =>{
      // doc.data() is never undefined for query doc snapshots
      //console.log(doc.data());
      users.push(doc.data());
    })
    setUserList(users);
  }catch (e){
    console.log(e);
  }
  }
  
  // var keyUp = (e) =>{
  //   if()
  // }
  const handleKeyDown = (e) =>{
    if(e.code === "Enter"){
      e.preventDefault();
      handleSearch();
    }else{
      if(name.length >= 3){
        handleSearch();
      }
    }
  }

  const handleClick = async(clickedUid) =>{
      sumId = user.uid > clickedUid ? user.uid + clickedUid : clickedUid + user.uid;
    try{
      const chatRef = doc(db,"chats", sumId);
      const chatRes = await getDoc(chatRef);
      if(!chatRes.exists()){
        await setDoc(chatRef,{ messages: []});

        const userChatsRef = doc(db, "userChats", user.uid);
        const userChatsRes = await getDoc(userChatsRef);

        if(userChatsRes.exists()){
          // if there is chat we update it
          await updateDoc(userChatsRef,{
            // we're updating chat for both users
            [clickedUid]: sumId,
            [user.uid]: sumId
          });
        }else{
          // if there is not chat we create it
          await setDoc(userChatsRef,{
            // we're setting chat for both users even just one of them creates chat with other one
            [clickedUid]: sumId,
            [user.uid]: sumId
          });
        }
      }
    }catch(e){
      toast(e);
    }
    setUserList([]);
    setName("");
  }

  useEffect(() => {
    const chatDocRef = doc(db, "userChats", user.uid);
    
    const unsub = onSnapshot(chatDocRef, (doc) => {
      doc.exists() && console.log("Current data: ", doc.data());
    });
    return () =>{
      unsub();
    }
  }, [user]);

  return (
      <div className="messages-component bg-gray-100 w-full h-full shadow-messages border-r border-solid border-gray-200 ">
        <div className="messages-header border-b border-solid border-gray-200 flex py-6 px-4 items-center">
          <p className='font-semibold text-xl ml-3' >Messages</p>
          <ArrowDown2 className='ml-2' size="32" color="black"/> 
          <div className='w-8 h-6 bg-gray-300 rounded-3xl flex justify-center items-center ml-5'>12</div>
          <AddCircle className='ml-auto' size="32" color="black"/>
        </div>
        <div className="messages-global-list">
          <div className="messages-search-part mb-6">
            <form className='flex justify-center pt-4'>
              <input type="text" placeholder='Search Users' value={name} className='w-4/5 rounded-xl h-12' onKeyDown={handleKeyDown} onChange={(e)=>setName(e.target.value)}/>
            </form>
          </div>
          </div>
          <div className='messages-list'>
              {userList.map((user) => (
            <div key={user.uid} className="flex items-center cursor-pointer bg-gray-200 py-2 mb-1" onClick={() => handleClick(user.uid)}>              
              <img className="ml-3 w-10 h-10 rounded-full" src={user.photoUrl} alt={user.uid}/>
              <p className='ml-2'>{user.name}</p>
            </div>
          ))}
          </div>
          <div className='active-chats'>

          </div>
      </div>
  )
}

export default MessagesComponent;
