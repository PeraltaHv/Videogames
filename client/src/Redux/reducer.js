import { GET_GENRES,SET_PAGE, CLEAN_DETAIL,GET_PLATFORMS, SEARCH_VIDEOGAME, GET_VIDEOGAME, GET_DETAILS, PAGINATE, FILTER_BY_GENRE, RESET,FILTER_BY_ORIGIN ,ORD_ALFAB, ORD_RATING} from "./action-types";

let initialState = {
    allVideogames: [],
    allVideogamesBackUp: [],
    allGenres: [],
    allPlatforms: [],
    details: {},
    videogamesFiltered: [],
    currentPage: 0,

    filters: false


}

function rootReducer(state = initialState, action) {
    const ITEMS_PER_PAGE = 15;

    switch (action.type) {


        case GET_VIDEOGAME:
            return {
                ...state,
                allVideogames: [...action.payload].splice(0, ITEMS_PER_PAGE),
                allVideogamesBackUp: action.payload,

            }
        case GET_GENRES:
            return {
                ...state,
                allGenres: action.payload
            }
        case GET_PLATFORMS:
            return {
                ...state,
                allPlatforms: action.payload
            }
        case SEARCH_VIDEOGAME:
            return {
                ...state,
                allVideogames: [...action.payload].splice(0, ITEMS_PER_PAGE),
                videogamesFiltered: action.payload,
                filters: true


            }

        case FILTER_BY_GENRE:
            return {
                ...state,
                allVideogames: [...state.allVideogamesBackUp].filter(videogame => videogame.genres.includes(action.payload)).splice(0, ITEMS_PER_PAGE), // action.payload <= order
                videogamesFiltered: [...state.allVideogamesBackUp].filter(videogame => videogame.genres.includes(action.payload))
            }


        case FILTER_BY_ORIGIN:
            if (action.payload === "Todos")
            return {
           ...state,
         
            };
    
          console.log(action.payload);
          if (action.payload === "Creados") {
            console.log(state.allVideogamesBackUp);
            const dbVideogames = [...state.allVideogamesBackUp]?.filter((videogame) =>  typeof videogame.id === "string"|| typeof videogame.ID === "string" );
            console.log(dbVideogames);
            return {
              ...state,
            allVideogames:[...dbVideogames].splice(0, ITEMS_PER_PAGE),
            
            };
          }
          if (action.payload === "Api") {
            const apiVideogames = [...state.allVideogamesBackUp]?.filter((videogame) => typeof videogame.id === "number");
           console.log(apiVideogames);
            return {
              ...state,
             allVideogames: [...apiVideogames].splice(0, ITEMS_PER_PAGE),
            
            }
          }


         console.log("payload detail",action.payload);
        case GET_DETAILS:
            return {
                ...state,
                details: action.payload
            }
        case PAGINATE:

            const next_page = state.currentPage + 1
            const prev_page = state.currentPage - 1
            const firstIndex = action.payload === "next" ? next_page * ITEMS_PER_PAGE : prev_page * ITEMS_PER_PAGE

            if (state.filters) {

                if (action.payload === "next" && firstIndex >= state.videogamesFiltered.length) return state
                if (action.payload === "prev" && prev_page < 0) return state

                return {
                    ...state,
                    allVideogames: [...state.videogamesFiltered].splice(firstIndex, ITEMS_PER_PAGE),
                    currentPage: action.payload === "next" ? next_page : prev_page
                }
            }

            if (action.payload === "next" && firstIndex >= state.allVideogamesBackUp.length) return state
            if (action.payload === "prev" && prev_page < 0) return state


            return {
                ...state,
                allVideogames: [...state.allVideogamesBackUp].splice(firstIndex, ITEMS_PER_PAGE),
                currentPage: action.payload === "next" ? next_page : prev_page
            }

        case RESET:
            return {
                ...state,
                allVideogames: [...state.allVideogamesBackUp].splice(0, ITEMS_PER_PAGE),
                videogamesFiltered: [],
                currentPage:0
            }
            case ORD_ALFAB:
           
            if(action.payload === "AZ"){
              let asc = []
              if(state.videogamesFiltered > 0){
                 asc = [...state.videogamesFiltered].sort((prev,next)=>{
                    if(prev.name.toLowerCase() > next.name.toLowerCase() )return 1
                    if(prev.name.toLowerCase() < next.name.toLowerCase()) return -1
                    return 0
                })
              }else{
                 asc = [...state.allVideogamesBackUp].sort((prev,next)=>{
                    if(prev.name.toLowerCase() > next.name.toLowerCase() )return 1
                    if(prev.name.toLowerCase() < next.name.toLowerCase()) return -1
                    return 0
                })
                return {
                    ...state,
                    allVideogames:[...asc].splice(0,ITEMS_PER_PAGE),
                    videogamesFiltered:asc,
                     currentPage:0
                    }
                     
            
            }
               
          
              
            }
            if(action.payload === "ZA"){
               let dte = []
               
                if(state.videogamesFiltered > 0){
                     dte = [...state.videogamesFiltered].sort((prev,next)=>{
                        if(prev.name.toLowerCase() < next.name.toLowerCase() )return 1
                        if(prev.name.toLowerCase() > next.name.toLowerCase()) return -1
                        return 0
                    })  
                    return {
                        ...state,
                        allVideogames:[...dte].splice(0,ITEMS_PER_PAGE),
                         videogamesFiltered:dte,
                         currentPage:0
                        }
                }else{
                     dte = [...state.allVideogamesBackUp].sort((prev,next)=>{
                        if(prev.name.toLowerCase() < next.name.toLowerCase() )return 1
                        if(prev.name.toLowerCase() > next.name.toLowerCase()) return -1
                        return 0
                    })
                    return {
                        ...state,
                        allVideogames:[...dte].splice(0,ITEMS_PER_PAGE),
                         videogamesFiltered:dte,
                         currentPage:0
                        }
                }
                
              
            }
       
            case ORD_RATING:
           
            if(action.payload === "1-5"){
                 let asc = []
              if(state.videogamesFiltered >0){
                 asc = [...state.videogamesFiltered].sort((prev,next)=>{
                    if(prev.rating > next.rating )return 1
                    if(prev.rating < next.rating) return -1
                    return 0
                })
                return {
                    ...state,
                    allVideogames:[...asc].splice(0,ITEMS_PER_PAGE),
                   videogamesFiltered:asc,
                     currentPage:0
                    }
            }else{
                 asc = [...state.allVideogamesBackUp].sort((prev,next)=>{
                    if(prev.rating > next.rating )return 1
                    if(prev.rating < next.rating) return -1
                    return 0
                })
                return {
                    ...state,
                    allVideogames:[...asc].splice(0,ITEMS_PER_PAGE),
                   videogamesFiltered:asc,
                     currentPage:0
                    }
                     
            
            }
        }
              
              
            
            if(action.payload === "5-1"){
               let dte = []
                if(state.videogamesFiltered > 0){
                     dte = [...state.videogamesFiltered].sort((prev,next)=>{
                        if(prev.rating < next.rating )return 1
                        if(prev.rating > next.rating) return -1
                        return 0
                    })
                }else{
                    dte = [...state.allVideogamesBackUp].sort((prev,next)=>{
                        if(prev.rating < next.rating )return 1
                        if(prev.rating > next.rating) return -1
                        return 0
                    })
                    return {
                        ...state,
                        allVideogames:[...dte].splice(0,ITEMS_PER_PAGE),
                         videogamesFiltered:dte,
                         currentPage:0
                        }
                }
                
               
            }
           case CLEAN_DETAIL:
            return{
                ...state,
                details:{}
            }
                  
            case SET_PAGE:
               
           
            default: return state
    }

}


export default rootReducer;