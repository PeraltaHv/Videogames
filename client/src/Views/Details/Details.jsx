import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { cleanDetail, getVideogameById } from '../../Redux/action'
import styles from "./details.module.css"
import ClipLoader
  from "react-spinners/ClipLoader";


const Details = () => {
  const [loading, setloading] = useState(true)

  const params = useParams()
  const details = useSelector(state => state.details)
  const dispatch = useDispatch()

  console.log("params", params);

  useEffect(() => {
    dispatch(getVideogameById(params.id))
    return () => dispatch(cleanDetail())
  }, [])

  useEffect(() => {
    setloading(true)
    setTimeout(() => {
      setloading(false)
    }, 5000)
  }, [])

  console.log("detalle", details);
  return (
    <div className={styles.detail}>
      {loading ?
        <ClipLoader
          color={"white"}

          loading={loading}
          size={200}
          aria-label="Loading Spinner" eta
          data-testid="loader"

        /> :

        <div className={styles.detailscont}>


               <h1>{details.name}</h1>
               <p>Id:{details.id}</p>
               <img src={details.background_image} alt="imagen de viideogame" />


          <div className={styles.detailsinfocont}>
           
                 <div className={styles.platformcont}>
           
                          <p>Plataformas: </p>  {details.platforms?.map((platform, index) => (
                           <span key={index}>
                             {platform}
                            {index < details.platforms.length- 1 && ' - '}
                          </span>
                        ))}
          
                </div>
          
                      <p> Descripción:</p>{details.description}
         
           <div  className={styles.contdatos}>
                
                     <div> <p> Fecha de lanzamiento:</p>{details.released}</div>
                     <div><p> Rating:</p>{details.rating}</div>


         
          
                 <div className={styles.genrecont}>
                       <p>Generos:</p> 
                       {details.genres?.map((genre, index) => (
                       <span key={index}>
                       {genre}
                       {index < details.genres.length - 1 && ' - '}
                       </span>
                       ))}
                 </div>
          </div>
       </div>
          
        </div>
      }
    </div>
  )
}

export default Details
