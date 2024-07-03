import {check} from 'express-validator'


export const LoginSchema=[
    check('username','username is required').exists().isAlphanumeric().withMessage('username should be alphanumeric only').trim()
    .isLength({min:6,max:32}),

    check('password','Password is required ').isLength({min:6,max:32}).trim(),

]