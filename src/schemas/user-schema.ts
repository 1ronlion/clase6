import { z } from "zod";

const userSchema = 

z.object({

    name: z.string({
        required_error: "User is required",
        invalid_type_error: "Username must be a string"
    }),
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string"
    }).email({
        message: "Choose a valid email format" 
    }),
    password: z.string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string"
    }).min(6, { 
        message: "Password must be 6 or more characters long" 
    })

})

const validateUser = (data: any) => userSchema.safeParse(data)
const validatePartialUser = (data: any) => userSchema.partial().safeParse(data)

export { validateUser, validatePartialUser }


