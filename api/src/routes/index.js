const { Router } = require('express');
const videogamesRouter = require('./videogamesRouter')
const genresRouter = require('./genresRouter')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

 router.use('/videogames/genres', genresRouter);
 router.use('/videogames', videogamesRouter);



module.exports = router;
