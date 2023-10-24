const {Router}= require ("express")

const{
    createVideogamesHandler,
    getAllVideogamesHandler,
    getDetailHandler
}= require("../handlers/videogamesHandler")

const videogamesRouter= Router()
 
videogamesRouter.post("/",createVideogamesHandler)
videogamesRouter.get("/",getAllVideogamesHandler)
videogamesRouter.get("/:id",getDetailHandler)


module.exports= videogamesRouter