import React, { useState } from 'react'
import { searchVideogame } from '../../Redux/action'
import { useDispatch } from 'react-redux'
import styles from "./searchbar.module.css"

const SearchBar = () => {
  
    const dispatch = useDispatch()
    const [videogame,setVideogame] = useState("")
  
  const handleChange = (event) =>{
   setVideogame(event.target.value)
  }

  const handleSubmit = (event)=>{
    event.preventDefault()
    dispatch(searchVideogame(videogame))
    document.getElementById("search").value=""
  }

  
    return (
    <div className={styles.contsearchbar}>
      <form className={styles.continputs} onSubmit={handleSubmit}>
           <input placeholder=   '    introducir nombre'  id="search" onChange={handleChange} type="text"/>
           <button  type ="submit"> Buscar</button>
      </form>
    </div>
  )
}

export default SearchBar
