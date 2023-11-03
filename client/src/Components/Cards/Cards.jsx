import React from 'react'
import { useSelector } from 'react-redux'
import Card from "../Card/Card"
import styles from "./cards.module.css"
const Cards = () => {
  
  
const allVideogames = useSelector(state=>state.allVideogames)
  console.log(allVideogames);
  return (
    <div className={styles.cardscont}>
     {allVideogames.map(v=><Card info={v}/> )}
    </div>
  )
}

export default Cards
