import React from 'react'
import styles from "./card.module.css"
import { Link } from "react-router-dom"


const Card = ({ info }) => {
console.log('ID del videojuego:', info.id);
  return (

    <Link to={`/details/${info.id}`} className={styles.link} >
      <div className={styles.cardcont} >

        <p>{info.name}</p>
        <img src={info.background_image} alt="imagen de viideogame" />

        <div className={styles.genrecont}>

        {info.genres.map((genre, index) => (
            <span key={index}>
              {genre}
              {index < info.genres.length - 1 && ' '}
            </span>
        ))}


        </div>
        <p> Rating: {info.rating}</p>
      </div>
    </Link>
  )
}

export default Card
