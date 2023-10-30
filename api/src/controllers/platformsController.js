const {Platforms}= require ("../db")
const axios = require ("axios")
const {API_KEY } = process.env;

const getPlatformsDb = async ()=>{
   const platformsDb = await Platforms.findAll()
if(!platformsDb.length){
    const response = await axios.get(`https://api.rawg.io/api/platforms?key=${API_KEY}`)
    const platformsData = response.data.results 
  
  if(platformsData && Array.isArray(platformsData)){
    const platforms = []
     platformsData.forEach((platform)=>platforms.push(platform.name))

     platforms.forEach(async (p)=>{
      await Platforms.findOrCreate({
        where:{name:p}
      })
     })
   
   return platforms
    }
 
  
}
  return platformsDb.map((p)=>p.name)
}


module.exports={getPlatformsDb}