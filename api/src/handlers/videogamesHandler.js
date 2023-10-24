const{
    createVideogame,
   getAllVideogames,
   getAllVideogamesById
}= require ("../controllers/videogamesController")

const createVideogamesHandler = async(req,res)=>{
    try {
        const{
            name,
            description,
            platforms,
            background_image,
            released,
            rating,
            genres,
        } = req.body;
        const response = await createVideogame(
            name,
            description,
            platforms,
            background_image,
            released,
            rating,
            genres
        )
        res.status(201).json(response)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const getAllVideogamesHandler = async (req,res)=>{
    try {
        const {name} =req.query
        const response = await getAllVideogames(name)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const getDetailHandler = async(req,res) =>{
    const {id} = req.params;
    const source = isNaN(id) ? "bd" : "api"
    try {
        const response = await getAllVideogamesById(id,source)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error:error.messagge})
    }
   
}

module.exports = {
    createVideogamesHandler,
    getAllVideogamesHandler,
    getDetailHandler
}