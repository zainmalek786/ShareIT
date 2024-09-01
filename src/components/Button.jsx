import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({
    icon =<IoHome/>,
    Text ="Home",
    path=""
}) => {
    return ( <> 
    <Link to={path}>
    <div className="w-full flex hover:bg-blue-400 py-2 text-xl items-center justify-center  font-semibold  text-black hover:text-white ">

         <span className=' border-black'>{icon}</span>
         <span className='md:flex hidden ml-4'>{Text}</span>

    </div>
    </Link>
    </>  );
}
 
export default Button;