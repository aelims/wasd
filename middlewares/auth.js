// const { config } = require('nodemon');
const jwt = require('../config/modules/jwt');

exports.verifyToken = (req, res, next) => {
    try {
        const isToken = jwt.verify(req.headers.token);
        const userId = req.body.user_id;
        console.log(isToken); // decoded - 사용자 정보
        if (isToken.id == userId) {
            return next();
        }
    } catch (err) {
        console.log("vertify token err");
    }
}