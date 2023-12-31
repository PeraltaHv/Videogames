const {Videogames,Genres}= require ("../db")
const axios = require ("axios")
const {API_KEY } = process.env;

const { Op } = require('sequelize');

const createVideogame = async (
    
    name,
    description,
    platforms,
    background_image,
    released,
    rating,
    genres
) => {
    console.log("Valor de name recibido:", name);
  
    const existingVideogame = await Videogames.findOne({
        where: {
          [Op.or]: [
            { genres: { [Op.contains]: genres } },
            { platforms: { [Op.contains]: platforms } }
          ],
        },
      });
    
      if (existingVideogame) {
        // Mostrar una alerta si ya existe un videojuego con los mismos géneros o plataformas
        alert("¡Ya existe un videojuego con los mismos géneros o plataformas!");
        return null; // Retorna null u otra cosa para indicar que la creación no fue exitosa
      }
    
    
    if (Array.isArray(genres) && typeof genres[0] === 'string') {
        // Convertir los strings en objetos con el formato correcto
        genres = genres.map(genre => ({ name: genre }));
    }
  
    const newVideogame = await Videogames.create({
        name,
        description,
        platforms,
        background_image,
        released,
        rating,
        
    });

    const genreNames = genres.map(genre => genre.name);

    // Buscar los modelos Genres basándose en los nombres
    const genresDb = await Genres.findAll({
        where: {
            name: {
                [Op.or]: genreNames,
            },
        },
    });

    // Asociar los géneros encontrados con el nuevo videojuego
    await newVideogame.addGenres(genresDb);

    return newVideogame;
};


const getVideogamesDb = async ()=>{

const videogamesDb = await Videogames.findAll({
    include:[
        {
            model:Genres,
            atributes:["name"]
        }
        ]
})
 const infoEstructurada = videogamesDb.map((videogame)=>{
    return{
        id: videogame.id,
        name: videogame.name,
        description: videogame.description,
        platforms: videogame.platforms,
        background_image: videogame.background_image,
        released: videogame.released,
        rating: videogame.rating,
        genres: videogame.Genres.map(genre => genre.name)
    
    }
 })
return infoEstructurada
}



const getVideogamesApi = async () => {
    let allVideogames = [];

    // Bucle para recorrer las páginas de la API (supongamos que queremos 4 páginas)
    for (let page = 1; page <= 5; page++) {
        const { data } = await axios.get(
            `https://api.rawg.io/api/games?key=${API_KEY}&page=${page}`
        );

        const videogamesApi = data.results;

        const infoEstructurada = videogamesApi.map((videogame) => {
            return {
                id: videogame.id,
                name: videogame.name,
                description: videogame.description,
                platforms: videogame.platforms.map(platform => platform.platform.name),
                background_image: videogame.background_image,
                released: videogame.released,
                rating: videogame.rating,
                genres: videogame.genres.map(genre => genre.name)
            };
        });

      
        allVideogames = [...allVideogames, ...infoEstructurada];
    }

    return allVideogames;
};


const getAllVideogames = async (name)=>{
    const videogamesDb = await getVideogamesDb()
    const videogamesApi= await getVideogamesApi()
    const allVideogames = [...videogamesDb,...videogamesApi]
console.log(name);
console.log(allVideogames);
    if(name){
        const videogamesFilter = allVideogames.filter(
            (videogame)=>videogame.name.toLowerCase().includes(name.toLowerCase())
        )
    if(!videogamesFilter.length)throw Error (`No se encontraron resultados con el nombre:${name}`)
    return videogamesFilter.slice(0,15)
    }


return allVideogames
}

const formatVideoGameInfo = (videogame, isFromAPI) => {
    if (isFromAPI) {
        return {
            id: videogame.id,
            name: videogame.name,
            description: videogame.description,
            platforms: videogame.platforms.map(platform => platform.platform.name),
            background_image: videogame.background_image,
            released: videogame.released,
            rating: videogame.rating,
            genres: videogame.genres.map(genre => genre.name)
        };
    } else {
        return {
            id: videogame.id,
            name: videogame.name,
            description: videogame.description,
            platforms: videogame.platforms,
            background_image: videogame.background_image,
            released: videogame.released,
            rating: videogame.rating,
            genres: videogame.Genres.map(genre => genre.name)
        };
    }
};

const getAllVideogamesById = async (id, source) => {
    let videogame;
    if (source === "api") {
        videogame = (await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)).data;
        return formatVideoGameInfo(videogame, true);
    } else {
        videogame = await Videogames.findByPk(id, {
            include:[
                {
                    model:Genres,
                    atributes:["name"]
                }
                ]
        });
        return formatVideoGameInfo(videogame, false);
    }
};


module.exports= {
    createVideogame,
    getAllVideogames,
    getAllVideogamesById

}