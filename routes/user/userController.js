const userService = require('./userService');
const path = require('path');

const hashing = require(path.join(__dirname, '../../config', 'hashing.js'));
const salt = require(path.join(__dirname, '../../config', 'config.json')).salt;
const jwt = require('../../config/modules/jwt');

module.exports = {

    login: (req, res) => {
        const body = req.body;
        const hash = hashing.enc(body.user_password, salt);

        userService.login(body, hash)
            .then(result => {
                let obj = {};
                if (result) {
                    obj['token'] = jwt.sign(result);
                    obj['user'] = result;
                    obj['suc'] = true;
                    res.send(obj);
                    console.log("login suc");

                } else {
                    obj['suc'] = false;
                    console.log("login err");
                }
            })
    },

    signUp: (req, res) => {
        const body = req.body;
        const hash = hashing.enc(body.user_password, salt);

        userService.signUp(body, hash)
            .then(result => {
                let obj = {};
                if (result[1] == true) {
                    console.log("signUpOk");
                    obj['suc'] = true;
                    res.send(obj);

                } else {
                    obj['suc'] = false;
                    console.log("signUp err");
                }
            })
    },

    transPassword: (req, res) => {
        const body = req.body;
        const hash = hashing.enc(body.user_password, salt);

        userService.transPassword(hash, body)
        .then(result => {
            let obj = {};
            if (result == 1) {
                obj['suc'] = true;
                res.send(obj);

            } else {
                obj['suc'] = false;
                console.log("transPassword err");
            }
        })
    },

    transInfo: (req, res) => {
        const body = req.body;
        const hash = hashing.enc(body.user_password, salt);

        userService.transInfo(body, hash)
            .then(result => {
                let obj = {};
                if (result == 1) {
                    obj['suc'] = true;
                    res.send(obj);

                } else {
                    obj['suc'] = false;
                    console.log("transInfo err");
                }
            })
    },

    deleteUser: (req, res) => {
        const body = req.body;
        const hash = hashing.enc(body.user_password, salt);

        userService.deleteUser(body, hash)
            .then(result => {
                let obj = {};
                if (result = 1) {
                    obj['suc'] = true;
                    res.send(obj);
                } else {
                    obj['suc'] = false;
                    obj['err'] = "삭제 실패";
                }
            })
    },


    viewInfo: (req, res) => {
        const body = req.body;

        userService.viewInfo(body, hash)
            .then((result) => {
                let obj = {};

                obj['info'] = result;
                obj['suc'] = true;
            })
            .catch((err) => {
                obj['suc'] = false;
            })

            res.send(result);
    },

    viewMyBoard: (req, res) => {
        const userId = req.params.user_id;
        const page = req.params.page;
        let offset = 0;
        
        if(page > 1){
            offset = 5 * (page - 1);
          }

        userService.viewMyBoard(userId, offset)
        .then(result => {
            let obj = {};
            if (result) {
                obj['suc'] = true;
                obj['board'] = {
                    'result' : result
                }

            } else {
                obj['suc'] = false;
                obj['err'] = "inquiryBoard err";
            }
        })

        res.send(result);

    }
}
