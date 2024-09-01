import React, { useEffect, useState } from 'react';
import { db,auth } from './firebase';
import { getDocs,collection,where,query, } from 'firebase/firestore';
import User from './User';
function Search() {
    const [search,setSearch] = useState('')
    const [users,setUsers] = useState() 

    const fetchUsers = async()=>{
try {
    const refrence = collection(db,'Users')
    const qury = query(refrence,where('userName','>=',search),where('userName','<=',search +'\uf8ff') )
    const querySnapShot = await getDocs(qury)
    const data = querySnapShot.docs.map((userData)=>({id:userData.id,...userData.data()}))
    const filteredData = data.filter((account)=> account.id != auth.currentUser.uid)
    setUsers(filteredData) 
} catch (error) {
    console.log(error)
}
    }
    useEffect(() => {
        if(search){
        fetchUsers()
    }
    setUsers('')
    }, [search]);

    return ( <>
    <div className="w-full md:w-6/12  flex flex-col items-center">
        <input 
           type="text" 
           className='w-4/5 border-none shadow-md shadow-slate-400 mt-10 h-10 rounded-md pl-5' 
           placeholder='Search username' 
           value={search} 
           onChange={(e)=> setSearch(e.target.value)}
         />
<div className='w-4/5 flex flex-col items-center'>
   
    {users !='' && search !='' ? (users.map((userInfo)=>(<User key={userInfo.id} id={userInfo.id} userName={userInfo.userName} fullName={userInfo.fullName} profileImage={userInfo.profilePictureUrl}/>))):(<h1 className='m-6 font-bold text-2xl text-blue-900'>Search Users</h1>)}
</div>
    </div>
    </> );
}


export default Search;