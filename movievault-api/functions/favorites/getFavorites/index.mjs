import middy from '@middy/core';
import { authenticateUser } from '../../../middlewares/authenticate.mjs';
import { authorizeRole } from '../../../middlewares/authorize.mjs';
import { errorHandler } from '../../../middlewares/errorHandler.mjs'; 
import { sendResponse } from "../../../responses/index.mjs";
import { favorites } from '../../../data/favorites.mjs';
import { movies } from '../../../data/movies.mjs';

export const handler = middy(async (event) => {
  const userFavorites = favorites.filter(f => f.username === event.user.username);
  const favoriteMovies = userFavorites.map(f => {
    return movies.find(m => m.id === f.movieId)
  });

  return sendResponse(200, {
    success : true,
    favorites : favoriteMovies
  });
}).use(authenticateUser())
  .use(authorizeRole('user'))
  .use(errorHandler());
