import { GET_GENRES, GET_PLATFORMS } from "./action-types";

let initialState = {
    allVideogames:[],
    allGenres:[],
    allPlatforms:[]
}

function rootReducer(state = initialState,action){

       switch(action.type){
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

       
        default:return state
       }

}


export default rootReducer;