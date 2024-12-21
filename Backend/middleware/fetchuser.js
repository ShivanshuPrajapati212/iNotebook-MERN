var jwt = require('jsonwebtoken');
const JWT_SECRET = '$2a$10$3ak50/nvoDamWCLiDRfmGO5hQG0R0VhPeLAGbmVlCfuort.fHM1P2';

const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const token = req.header('authtoken');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }

}


module.exports = fetchuser;