import axios from "axios"
import { GET_GENRES ,GET_PLATFORMS, SEARCH_VIDEOGAME} from "./action-types"

  
export function postVideogame(form){
    return async function (dispatch){
  try {
    await axios.post("http://localhost:3001/videogames",form)
    console.log("Videogame creado:", form); 
     console.log("videogame creado");

} catch (error) {
    console.log(error);
  }
    }
}

export function getGenres(){
    return async function (dispatch){
  try {
    const response =await axios.get("http://localhost:3001/videogames/genres")
    dispatch({
      type:GET_GENRES,
      payload:response.data
    })
    console.log(response); 
    

} catch (error) {
    console.log(error);
  }
    }
}
export function getPlatforms(){
    return async function (dispatch){
  try {
    const response =await axios.get("http://localhost:3001/videogames/platforms")
    dispatch({
      type:GET_PLATFORMS,
      payload:response.data
    })
    console.log(response); 
    

} catch (error) {
    console.log(error);
  }
    }
}
export function searchVideogame(videogame){
    return async function (dispatch){
  try {
  
  console.log(videogame);
    const response =await axios.get(`http://localhost:3001/videogames/?name=${videogame}`)
    dispatch({
      type:SEARCH_VIDEOGAME,
      payload:response.data
    })
    console.log(response); 
    

} catch (error) {
    console.log(error);
  }
    }
}