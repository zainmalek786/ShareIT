import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth,db } from './firebase';
import { doc,setDoc } from 'firebase/firestore';
import {login} from '../RTK/slice'
import { getStorage,ref,uploadBytes,getDownloadURL} from 'firebase/storage';
import { useDispatch } from 'react-redux';


function Signup() {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [userName,setUserName] = useState('')
    const [fullName,setFullName] = useState('')
    const [profile,setProfile] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const uploadProfilePicture= async (file,userID)=>{
        const storage = getStorage();
        const storageRef = ref(storage,`ProfilePictures/${userID}`)

        await uploadBytes(storageRef,file);
      return await getDownloadURL(storageRef)
    }
    const handleSubmit = async ()=>{
       
      try {
         
         await createUserWithEmailAndPassword(auth,email,password)
         const user = auth.currentUser;

         let profileUrl = ''
         if(profile){
            profileUrl = await uploadProfilePicture(profile,user.uid)
         }
         if(user){
            
            await setDoc(doc(db,'Users',user.uid),{
               email:user.email,
               userName: userName.replace(/\s/g, ""),
               fullName: fullName,
               profilePictureUrl:profileUrl,
               followers:[],
               following:[user.uid],

            })
         }
         console.log('user register and profile saved')
         await signInWithEmailAndPassword(auth,email,password)
         dispatch(login())
         navigate('/')
      } catch (error) {
         console.log(error)
         alert(error)
      }
    }
    return ( 
    <>
    
    <div className='flex h-screen w-screen justify-center items-center absolute left-0 top-0 bg-white'>
       <form className=' bg-slate-200 shadow-lg shadow-gray-400 p-5   text-blue-950 md:w-2/5 w-4/5 '>
        <div className='flex flex-col justify-center ' >
        <label htmlFor="email" className='block w-4/5 mx-auto text-left font-bold text-lg'>Email</label>
        <input 
           type="email" 
           placeholder='Enter your email ' 
           className='pt-2 w-4/5 border-none h-10 mx-auto rounded-md'
           value={email}
           required
           onChange={(e)=>setEmail(e.target.value)}/>
        <label htmlFor="text" className='block  pt-4 w-4/5 mx-auto text-left font-bold text-lg'>Username</label>  
        <input 
           type="text" 
           placeholder='Enter your username ' 
           className='pt-2 w-4/5 border-none h-10 mx-auto rounded-md'
           value={userName}
           required
           onChange={(e)=>setUserName(e.target.value)}/>

        <label htmlFor="text" className='block  pt-4 w-4/5 mx-auto text-left font-bold text-lg'>Full name</label>
        <input 
           type="text" 
           placeholder='Enter your full name ' 
           className='pt-2 w-4/5 border-none h-10 mx-auto rounded-md'
           value={fullName}
           required
           onChange={(e)=>setFullName(e.target.value)}/>   

        <label htmlFor="password" className='block  pt-4 w-4/5 mx-auto text-left font-bold text-lg'>Password</label>
        <input 
           type="password" 
           placeholder='Enter your password ' 
           className='pt-2 w-4/5 border-none h-10 mx-auto rounded-md'
           value={password}
           required
           onChange={(e)=>setPassword(e.target.value)}/>

        <label htmlFor="file" className='block  pt-4 w-4/5 mx-auto text-left font-bold text-lg'>Profile</label>

        <input 
           type="file" 
           placeholder='Upload profile picture ' 
           className='pt-2 w-4/5 border-none h-10 mx-auto rounded-md'
           
           onChange={(e)=>setProfile(e.target.files[0])}/>
        <input 
           type="button"
           onClick={()=>handleSubmit()} 
           value="Signup" 
           className='bg-blue-700 rounded-lg font-bold text-white mt-4 hover:bg-blue-600 md:px-6 px-2 py-2 md:w-3/12 w-4/12 mx-auto' />
                <label  className='block  pt-4 w-4/5 mx-auto text-left font-light text-sm ' onClick={()=> navigate('/login')} > <u>Already have an account?login here</u></label>

           
        </div>
      </form>
    </div>
             </> );
             
}

export default Signup;