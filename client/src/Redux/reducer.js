import { GET_GENRES, GET_PLATFORMS,SEARCH_VIDEOGAME,GET_VIDEOGAME, GET_DETAILS, PAGINATE } from "./action-types";

let initialState = {
    allVideogames:[],
    allVideogamesBackUp:[],
    allGenres:[],
    allPlatforms:[],
    details:{},
   videogamesFiltered:[],
    currentPage:0

}   

function rootReducer(state = initialState,action){
     const ITEMS_PER_PAGE = 15;
     
     switch(action.type){
     
       
        case GET_VIDEOGAME:
                return{
                    ...state,
                    allVideogames:[...action.payload].splice(0,ITEMS_PER_PAGE),
                    allVideogamesBackUp:action.payload,
                
                }
        case GET_GENRES:
                return{
                    ...state,
                    allGenres:action.payload
                }
            case GET_PLATFORMS:
                return{
                    ...state,
                    allPlatforms:action.payload
                }
            case SEARCH_VIDEOGAME:
                return{
                    ...state,
                    allVideogames:[...action.payload].splice(0,ITEMS_PER_PAGE),
                    videogamesFiltered:action.payload
                }
            case GET_DETAILS:
                return{
                    ...state,
                  details:action.payload
                }
            case PAGINATE:
                
                 const next_page = state.currentPage + 1
                 const prev_page = state.currentPage - 1
                 const firstIndex = action.payload ==="next" ? next_page * ITEMS_PER_PAGE : prev_page * ITEMS_PER_PAGE
                
               
               
               
                 if(action.payload === "next" && firstIndex >= state.allVideogamesBackUp.length ){return state}
                else if (action.payload === "prev" && prev_page < 0){return state}
                 
             
                 
                 
                 return{
                    ...state,
                    allVideogames:[...state.allVideogamesBackUp].splice(firstIndex, ITEMS_PER_PAGE),
                    currentPage : action.payload ==="next" ? next_page : prev_page
                 }
        
      
       
        default:return state
       }

}


export default rootReducer;