import React from 'react'
import Cards from "../../Components/Cards/Cards"
import { getVideogame } from "../../Redux/action"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import {page} from "../../Redux/action"

const Home = () => {

  const dispatch = useDispatch()

  const allVideogames = useSelector (state=>state.allVideogames)
  const currentPage = useSelector (state=>state.currentPage)
  console.log(allVideogames);
  useEffect(() => {
    dispatch(getVideogame())
  }, [])

 const pagination = (event)=>{
     dispatch(page(event.target.name))
 }
 
 
  return (
    <div>
      <div>
       <h3>currentPage:{currentPage}</h3>
       <button name="prev" onClick={pagination}>Prev</button>
       <button name="next" onClick={pagination}>Next</button>
      </div>


      <div>
        <Cards allVideogames={allVideogames}/>
      </div>

    </div>


  )
}

export default Home
