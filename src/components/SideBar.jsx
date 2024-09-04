import React, { useState } from 'react';
import Button from './Button';
import Logo from './Logo';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';
import {logout} from '../RTK/slice'
import { IoChevronBack, IoChevronDown, IoChevronUp, IoHomeSharp, IoPersonSharp } from "react-icons/io5";
import { IoSearchSharp } from "react-icons/io5";
import { IoHeartSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const SideBar = () => {
    const navigate = useNavigate()
    const [options,setOptions] = useState(false)
    const [hidden,setHidden] = useState('')
    const dispatch = useDispatch()

    const handleOptions = ()=>{
        if(options){
            setHidden('hidden')
            setOptions(false)
        }else{
        setOptions(true)
        setHidden('')}
    }
    const handleLogout =()=>{
     auth.signOut()
     dispatch(logout())
    }
    return ( <>
    
    <div className=' w-3/12 border-r-2 border-slate-400 flex flex-col'>
    <Logo/>
  

    <div  
      onClick={handleOptions} 
      className="w-full md:w-5/6 mt-12  shadow-sm shadow-slate-500 max-h-6  text-3xl items-center justify-end md:flex hidden rounded-sm">{!options?(<><p className='text-base pr-5 font-semibold '>Show Options</p><IoChevronUp className='ml-8'/></>):(<><p className='text-base pr-5 font-semibold '>Hide Options</p><IoChevronDown className='ml-8'/></>)}
      </div>

    <div className={`${hidden} mt-0 flex flex-col   w-full md:w-5/6 md:border-r-2 md:border-slate-400 md:border-double`} >
    <Button Text='Search' icon={<IoSearchSharp/>} path='/search'/>
    <Button Text='Profile' icon={<IoPersonSharp/>} path='/profile'/>
    <Button Text='Home' icon={<IoHomeSharp/>} path='/'/>
    <Button Text='Liked' icon={<IoHeartSharp className='text-2xl'/>} path='/liked'/>

    <input type="button" onClick={()=>navigate('/post')} value="Post" className='bg-blue-700 mx-auto rounded-lg font-bold text-white mt-4 hover:bg-blue-600 px-3 md:px-6 py-1' />
    
    <input type="button" onClick={handleLogout} value="Logout" className='bg-slate-600 mx-auto rounded-lg font-bold text-white mt-4 hover:bg-slate-500 px-3 md:px-6 py-1' />

    </div>
    </div>
    </> );
}
 
export default SideBar;