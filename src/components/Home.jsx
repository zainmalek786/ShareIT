import React, { useState,useEffect } from 'react';
import Tweet from './Tweet';
import { auth,db } from './firebase';
import { doc,getDoc,getDocs,query,where,collection,orderBy } from 'firebase/firestore';
import '../index.css'
import { Link } from 'react-router-dom';
function Home() {

    useEffect(() => {
        fetchPosts()
    }, []);
    const user = auth.currentUser
    const [posts,setPosts] = useState([]) 
    const [othersPosts,setOthersPosts] = useState([])
    const fetchPosts = async()=>{
        try {
          const docRef = doc(db,'Users',user.uid)   
          const docSnap = await getDoc(docRef) 
          const following = docSnap.data().following     
           if(following) {
          const postsRef = collection(db,'Posts')
          // const qery = query(postsRef,where('userId','in',following),orderBy('time','desc'))
          const querySnapshot = await getDocs(query(postsRef,orderBy('time','desc')))
          const postsArray = querySnapshot.docs.map((post)=>({id:post.id,key:post.id,...post.data()}))
          const followingPosts = postsArray.filter((item)=> following.includes(item.userId))
          const otherPosts =  postsArray.filter((item)=> !following.includes(item.userId))
          console.log(querySnapshot,'post data')
      setOthersPosts(otherPosts)
        setPosts(followingPosts) 
           }
      } catch (error) {
        console.log(error)
      }
    }

    return ( <>
<div className="flex flex-col items-center mx-auto overflow-scroll custom-scrollbar md:w-6/12 w-full md:p-5 py-2 bg-white shadow-lg rounded-lg">
    
 <h1 className="font-bold text-blue-900 text-2xl md:text-3xl my-2">Feed</h1>
    
{posts.length> 0 ? (posts.map((post)=> (<Tweet id={post.id} key={post.id} likes={post.likes} text={post.text} imgSrc={post.imgUrl} userName={post.userName} time={post.time} /> ))):(<h2 className='font-semibold text-blue-950 py-5 '>No posts from following</h2>)}

<h1 className="font-bold text-blue-900 md:text-lg my-4 text-center md:my-6">Posts from the users you are'nt following</h1>

{othersPosts.length> 0 ? (othersPosts.map((post)=> (<Tweet id={post.id} key={post.id} likes={post.likes} text={post.text} imgSrc={post.imgUrl} userName={post.userName} time={post.time} /> ))):(<h2 className='font-semibold text-blue-950 py-5 '>Loading posts...</h2>)}


    </div>

            </> );
}

export default Home;