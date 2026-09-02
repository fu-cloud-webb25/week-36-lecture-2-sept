import { z } from 'zod';

export const movieSchema = z.object({
    title : z.string('Title must be a string!!').min(1, 'Title is required!!'),

    director : z.string('Director must be a string!!').min(1, 'Director is required!!'),

    year: z
        .number('Year must be a number!!')
        .int('Year must be an integer!!')
        .min(1888, 'Year must be greater than or equal to 1888!!')
        .max(new Date().getFullYear() + 5, 'Invalid release year'),

    genre : z.string('Genre must be a string!!').min(1, 'Genre is required!!'),
});