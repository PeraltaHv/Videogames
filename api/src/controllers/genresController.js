const {Genres}= require ("../db")
const axios = require ("axios")
const {API_KEY } = process.env;

const getGenresDb = async ()=>{
   const genresDb = await Genres.findAll()
if(!genresDb.length){
    const response = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    const genresData = response.data.results 
  
  if(genresData && Array.isArray(genresData)){
    const genres = []
     genresData.forEach((genre)=>genres.push(genre.name))
 
     genres.forEach(async (g)=>{
      await Genres.findOrCreate({
        where:{name:g}
      })
     })
   
   return genres
    }
   
  
  
}
  return genresDb.map((g)=>g.name)
}


module.exports={getGenresDb}