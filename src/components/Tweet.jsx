import React, { useState,useEffect } from 'react';
import { IoChatbubbleOutline, IoHeartCircle, IoHeartCircleSharp, IoHeartOutline, IoHeartSharp, IoPersonSharp, IoSaveOutline, IoSendOutline, IoWalletOutline } from 'react-icons/io5';
import { auth,db } from './firebase';
import { getDoc, updateDoc,doc } from 'firebase/firestore';
function Tweet({
    text ,
    imgSrc,
    likes =[],
    userName = 'guest',
    time,
    id,
}) {
    const user = auth.currentUser
    const docRef = doc(db,'Posts',id)
    const [liked,setLiked] = useState(false)
    const [likesList,setLikesList] = useState(likes)


    const checkLiked = async()=>{
       
            if(likesList.includes(user.uid)) {
                setLiked(true)
            }else{
                    setLiked(false)
                
        }
    }
useEffect(() => {

    checkLiked()
}, [likesList]);
    const date = new Date(time)
    const handleClick = async ()=>{
        // setLiked(!liked)
        try {
            let updateLikes;
            if(liked == false){
              updateLikes = [user.uid,...likesList]
            }else{
              updateLikes = likesList.filter((item)=> item != user.uid)
            }
        await updateDoc(docRef,{likes:updateLikes})
        setLikesList(updateLikes)
        } catch (error) {
            console.log(error)
        }
    }
    return ( <>
    <div className="flex flex-col md:py-2 w-11/12  md:w-4/5 border border-slate-400 rounded-xl my-3 bg-white">
        <div className="flex w-11/12 md:w-4/5  mx-auto items-center">
            <span className='text-blue-800 md:text-xl'><IoPersonSharp/></span>
            <span className='md:font-bold text-blue-800'>{userName}</span>
            <span className='md:text-sm text-xs text-slate-600 md:pl-7 pl-2 font-semibold'>{date.toLocaleString()}</span>
        </div>
        
        <div className="mx-auto  text-left rounded-md  md:w-4/5 w-11/12  border border-blue-700 md:py-2"><p>{text}</p>
        </div>
           {imgSrc?(<img src={imgSrc} alt="cannot load image" className=' md:h-60 w-11/12 md:w-4/5 h-36  rounded-md max-w-xs md:max-w-sm lg:max-w-md mx-auto border border-blue-700 object-cover'  />):''}
        
        <div className='flex justify-around text-2xl mx-auto md:w-4/5 w-11/12  py-2'>
        <span className='flex'>{ liked == false ? (<IoHeartOutline className='' onClick={handleClick}/>):(<IoHeartSharp className='text-red-700' onClick={handleClick}/>)} <h5 className='text-sm text-left font-semibold'>{likesList?.length}</h5></span>
          <IoChatbubbleOutline/>
          <IoSendOutline/>
          <IoWalletOutline/>
        </div>
        
    </div>
    </>  );
}

export default Tweet;