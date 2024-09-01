import React, { useState,useEffect } from 'react';
import { doc,getDoc,collection,orderBy,where, query, getDocs,updateDoc } from 'firebase/firestore';
import { db,auth } from './firebase';
import { getStorage,ref,getDownloadURL } from 'firebase/storage';
import Tweet from './Tweet';
import '../index.css'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function DisplayProfile()
{
  const navigate = useNavigate()
 
  const user = auth.currentUser
  const [loading,setLoading] = useState(false)
  const [userData,setUserData] = useState()
  const [targetData,setTargetData] = useState()
  const [following,setFollowing] = useState(false)
  const [posts,setPosts] = useState([])
  const {id} = useParams()


  useEffect( () => {

   fetchData() 
   fetchPosts()

  }, []);

  const fetchData = async()=>{
    try {
        setLoading(true)
      const docRef = doc(db,'Users',user.uid)
      const docSnap = await getDoc(docRef)
      setUserData(docSnap.data())


      const targetDocRef = doc(db,'Users',id)
      const targetDocSnap = await getDoc(targetDocRef)
      setTargetData(targetDocSnap.data())
       
      if(docSnap.data()?.following.includes(id)){
        setFollowing(true)
      }  

      setLoading(false)
    } catch (error) {
        console.log(error)
    }
                                     
   }

   const fetchPosts = async(userID)=>{
    try {
      const postsRef = collection(db,'Posts')
      const qery = query(postsRef,where('userId','==',id),orderBy('time','desc'))
      const querySnapshot = await getDocs(qery)
      const postsArray = querySnapshot.docs.map((post)=>({id:post.id,key:post.id,...post.data()}))
      console.log(querySnapshot,'post data')
      setPosts(postsArray) 
  } catch (error) {
    console.log(error)
  }
  }
 
 const followunfollow = async ()=>{

  if (!userData || !targetData) return;

  const userDocRef = doc(db,'Users',user.uid)
  const targetDocRef = doc(db,'Users',id)
  try {
    if( userData && targetData){
       if(!following){
          const updateUserFollowing = [...userData.following,id]
          const updateTargetFollowers = [...targetData.followers,user.uid]
          await updateDoc(userDocRef,{following:updateUserFollowing})
          await updateDoc(targetDocRef,{followers:updateTargetFollowers})
          setFollowing(true)
       }else{
          const updateUserFollowing = userData.following.filter((targetid)=> targetid !== id )
          const updateTargetFollowers = targetData.followers.filter((targetid)=> targetid !== user.uid )
          await updateDoc(userDocRef,{following:updateUserFollowing})
          await updateDoc(targetDocRef,{followers:updateTargetFollowers})
          setFollowing(false)
          
    }
    fetchData() 
  }
  } catch (error) {
     console.log(error)                   
  }
}




 if(loading) return (<h1>Loading</h1>)
    return ( <>
    
<div className="flex flex-col items-center mx-auto overflow-scroll custom-scrollbar md:w-6/12 w-9/12 md:p-5 py-3 bg-white shadow-lg rounded-lg">
  <div className="flex flex-col items-center shadow-slate-400 shadow-lg md:p-5 px-2 pt-5 rounded-lg w-full mx-2">
   
    <div className="relative">
    <span className=" w-36 h-36 rounded-full border-4 border-black overflow-hidden flex items-center justify-center">
   {targetData?.profilePictureUrl ? ( <img src={targetData.profilePictureUrl} alt="" className="w-full h-full object-cover" /> ): (<b>Add profile picture</b>)}
    </span>

    </div>
    <h1 className="text-blue-950  text-3xl font-bold mt-4">{targetData?.fullName}</h1>
    <h2 className="text-gray-700 text-xl">@{targetData?.userName}</h2>
    <div className="flex mt-4 space-x-8">
      <div className="text-center">
        <p className="text-blue-950 font-semibold">Followers</p>
        <p className="text-gray-700">{targetData?.followers.length}</p>
      </div>
      <div className="text-center">
        <p className="text-blue-950 font-semibold">Following</p>
        <p className="text-gray-700">{targetData?.following.length-1}</p>
      </div>
    </div>
    <input 
      type="button"
      onClick={()=>followunfollow()}
      value={following? 'Unfollow':'Follow'}
      className="mt-6 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300" />
    </div>
    
    <h1 className='font-semibold text-blue-950 py-5 text-2xl'>{targetData?.fullName}'s Posts</h1>
    
    {posts != ''? (posts.map((post)=> (<Tweet id={post.id} likes={post.likes} key={post.id} text={post.text} imgSrc={post.imgUrl} userName={post.userName} time={post.time} /> ))):(<h2 className='font-semibold text-blue-950 py-5 '>You have'nt posted anything</h2>)}

    
    </div>
    </>
    )
  }

  export default DisplayProfile;

