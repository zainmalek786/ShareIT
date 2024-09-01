import React, { useState,useEffect } from 'react';
import Tweet from './Tweet';
import { auth,db } from './firebase';
import { doc,getDoc,getDocs,query,where,collection,orderBy } from 'firebase/firestore';
import '../index.css'

function Liked() {

    useEffect(() => {
        fetchPosts()
    }, []);
    const user = auth.currentUser
    const [posts,setPosts] = useState([]) 
    const fetchPosts = async()=>{
        try {

          const postsRef = collection(db,'Posts')
         //  const qery = query(postsRef,where('userId','in',following),orderBy('time','desc'))
         // const qery = query(postsRef,orderBy('time','desc'))

          const querySnapshot = await getDocs(query(postsRef,orderBy('time','desc')))
          const postsArray = querySnapshot.docs.map((post)=>({id:post.id,key:post.id,...post.data()}))
          const filteredPostArray = postsArray.filter((item)=> item.likes.includes(user.uid))
          console.log(querySnapshot,'post data')
          if(filteredPostArray) setPosts(filteredPostArray) 
           
      } catch (error) {
        console.log(error)
      }
    }

    return ( <>
{/* <div className="flex flex-col items-center mx-auto overflow-scroll custom-scrollbar md:w-6/12 w-9/12 p-5 bg-white shadow-lg rounded-lg"> */}
<div className="flex flex-col items-center mx-auto overflow-scroll custom-scrollbar md:w-6/12 w-full md:p-5 py-2 bg-white shadow-lg rounded-lg">

<h1 className="font-bold text-blue-900 text-2xl md:text-3xl my-2">Liked Posts</h1>
    
{posts.length> 0 ? (posts.map((post)=> (<Tweet id={post.id} key={post.id} likes={post.likes} text={post.text} imgSrc={post.imgUrl} userName={post.userName} time={post.time} /> ))):(<h2 className='font-semibold text-blue-950 py-5 '>No liked post</h2>)}


    </div>

            </> );
}

export default Liked;