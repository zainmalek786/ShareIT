import React, { useState } from 'react';
import { auth,db } from './firebase';
import { doc,setDoc,getDoc} from 'firebase/firestore'
import { getStorage,uploadBytes,ref,getDownloadURL, } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'

const Post = () => {
  const [text, setText] = useState('');
  const [image, setImage] = useState('');
  const [loading,setLoading] = useState(false)
 
  const navigate = useNavigate()
  const postId = uuidv4()
  const handleSubmit = async () => {
    
    setLoading(true)
    try {
      const user = auth.currentUser
      let postImgUrl =''
      const docRef  = doc(db,"Users",user.uid)
      const docSnap = await getDoc(docRef)
      const data    = docSnap.data()
      if(image){
        const storage = getStorage()
        const storageRef = ref(storage,`PostImg/${user.uid}/${postId}`)
        await uploadBytes(storageRef,image)
        postImgUrl = await getDownloadURL(storageRef)
        
      }
      await setDoc(doc(db,`Posts`,postId),{
        text: text,
        imgUrl: postImgUrl,
        likes:[],
        userId: user.uid,
        userName: data.userName ,
        time: Date.now()
      })
      navigate('/profile')
    } catch (error) {
      console.log(error)
    }

  };

  return (
    
    <div className="flex justify-center items-center md:w-6/12">
      {loading?
      (<h1 className='font-bold text-2xl text-blue-900'>Loading...</h1>):(<div className="w-full md:w-4/6 h-fit bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Create a Post</h2>
        <form >
          <textarea
            className="md:w-full w-10/12 p-2 border rounded-lg mb-4 resize-none"
            rows="4"
            placeholder="What's on your mind?"
            value={text}
            onChange={(e)=>setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="mb-4"
            onChange={(e)=>setImage(e.target.files[0])}
          />
          <button
            onClick={handleSubmit}
            className="md:w-full w-10/12  bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Post
          </button>
        </form>
      </div>)
}
    </div>
  );
};

export default Post;
