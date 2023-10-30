const { Router } = require('express');
const videogamesRouter = require('./videogamesRouter')
const genresRouter = require('./genresRouter');
const platformsRouter = require('./platformsRouter');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

 router.use('/videogames/platforms', platformsRouter);
 router.use('/videogames/genres', genresRouter);
 router.use('/videogames', videogamesRouter);



module.exports = router;
