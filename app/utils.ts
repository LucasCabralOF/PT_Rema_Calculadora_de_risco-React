import { z } from "zod";

 export const userDataSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.email(),
    age: z.number().min(0),
    preferences: z.object({
        theme: z.enum(["light", "dark"]),
        notifications: z.boolean(),
    }).optional(),
 })

 export type UserData = z.infer<typeof userDataSchema>;

 export function validateUserData(data: unknown): UserData {
    return userDataSchema.parse(data);
 }