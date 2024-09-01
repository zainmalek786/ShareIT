import React from 'react';
import { useState,useEffect } from 'react';
import { doc,getDoc, updateDoc } from 'firebase/firestore';
import { db,auth } from './firebase';
import { getStorage,ref,getDownloadURL, uploadBytes } from 'firebase/storage';
import { updateEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { sendEmailVerification } from 'firebase/auth';

function EditProfile() {
    
    const [email,setEmail] = useState('')
    const [userName,setUserName] = useState('')
    const [fullName,setFullName] = useState('')
    const [profile,setProfile] = useState('')
    const [loading,setLoading] = useState(false)
  
const navigate = useNavigate()

    const fetchData = async ()=>{
        const user    = auth.currentUser
        const docRef  = doc(db,"Users",user.uid)
        const docSnap = await getDoc(docRef)
        const data    = docSnap.data()
        setEmail(data.email || '')
        setUserName(data.userName||'')
        setFullName(data.fullName||'')
       
       }

    useEffect(() => {
        fetchData()
        
    }, []);
    const handleSubmit = async ()=>{
        setLoading(true)
    console.log('fn click ho rha hai')

        try {
            const user = auth.currentUser
            const updates = {
                email,
                userName,
                fullName,
            }
            
        if(profile){
            const storage = getStorage()
            const storageRef = ref(storage,`ProfilePictures/${user.uid}`)
            await uploadBytes(storageRef,profile)
            const url = await getDownloadURL(storageRef)
            console.log('downloaded url of img',url)
            updates.profilePictureUrl = url;
        }
            
            await updateDoc(doc(db,'Users',user.uid),updates);
            if(email !== user.email){
                

            if (!user.emailVerified) {
              await sendEmailVerification(user);
              console.log("Email verification sent");
            }
            if (user.emailVerified) {
                await updateEmail(user, email);
                console.log('Email updated successfully');
              } else {
                console.log('Please verify your email first.');
              }
              

            }
            console.log('yahan tak k code chal rha hai')
            navigate('/profile')
        } catch (error) {
            console.log(error)
            
        }
    }
    return (  <>
    <div className="flex flex-col items-center mx-auto overflow-scroll custom-scrollbar md:w-6/12 w-9/12 md:p-5 pt-5 bg-white shadow-lg rounded-lg">
    
    <form   className=' bg-slate-200 shadow-lg shadow-gray-400 md:p-5   text-blue-950 md:w-4/5 w-11/12 '>
        <div className='flex flex-col justify-center ' >
        <label htmlFor="email" className='block md:w-4/5 mx-auto w-full text-left font-bold text-lg'>Email</label>
        <input 
           type="email" 
           placeholder='Enter your email ' 
           className='pt-2 md:w-4/5 border-none h-10 mx-auto rounded-md'
           value={email}
           required
           onChange={(e)=>setEmail(e.target.value)}
           disabled={loading}
           />
        <label htmlFor="text" className='block  pt-4 w-full md:w-4/5 mx-auto text-left font-bold text-lg'>Username</label>  
        <input 
           type="text" 
           placeholder='Enter your username ' 
           className='pt-2 md:w-4/5 border-none h-10 mx-auto rounded-md'
           value={userName}
           required
           disabled={loading}
           onChange={(e)=>setUserName(e.target.value)}/>

        <label htmlFor="text" className='block  pt-4 md:w-4/5 w-full mx-auto text-left font-bold text-lg'>Full name</label>
        <input 
           type="text" 
           placeholder='Enter your full name ' 
           className='pt-2 md:w-4/5 border-none h-10 mx-auto rounded-md'
           value={fullName}
           required
           disabled={loading}
           onChange={(e)=>setFullName(e.target.value)}/>   

    

        <label htmlFor="file" className='block w-full pt-4 md:w-4/5 mx-auto text-left font-bold text-lg'>Profile</label>

        <input 
           type="file" 
           placeholder='Upload profile picture ' 
           className='pt-2 md:w-4/5 border-none h-10 mx-auto rounded-md'
           disabled={loading}
           onChange={(e)=>setProfile(e.target.files[0])}/>
        <input 
           type="button" 
           value="Update" 
           className='bg-blue-700 rounded-lg font-bold  text-white my-4 hover:bg-blue-600 md:px-6 px-1 py-2 md:w-3/12 inline-block mx-auto'
           onClick={()=>handleSubmit()}
           disabled={loading} />
           
           
        </div>
      </form>
    </div>
              </>  );
}

export default EditProfile;