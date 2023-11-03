import React from 'react'
import styles from "./card.module.css"
import{Link} from "react-router-dom"


const Card = ({ info }) => {

  return (
    <div className={styles.cardcont} >

      <div className={styles.cardtitlecont}>
       <Link to={`/details/${info.id}`}><h2>{info.name}</h2></Link> 
      </div>
      <div className={styles.cardinfocont}>
        <p> {info.genres}</p>
        <img src={info.background_image} alt="imagen de viideogame" />
      </div>

    </div>

  )
}

export default Card
