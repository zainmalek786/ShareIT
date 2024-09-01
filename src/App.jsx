import { useState } from 'react'

import './App.css'
import SideBar from './components/SideBar'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import Right from './components/Right'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="w-screen   flex h-screen absolute overflow-hidden left-0 top-0 ">

    <SideBar/>
    <Home/>
    <Right/>
    </div>
      
     {/* <Login/> */}
     {/* <Signup/> */}
    </>
  )
}

export default App
