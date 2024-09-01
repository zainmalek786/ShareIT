import React, { useState,useEffect } from 'react';
import { doc,getDoc,collection,orderBy,where, query, getDocs } from 'firebase/firestore';
import { db,auth } from './firebase';
import { getStorage,ref,getDownloadURL } from 'firebase/storage';
import Tweet from './Tweet';
import '../index.css'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Profile()
{

 const navigate = useNavigate()
 const [userDetails,setUserDetails] = useState('')
 const [imgUrl,setImgUrl] = useState('')
 const [posts,setPosts] = useState([])
 const [loading,setLoading] = useState(false)

const fetchProfilePicture = async (userID) =>{
 
 const storage = getStorage()
 const storageRef = ref(storage,`ProfilePictures/${userID}`)
 const url = await getDownloadURL(storageRef)
  setImgUrl(url)
}

const fetchData = async ()=>{
  setLoading(true)
  const user = auth.currentUser

  const docRef = doc(db,"Users",user.uid)
  const docSnap = await getDoc(docRef)
  if(docSnap.exists()){
    setUserDetails(docSnap.data())
    fetchProfilePicture(user.uid)
  }
  setLoading(false)
}
 
const fetchPosts = async(userID)=>{
  try {
    const postsRef = collection(db,'Posts')
    const qery = query(postsRef,where('userId','==',userID),orderBy('time','desc'))
    const querySnapshot = await getDocs(qery)
    const postsArray = querySnapshot.docs.map((post)=>({id:post.id,key:post.id,...post.data()}))
    console.log(querySnapshot,'post data')

  setPosts(postsArray) 
} catch (error) {
  console.log(error)
}
}
 
 useEffect(() => {
  fetchData()
  fetchPosts(auth.currentUser.uid)
 }, []);
 if(loading) return (<div className='md:w-6/12  w-full text-center text-2xl font-bold flex justify-center items-center'><h1>Loading..</h1></div>)
    return ( <>
    
{/* <div className="flex flex-col items-center mx-auto overflow-scroll custom-scrollbar md:w-6/12 w-9/12 p-5 bg-white shadow-lg rounded-lg"> */}
<div className="flex flex-col items-center mx-auto overflow-scroll custom-scrollbar md:w-6/12 w-full md:p-5 py-2 bg-white shadow-lg rounded-lg">

  <div className="flex flex-col items-center shadow-slate-400 shadow-lg p-5 rounded-lg w-full mx-2">
   
    <div className="relative">
    <span className=" w-36 h-36 rounded-full border-4 border-black overflow-hidden flex items-center justify-center">
   {imgUrl ? ( <img src={imgUrl} alt="" className="w-full h-full object-cover" /> ): (<b>Add profile picture</b>)}
    </span>

    </div>
    <h1 className="text-blue-950  text-3xl font-bold mt-4">{userDetails.fullName}</h1>
    <h2 className="text-gray-700 text-xl">@{userDetails.userName}</h2>
    <div className="flex mt-4 space-x-8">
      <div className="text-center">
        <p className="text-blue-950 font-semibold">Followers</p>
        <p className="text-gray-700" onClick={()=>navigate('/followers')}>{userDetails.followers?.length}</p>
      </div>
      <div className="text-center">
        <p className="text-blue-950 font-semibold">Following</p>
        <p className="text-gray-700" onClick={()=>navigate('/following') } >{userDetails.following?.length -1}</p>
      </div>
    </div>
    <button className="mt-6 md:px-4 px-2 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300" onClick={()=>navigate('/editprofile')}>Edit Profile</button>
  </div>

          <h1 className='font-semibold text-blue-950 py-5 text-2xl'>Your Posts</h1>
         
          {posts != ''? (posts.map((post)=> (<Tweet id={post.id} likes={post.likes} key={post.id} text={post.text} imgSrc={post.imgUrl} userName={post.userName} time={post.time} /> ))):(<h2 className='font-semibold text-blue-950 py-5 '>You have'nt posted anything</h2>)}
   
         

    
    </div>
    
            </> );
}

export default Profile;