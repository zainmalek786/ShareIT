import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../RTK/slice';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';

function Login() {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [loading,setLoading] = useState(false)
   //  const authentic = useSelector((state) => state.auth.isAuthenticate)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = async (e)=>{
        e.preventDefault()
       setLoading(true)              
        try {
         const user = await signInWithEmailAndPassword(auth,email,password)
         if(user){
            console.log('working')
            dispatch(login())
            navigate('/')
         }
         
        } catch (error) {
         alert(error)
        }finally{
         setLoading(false)
        }
       
      

    }
    return ( 
    <>
      { loading? ( <div className='flex h-screen w-screen justify-center items-center absolute left-0 top-0 bg-white font-bold' ><h1 className='text-xl text-blue-950'>Loading...</h1></div>):(

    <div className='flex h-screen w-screen justify-center items-center absolute left-0 top-0 bg-white'>
       <form action="submit" onSubmit={handleSubmit} className=' bg-slate-200 shadow-lg shadow-gray-400 p-5   text-blue-950 md:w-2/5 w-4/5 '>
        <div className='flex flex-col justify-center ' >
        <label htmlFor="email" className='block w-4/5 mx-auto text-left font-bold text-lg'>Email</label>
        <input 
           type="email" 
           placeholder='Enter your email ' 
           className='pt-2 pl-2 w-4/5 border-none h-10 mx-auto rounded-md'
           value={email}
           onChange={(e)=>setEmail(e.target.value)}/>
           

        <label htmlFor="password" className='block  pt-4 w-4/5 mx-auto text-left font-bold text-lg'>Password</label>
        <input 
           type="password" 
           placeholder='Enter your password ' 
           className='pt-2 pl-2 w-4/5 border-none h-10 mx-auto rounded-md'
           value={password}
           onChange={(e)=>setPassword(e.target.value)}/>

        <input 
           type="submit" 
           value="Login" 
           className='bg-blue-700 rounded-lg font-bold text-white mt-4 hover:bg-blue-600 md:px-6 px-2 py-2 md:w-2/12 w-4/12 mx-auto' />
        <label  className='block  pt-4 w-4/5 mx-auto text-left font-light text-sm ' onClick={()=>navigate('/signup')}> <u>Dont have account?Click here to create </u></label>

        </div>
      </form>
    </div>
     )} </> );
             
}

export default Login;