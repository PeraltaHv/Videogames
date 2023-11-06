import React from 'react'
import styles from "./landing.module.css"
import { NavLink } from 'react-router-dom';

const Landing = () => {
  return (
    <div className={styles.background} >
           
                
    <NavLink to="/home">
        <button className={styles.button}>INGRESAR</button>
    </NavLink>
    

</div>
  )
}

export default Landing

