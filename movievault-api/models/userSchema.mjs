import { z } from 'zod';

export const loginSchema = z.object({
    username : z.string('Username must be a string!!').min(1),
    password : z.string('Password must be a string!!').min(1),
});
