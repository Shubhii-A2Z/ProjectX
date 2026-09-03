import {z} from 'zod';

// This is sample ZodSchema
export const createBookingSchema=z.object({
    userId: z.number({error: "UserId is mendatory"}),
    hotelId: z.number({error: "BookingId is mendatory"}),
    bookingAmount: z.number({error: "Booking Amount is mendatory"}).min(1,{error: "Booking amount should be greater than 1"}),
});

// Validate this schema using zodValidate middleware via:- validateRequestBody(createBookingSchema)

export const createUserSchema=z.object({
    username: z.string({error: "Username is required"}).min(3, {message: "Username should be at least 3 characters long"}).max(255, {message: "Username should be at most 255 characters long"}),
    email: z.email({message: "Invalid email format"}),
    password: z.string({error: "Password is required"}).min(6, {message: "Password should be at least 6 characters long"}).max(255, {message: "Password should be at most 255 characters long"})
});

export const signinUserSchema=z.object({
    email: z.email({message: "Invalid email format"}),
    password: z.string({error: "Password is required"}).min(6, {message: "Password should be at least 6 characters long"}).max(255, {message: "Password should be at most 255 characters long"})
});

export const createWorkspaceSchema=z.object({
    name: z.string().min(1, {message: "Workspace name is required"}).max(255, {message: "Workspace name should be at most 255 characters long"}),
    description: z.string().max(500, {message: "Workspace description should be at most 500 characters long"}).optional()
})