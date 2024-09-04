import React, { useState, useEffect } from 'react';
import { IoChatbubbleOutline, IoHeartCircle, IoHeartCircleSharp, IoHeartOutline, IoHeartSharp, IoPersonSharp, IoSaveOutline, IoSendOutline, IoWalletOutline } from 'react-icons/io5';
import { auth, db } from './firebase';
import { getDoc, updateDoc, doc } from 'firebase/firestore';

function Tweet({
    text,
    imgSrc,
    likes = [],
    userName = 'guest',
    time,
    id,
}) {
    const user = auth.currentUser;
    const docRef = doc(db, 'Posts', id);
    const [liked, setLiked] = useState(false);
    const [likesList, setLikesList] = useState(likes);

    const checkLiked = async () => {
        if (likesList.includes(user.uid)) {
            setLiked(true);
        } else {
            setLiked(false);
        }
    };

    useEffect(() => {
        checkLiked();
    }, [likesList]);

    const date = new Date(time);
    const handleClick = async () => {
        try {
            let updateLikes;
            if (liked === false) {
                updateLikes = [user.uid, ...likesList];
            } else {
                updateLikes = likesList.filter((item) => item !== user.uid);
            }
            await updateDoc(docRef, { likes: updateLikes });
            setLikesList(updateLikes);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="flex flex-col md:py-3 w-11/12 md:w-4/5 border border-slate-300 rounded-xl my-4 bg-white shadow-md">
                <div className="flex w-11/12 md:w-4/5 mx-auto items-center mb-2">
                    <span className='text-blue-700 md:text-2xl text-xl'><IoPersonSharp /></span>
                    <span className='md:font-semibold text-blue-700 md:text-lg text-base ml-2'>{userName}</span>
                    <span className='md:text-sm text-xs text-slate-500 ml-4 font-medium'>{date.toLocaleString()}</span>
                </div>
               { text != ''?(
               <div className="mx-auto text-left rounded-md md:w-4/5 w-11/12 border border-blue-600 p-2 bg-blue-50">
                    <p className='text-base'>{text}</p>
                </div>):''}

                {imgSrc && (
                    <img
                        src={imgSrc}
                        alt="Post image"
                        className='md:h-60 h-36 w-11/12 md:w-4/5 rounded-md mx-auto border border-blue-600 object-cover mt-2'
                    />
                )}

                <div className='flex justify-around text-xl mx-auto md:w-4/5 w-11/12 py-2 mt-2'>
                    <span className='flex items-center'>
                        {liked ? (
                            <IoHeartSharp className='text-red-600 cursor-pointer' onClick={handleClick} />
                        ) : (
                            <IoHeartOutline className='cursor-pointer' onClick={handleClick} />
                        )}
                        <h5 className='text-sm ml-2 font-semibold'>{likesList?.length}</h5>
                    </span>
                    <IoChatbubbleOutline className='cursor-pointer' />
                    <IoSendOutline className='cursor-pointer' />
                    <IoWalletOutline className='cursor-pointer' />
                </div>
            </div>
        </>
    );
}

export default Tweet;
