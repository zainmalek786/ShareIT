import React, { useState,useEffect } from 'react';
import { auth,db, } from './firebase';
import {doc,getDoc,updateDoc} from 'firebase/firestore'
import {useNavigate} from 'react-router-dom'

function User({
    userName,
    fullName,
    id,
    profileImage,
}) {

    const [following,setFollowing] = useState(false)
    const [userData,setUserData] = useState()
    const [targetData,setTargetData] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        
        fetchTargetData()
    }, []);
    const user = auth.currentUser

    const fetchTargetData = async()=>{
     const docRef = doc(db,'Users',id)
     const docSnap = await getDoc(docRef)
     setTargetData(docSnap.data())
    }



    return (  
        <div className=' pl-4 pr-8 border rounded-md mt-3 flex overflow-hidden flex-shrink-0 items-center border-slate-600 py-2' onClick={()=>navigate(`displayprofile/${id}`)}>
        
      <span className='h-12 w-12 container overflow-hidden ml-4'>{ profileImage?(<img src={profileImage} alt=""  className='h-12 w-12 object-cover rounded-full  flex-auto'/>):(<div className='h-12  w-12 object-cover rounded-full flex-auto bg-blue-600 text-xs pt-2 font-bold text-center text-blue-200'>User <br />Profile</div>)}</span>
    
       <span className='pl-3 text-center w-40'> 
       <h2 className='font-bold text-blue-900 font-lg flex-auto'>{fullName}</h2>
       <p className='font-semibold text-slate-600 flex-auto'>@{userName}</p>
       </span>
        </div>
    );
}

export default User;