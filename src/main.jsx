import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { login } from './RTK/slice.js'
import {store} from './RTK/store.js'
import { Provider } from 'react-redux'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './components/Home.jsx'
import Profile from './components/Profile.jsx'
import Liked from './components/Liked.jsx'
import Layout from './components/Layout.jsx'
import Search from './components/Search.jsx'
import Post from './components/Post.jsx'
import PrivateRoute from './RTK/PrivateRoute.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import Following from './components/Following.jsx'
import Followers from './components/Followers.jsx'

import { ToastContainer } from 'react-toastify'
import EditProfile from './components/EditProfile.jsx'
import DisplayProfile from './components/DisplayProfile.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    // <Route path='/' element={<Provider store={store} ><Layout/></Provider>}>
    
    <Route path='/' element={<Provider store={store} ><Layout/></Provider>}>
    
      <Route path='login'    element={<Login/>}/>
      <Route path='signup'   element={<Signup/>}/>
      <Route path=''         element={<PrivateRoute children={<Home/>}/>}/>
      <Route path='profile'  element={<PrivateRoute children={<Profile/>}/>}/>
      <Route path='liked'    element={<PrivateRoute children={<Liked/>} />}/>
      <Route path='search'   element={<PrivateRoute children={<Search/>}/>}/>
      <Route path='post'     element={<PrivateRoute children={<Post/>}/>}/>
      <Route path='following'     element={<PrivateRoute children={<Following/>}/>}/>
      <Route path='followers'     element={<PrivateRoute children={<Followers/>}/>}/>
      <Route path='search/displayprofile/:id' element={<PrivateRoute children={<DisplayProfile/>}/>}/>
      <Route path='followers/displayprofile/:id' element={<PrivateRoute children={<DisplayProfile/>}/>}/>
      <Route path='following/displayprofile/:id' element={<PrivateRoute children={<DisplayProfile/>}/>}/>

      <Route path='editprofile'     element={<PrivateRoute children={<EditProfile/>}/>}/>
    </Route>
    
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
