import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
import { restart } from '../../Redux/action'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'



const Navbar = () => {
 
  const dispatch = useDispatch();
  
  const reset = () => {
    dispatch(restart())
  }

 
  return (
    <div>
     
      <div className='nav-cont-links'>
            <Link onClick={reset} to={"/home"}>Home</Link>
            <Link  to={"/create"}>Form</Link>
        </div>
  
   <SearchBar/>
    </div>
  )
}

export default Navbar
