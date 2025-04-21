const { z } = require('zod')

const signupTypecheck = z.object({
    username: z.string().email(),
    password: z.string().min(5).max(16),
    firstname: z.string(),
    lastname: z.string()
})

const signinTypecheck = z.object({
    username: z.string().email(),
    password: z.string().min(5).max(16)
})

const updateTypecheck = z.object({
    password: z.string().min(5).max(16),
    firstname: z.string(),
    lastname: z.string()
})


module.exports = {
    signupTypecheck,signinTypecheck, updateTypecheck
}