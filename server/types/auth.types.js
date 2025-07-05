const z = require('zod')
const signupPayloadCheck = z.object({
    username : z.string().email(),
    password: z.string().min(6).max(16),
    firstName: z.string(),
    lastName: z.string(),
})

const signupinPayloadCheck = z.object({
    username : z.string().email(),
    password: z.string().min(6).max(16)
})

module.exports = { signupPayloadCheck, signupinPayloadCheck }