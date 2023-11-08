import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
import { restart } from '../../Redux/action'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from "./navbar.module.css"


const Navbar = () => {
 
  const dispatch = useDispatch();
  
  const reset = () => {
    dispatch(restart())
  }

 
  return (
    <div className={styles.contnavbar}>
      <div className={styles.contlinks}>
        <Link onClick={reset} to={"/home"}>Home</Link>
        <Link to={"/create"}>Crear Videogame</Link>
      </div>
      <SearchBar />
    </div>
  );
  
  }
export default Navbar
