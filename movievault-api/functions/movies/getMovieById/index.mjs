import { sendResponse } from "../../../responses/index.mjs";
import { movies } from '../../../data/movies.mjs';

export const handler = async (event) => {
  const { id } = event.pathParameters;
  const movie = movies.find(m => m.id === id);
  if(movie) {
    return sendResponse(200, {
      success : true,
      movie
    });
  } else {
    return sendResponse(404, {
      success : false,
      message : 'No movie with corresponding id found'
    });
  }
};
