const asyncHandler = require('express-async-handler')
const {jwtDecode} = require('jwt-decode')

const protect = asyncHandler(async(req, res, next) => {

    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {

        try {
            token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwtDecode(token);
            const {email} = decodedToken
            req.email = email
            next()

        } catch (error) {
            res.status(401)
            throw new Error("Not Authorized, token failed")
        }

    }

    if(!token){
        res.status(401)
        throw new Error("Not Authorized, no token")
    }

})

module.exports = {protect};