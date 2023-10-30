import React, { useState } from 'react'
import styles from "./create.module.css"
import { getGenres, getPlatforms, postVideogame } from '../../Redux/action'
import {useDispatch, useSelector} from "react-redux"
import { useEffect } from 'react'



const Create = () => {
  
  const dispatch =useDispatch()
   const allGenres = useSelector(state=>state.allGenres)
   const allPlatforms = useSelector(state=>state.allPlatforms)
 
  useEffect(()=>{
 dispatch(getGenres())
 dispatch(getPlatforms())
  
},[])
  
  

  const [form, setForm] = useState({
    name: "",
    background_image: "",
    description: "",
    platforms: [],
    released: "",
    rating: "",
    genres: []

  })

  const [errors, setErrors] = useState({
    name: "",
    background_image: "",
    description: "",
    platforms: [],
    released: "",
    rating: "",
    genres: []
 

  })

  console.log(errors);
  const validate = (form, name) => {
    switch (name) {

      case "name":
        if (form.name === "") setErrors({ ...errors, name: "Campo requerido" })
        else setErrors({ ...errors, name: "" })
        break

      case "background_image":
        if (form.background_image === "") setErrors({ ...errors, background_image: "Campo requerido" })
        else setErrors({ ...errors, background_image: "" })
        break

      case "description":
        if (form.description === "") { setErrors({ ...errors, description: "Campo requerido" }) }
        else if (form.description.length < 20 || form.description.length > 100) {
          setErrors({ ...errors, description: "La descripción debe tener entre 20 y 100 caracteres" })
        }
        else setErrors({ ...errors, description: "" })
        break

      case "released":
        if (form.released === "") setErrors({ ...errors, nombre: "Campo requerido" })
        else setErrors({ ...errors, released: "" })
        break

      case "rating":
        if (form.rating < 1 || form.rating > 5) setErrors({ ...errors, rating: "elija entre 1 y 5 " })
        else setErrors({ ...errors, rating: "" })
        break
       
        default:
   
      }

  }


 
  const handleChange = (event) => {

    if (event.target.name === "genres") {
      setForm({
        ...form,
        genres: [...form.genres, event.target.value]
      })
    } else if (event.target.name === "platforms") {
      setForm({
        ...form,
        platforms: [...form.platforms, event.target.value]
      })
    }
    else {
      setForm({
        ...form,
        [event.target.name]: event.target.value
      })
    }
    validate({
      ...form,
      [event.target.name]: event.target.value
    }, event.target.name)


  }
  
  const handleSubmit=(event)=>{
   event.preventDefault()
   console.log(form);
   dispatch(postVideogame(form))
  
 
 
  }

  return (
    <div className={styles.formcont} >

      <form onSubmit={handleSubmit}>
        <h1>Crea tu videogame</h1>

        <label htmlFor="name">name:</label>
        <input placeholder='name' name="name" onChange={handleChange} type="text" />
        <span>{errors.name}</span>

        <label htmlFor="background_image">Imagen:</label>
        <input placeholder='Intriduzca la url de la imagen' name="background_image" onChange={handleChange} type="text" />
        <span>{errors.background_image}</span>

        <label htmlFor="description">Descripción:</label>
        <input placeholder='Descripcion entre 20 y 100 caracteres' name="description" onChange={handleChange} type="text" />
        <span>{errors.description}</span>
        
        <label htmlFor="released">Fecha:</label>
        <input placeholder='Descripcion entre 20 y 100 caracteres' name="released" onChange={handleChange} type="text" />
        <span>{errors.released}</span>

      
      
        {/* <label htmlFor="fecha" >Seleccione una fecha <span style={{ color: "red" }}>{errors.fechaVacio}</span></label>
        <input type="date"  name="fecha"  onChange={handleChange} />
        <span style={{ color: "red" }}>{errors.fecha}</span>
        <span style={{ color: "red" }}>{errors.fechaAnterior}</span> */}

        <input type="number"  name="rating" 
          onChange={handleChange} />
        <span style={{ color: "red" }}>{errors.rating}</span>


       
        <select onChange={handleChange} name="platforms" id="">
        {allPlatforms.map(platform=><option value={platform} >{platform}</option>)}
        </select>
     
        <select onChange={handleChange} name="genres" id="">
             {allGenres.map(genre=><option value={genre} >{genre}</option>)}

        </select>
        <div>
          <button className={styles.formbutton} type="submit">
            Crear Videogame
          </button>
        </div>
     
      </form>
    </div>
  )
}

export default Create
// Nombre.
// Imagen.
// Descripción.
// Plataformas.
// Fecha de lanzamiento.
// Rating.
// Posibilidad de seleccionar/agregar varios géneros en simultáneo.