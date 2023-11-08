import React from 'react'
import Cards from "../../Components/Cards/Cards"
import { getVideogame } from "../../Redux/action"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect,useState ,CSSProperties } from 'react'
import { page } from "../../Redux/action"
import { getGenres } from '../../Redux/action'
import { filterGenre } from '../../Redux/action'
import { restart } from '../../Redux/action'
import { filterOrigin } from '../../Redux/action'
import { ordAlfabeticamente } from '../../Redux/action'
import { ordenarRating } from '../../Redux/action'
import styles from "./home.module.css"
import ClipLoader
from "react-spinners/ClipLoader";



const Home = () => {
 

  const [loading , setloading] = useState(true)
  
   const dispatch = useDispatch()

  const allVideogames = useSelector(state => state.allVideogames)
  const allGenres = useSelector(state => state.allGenres)

 
 
  useEffect(() => {
    dispatch(getVideogame())
    dispatch(getGenres())
  }, [])
 
  useEffect(() => {
  setloading(true)
  setTimeout(()=>{
    setloading(false)
  },5000)
  }, [])

  const pagination = (event) => {
    dispatch(page(event.target.name))

  }

  const filterByGenre = (event) => {
    dispatch(filterGenre(event.target.value))
  }

  const reset = (event) => {
    dispatch(restart())
  }
  const filterByOrigin = (event) => {
    dispatch(filterOrigin(event.target.name))
  }


  const ordAlfab = (event) => {
    dispatch(ordAlfabeticamente(event.target.name))
  }
  const ordRating = (event) => {
    dispatch(ordenarRating(event.target.name))
  }
  return (
    <div className={styles.conthome}>



      <div className={styles.contfilters}>
        
        <div className={styles.contord}>
          Ordenar:
             <div className={styles.ordrating}>
                <p>Rating</p>
                 <button onClick={ordRating} name='1-5'>{"Menor a mayor"}</button>
                  <button onClick={ordRating} name='5-1'>{"Mayor a menor"}</button>
            </div>
            <div className={styles.ordalfab}>
                <p>Alfabeticamente</p>
                <button onClick={ordAlfab} name='AZ'>{"A-Z"}</button>
                <button onClick={ordAlfab} name='ZA'>{"Z-A"}</button>
            </div>
        </div>
       
       
        <div className={styles.contfilter}>
          Filtrar por :
              <div className={styles.contorigin}>
                  Origen:
                  <button onClick={filterByOrigin} name={"Creados"}>Creados</button>
                   <button onClick={filterByOrigin} name={"Api"}>Api</button>
              </div>

              <div className={styles.contgenres}>
                  Genero:
                 <select name="filterByGenre" onChange={filterByGenre}>
                  {allGenres.map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
             </div>
        </div>

      </div>
     
     
     

            <div className={styles.contpage}>

                <div>
                    <button name="prev" onClick={pagination}>Prev</button>
                     <button name="next" onClick={pagination}>Next</button>
                 </div>

                <div>
                   <button onClick={reset}>Restart</button>
                </div>
    
    
                
                </div>
                <div  className={styles.contcards}>  
                 { loading?
                        <ClipLoader

                        color={"white"}
                       
                        loading={loading}
                        size={200}
                        aria-label="Loading Spinner"eta
                        data-testid="loader"
                      
                      /> :
                     <Cards allVideogames={allVideogames} />
                      
                 }
                
                     </div>
         

    </div>


  )
}

export default Home
