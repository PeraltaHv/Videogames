import axios from "axios"
import { GET_GENRES ,SET_PAGE,CLEAN_DETAIL,GET_PLATFORMS, SEARCH_VIDEOGAME,GET_VIDEOGAME,GET_DETAILS,PAGINATE,FILTER_BY_GENRE,RESET,FILTER_BY_ORIGIN,ORD_ALFAB,ORD_RATING} from "./action-types"

  
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
export function getVideogame(videogame){
    return async function (dispatch){
  try {

    const response =await axios.get(`http://localhost:3001/videogames`)
    dispatch({
      type:GET_VIDEOGAME,
      payload:response.data
    })
    console.log(response); 
    

} catch (error) {
    console.log(error);
  }
    }
}
export function getVideogameById(id){
    return async function (dispatch){
  try {

    const response =await axios.get(`http://localhost:3001/videogames/${id}`)
    dispatch({
      type:GET_DETAILS,
      payload:response.data
    })
    console.log(response.data); 
    

} catch (error) {
    console.log(error);
  }
    }
}
 export function page(order){
  return  function(dispatch){
    dispatch({
      type:PAGINATE,
      payload:order
    })
  }

 }
 export function filterGenre(order){ 
  return async function(dispatch){
      try {
      dispatch(
          {type:FILTER_BY_GENRE,
          payload: order}
      )
      } catch (error) {
          alert(error.response.data.error)
      }
  }
}
export function restart(){ 
  return async function(dispatch){
      try {
      dispatch(
          {type:RESET}
      )
      } catch (error) {
          alert(error.response.data.error)
      }
  }
}
export function filterOrigin(order){ // order <= API || DB
  return async function(dispatch){
      try {
      dispatch(
          {type:FILTER_BY_ORIGIN,
          payload: order}
      )
      } catch (error) {
          alert(error.response.data.error)
      }
  }
}
export function ordAlfabeticamente(order){ // order <= prev || next
  return async function(dispatch){

      dispatch(
          {type:  ORD_ALFAB,
          payload: order}
      )
      
  }
}
export function ordenarRating(order){
  return async function(dispatch){

      dispatch(
          {type:  ORD_RATING,
          payload: order}
      )
      
  }
}
export function cleanDetail(order){
  return { type:CLEAN_DETAIL }

 
}

export function pageChange(newPage)  {
  return {
    type: SET_PAGE,
    payload: newPage,
  };
};