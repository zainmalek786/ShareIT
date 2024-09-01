import React, { useState,useEffect } from 'react';
import { auth,db } from './firebase';
import { getDoc ,doc, collection, query, where, getDocs } from 'firebase/firestore';
import User from './User';
function Followers()
{
useEffect(() => {
    fetchFollowers() 
}, []);
    const [followersData,setFollowersData] = useState([])

    const fetchFollowers= async()=>{

        try {
            const user = auth.currentUser
            const docRef = doc(db,'Users',user.uid)
            const docSnap = await getDoc(docRef)
            const followers = docSnap?.data().followers
            
    
            const refrence = collection(db,'Users')
            // const qury = query(refrence,where('UserId','in',following))
            const docsSnap = await getDocs(refrence)
            console.log(docsSnap.docs)
            const data = docsSnap.docs.map((doc)=>({key:doc.id,id:doc.id,...doc.data()}))
            const filteredData = data.filter((item)=> item.id != user.uid && followers.includes(item.id))
            if  (data)setFollowersData(filteredData)
            console.log(followersData)
    
        } catch (error) {
           console.log(error)
        }

    }
    return ( <>
  <div className='md:w-6/12 w-full flex flex-col items-center'>
 <h1 className="font-bold text-blue-900 text-3xl my-2">Followers</h1>
   
   {followersData.length > 0  ? (followersData.map((userInfo)=>(<User key={userInfo.id} id={userInfo.id} userName={userInfo.userName} fullName={userInfo.fullName} profileImage={userInfo.profilePictureUrl}/>))):(<h1>No one has followed you</h1>)}
  
</div>
   
    </> );
}

export default Followers;