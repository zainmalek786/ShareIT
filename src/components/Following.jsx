import React, { useState,useEffect } from 'react';
import { auth,db } from './firebase';
import { getDoc ,doc, collection, query, where, getDocs } from 'firebase/firestore';
import User from './User';
function Following()
{
useEffect(() => {
    fetchFollowing() 
}, []);
    const [followingData,setFollowingData] = useState([])

    const fetchFollowing= async()=>{

        try {
            const user = auth.currentUser
            const docRef = doc(db,'Users',user.uid)
            const docSnap = await getDoc(docRef)
            const following = docSnap?.data().following
            console.log(following)
    
            const refrence = collection(db,'Users')
            // const qury = query(refrence,where('UserId','in',following))
            const docsSnap = await getDocs(refrence)
            console.log(docsSnap.docs)
            const data = docsSnap.docs.map((doc)=>({key:doc.id,id:doc.id,...doc.data()}))
            const filteredData = data.filter((item)=> item.id != user.uid && following.includes(item.id))
            if  (data)setFollowingData(filteredData)
            console.log(followingData)
    
        } catch (error) {
           console.log(error)
        }

    }
    return ( <>
  <div className='md:w-6/12 w-full flex flex-col items-center'>
  <h1 className="font-bold text-blue-900 text-3xl my-2">Following</h1>
   
   {followingData.length > 0  ? (followingData.map((userInfo)=>(<User key={userInfo.id} id={userInfo.id} userName={userInfo.userName} fullName={userInfo.fullName} profileImage={userInfo.profilePictureUrl}/>))):(<h1>You are not following anyone</h1>)}
</div>
   
    </> );
}

export default Following;