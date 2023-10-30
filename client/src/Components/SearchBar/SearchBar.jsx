import React, { useState } from 'react'
import { searchVideogame } from '../../Redux/action'
import { useDispatch } from 'react-redux'

const SearchBar = () => {
  
    const dispatch = useDispatch()
    const [videogame,setVideogame] = useState("")
  
  const handleChange = (event) =>{
   setVideogame(event.target.value)
  }

  const handleSubmit = (event)=>{
    event.preventDefault()
    dispatch(searchVideogame(videogame))
  }

  
    return (
    <div>
      <form onSubmit={handleSubmit}>
           <input  onChange={handleChange} type="text"/>
           <input  type="submit"/>
      </form>
    </div>
  )
}

export default SearchBar
