const User = require("../Models/userModel");
const jwt = require('jsonwebtoken');
const {jwtDecode} = require('jwt-decode')
const asyncHandler = require('express-async-handler')

const authUser = asyncHandler(async (req, res) => {
    
    const { token } = req.body;

  try {
    const decodedToken = jwtDecode(token);
    
    const { name, email, picture } = decodedToken;

    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      // Create new user
      user = new User({ name, email, picture, token });
      await user.save();
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).send('Token verification failed');
  }
    
})



module.exports = {authUser}