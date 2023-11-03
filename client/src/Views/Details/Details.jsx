import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { getVideogameById } from '../../Redux/action'
import styles from "./details.module.css"


const Details = () => {
  const params = useParams()
  const details = useSelector(state => state.details)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getVideogameById(params.id))
  }, [])

  console.log("detalle", details);
  return (
    <div  className={styles.detailscont}>
      
      
      <div className={styles.detailstitlecont}>

        <h1>{details.name}</h1>
     
      </div>




      <div className={styles.detailsinfocont}>
        <p> {details.genres}</p>
        <img src={details.background_image} alt="imagen de viideogame" />
      </div>

    </div>
  )
}

export default Details
