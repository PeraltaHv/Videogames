const {getGenresDb} = require ('../controllers/genresController')

const getGenresHandler = async (req,res)=>{
    try {
        const response = await getGenresDb()
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}


module.exports={
    getGenresHandler,
}