import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from './firebase';
import { getStorage, ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { updateEmail, sendEmailVerification } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function EditProfile() {
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [fullName, setFullName] = useState('');
    const [profile, setProfile] = useState('');
    const [loading, setLoading] = useState(false);
    const [displayPicture, setDisplayPicture] = useState('');
    const navigate = useNavigate();

    const fetchData = async () => {
        const user = auth.currentUser;
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        setEmail(data.email || '');
        setUserName(data.userName || '');
        setFullName(data.fullName || '');
        setDisplayPicture(data.profilePictureUrl || '');
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async () => {
        setLoading(true);
        console.log('fn click ho rha hai');
        try {
            const user = auth.currentUser;
            const updates = {
                email,
                userName,
                fullName,
            };

            if (profile) {
                const storage = getStorage();
                const storageRef = ref(storage, `ProfilePictures/${user.uid}`);
                await uploadBytes(storageRef, profile);
                const url = await getDownloadURL(storageRef);
                console.log('downloaded url of img', url);
                updates.profilePictureUrl = url;
            }

            await updateDoc(doc(db, 'Users', user.uid), updates);

            if (email !== user.email) {
                if (!user.emailVerified) {
                    await sendEmailVerification(user);
                    console.log("Email verification sent");
                }
                if (user.emailVerified) {
                    await updateEmail(user, email);
                    console.log('Email updated successfully');
                } else {
                    console.log('Please verify your email first.');
                }
            }
            console.log('yahan tak k code chal rha hai');
            navigate('/profile');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="flex flex-col items-center mx-auto overflow-scroll custom-scrollbar md:w-6/12 w-full max-w-sm p-4 bg-white rounded-lg">
                <form className='bg-slate-100 shadow-md rounded-lg p-4  w-full text-blue-900'>
                    <div className='flex flex-col space-y-4'>
                        <div>
                            <label htmlFor="email" className='block text-left font-semibold text-base mb-1'>Email</label>
                            <input
                                type="email"
                                placeholder='Enter your email'
                                className='w-full h-10 px-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm'
                                value={email}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={loading}
                            />
                        </div>

                        <div>
                            <label htmlFor="text" className='block text-left font-semibold text-base mb-1'>Username</label>
                            <input
                                type="text"
                                placeholder='Enter your username'
                                className='w-full h-10 px-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm'
                                value={userName}
                                required
                                onChange={(e) => setUserName(e.target.value)}
                                disabled={loading}
                            />
                        </div>

                        <div>
                            <label htmlFor="text" className='block text-left font-semibold text-base mb-1'>Full name</label>
                            <input
                                type="text"
                                placeholder='Enter your full name'
                                className='w-full h-10 px-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm'
                                value={fullName}
                                required
                                onChange={(e) => setFullName(e.target.value)}
                                disabled={loading}
                            />
                        </div>

                        <div className='flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4'>
                            <div className='flex-1'>
                                <label htmlFor="file" className='block text-left font-semibold text-base mb-1'>Profile</label>
                                <input
                                    type="file"
                                    className='w-full h-10 px-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm'
                                    disabled={loading}
                                    onChange={(e) => { setProfile(e.target.files[0]); setDisplayPicture(URL.createObjectURL(e.target.files[0])); }}
                                />
                            </div>
                            <div className='w-24 h-24 mx-auto md:mx-0 overflow-hidden rounded-full border-2 border-blue-500'>
                                <img src={displayPicture} alt="Please Select profile picture" className='h-full w-full object-cover' />
                            </div>
                        </div>

                        <button
                            type="button"
                            className='bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg w-full mt-4 text-sm'
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default EditProfile;
