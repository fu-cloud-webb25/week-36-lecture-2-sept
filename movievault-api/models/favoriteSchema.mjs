import { z } from 'zod';

export const favoriteSchema = z.object({
    movieId : z.string('movieId must be a string and cannot be empty').min(1, 'movieId must be a string and cannot be empty')
});
