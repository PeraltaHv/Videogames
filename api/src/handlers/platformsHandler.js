const {getPlatformsDb} = require ('../controllers/platformsController')

const getPlatformsHandler = async (req,res)=>{
    try {
        const response = await getPlatformsDb()
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}


module.exports={
    getPlatformsHandler,
}