import React, { useEffect, useState } from 'react';
import { db,auth } from './firebase';
import { getDocs,collection,where,query, } from 'firebase/firestore';
import User from './User';
function Search() {

    const [search,setSearch]    = useState('')
    const [users,setUsers]      = useState() 
    const [allUser,setAllUsers] = useState([]) 

    const refrence = collection(db,'Users')

    const fetchAllUsers = async ()=>{
        const allUsersSnap  = await getDocs(refrence) 
        const allUsersData = allUsersSnap.docs.map((userData)=>({id:userData.id,...userData.data()}))
        const sortedData = allUsersData.sort(
            (a,b) =>{
              const nameA = a.fullName.toLowerCase();
              const nameB = b.fullName.toLowerCase()  
            
              if (nameA< nameB) return -1
              if(nameA>nameB) return 1
            
             return 0
            }) 

        setAllUsers(sortedData) 
        
    }

    const fetchUsers = async()=>{
      try {
        console.log(search) 
        const lowerCaseSearch = search.toLowerCase() 
        console.log(lowerCaseSearch)
        // const qury = query(refrence,where('userName','>=',lowerCaseSearch),where('userName','<=',search +'\uf8ff') )
        // const querySnapShot = await getDocs(qury)
        const querySnapShot = await getDocs(refrence)

        const data = querySnapShot.docs.map((userData)=>({id:userData.id,...userData.data()}))
        const filteredData = data.filter((account)=> account.id != auth.currentUser.uid && account.userName.startsWith(lowerCaseSearch) )
        setUsers(filteredData) 


       } catch (error) {
          console.log(error)
        }
    }
    useEffect(() => {
        fetchAllUsers()
    }, []);

    useEffect(() => {
        if(search){
        fetchUsers()
    }
    setUsers('')
    }, [search]);

    return ( <>
    <div className="w-full md:w-6/12  flex flex-col items-center overflow-scroll ">
        <input 
           type="text" 
           className='w-4/5 border-none shadow-md shadow-slate-400 mt-10 min-h-10 rounded-md pl-5' 
           placeholder='Search username' 
           value={search} 
           onChange={(e)=> setSearch(e.target.value)}
         />
<div className='w-4/5 flex flex-col items-center'>
   
    {users !='' && search !='' ?
     (users.map((userInfo)=>(<User key={userInfo.id} id={userInfo.id} userName={userInfo.userName} fullName={userInfo.fullName} profileImage={userInfo.profilePictureUrl}/>)))
    :
    (allUser.map((userInfo)=>(<User key={userInfo.id} id={userInfo.id} userName={userInfo.userName} fullName={userInfo.fullName} profileImage={userInfo.profilePictureUrl}/>)))

    }
</div>
    </div>
    </> );
}


export default Search;