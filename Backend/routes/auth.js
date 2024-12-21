const express = require("express")
const router = express.Router()
const { body, validationResult } = require("express-validator")


const {signUp, fetchAllUsers, login} = require("../controllers/auth")

router.post("/signup",[
    body('username', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
  ], signUp
)
router.post("/login",[
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
  ], login
)

router.get("/fetchallusers", fetchAllUsers)

module.exports = router 