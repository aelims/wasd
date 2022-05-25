const boardService = require('./boardService');
// const signRefreshToken = require('../../jwt/signToken').signRefreshToken;
// const signAccessToken = require('../../jwt/signToken').signAccessToken;

// const hashing = require(path.join(__dirname, '../../config', 'hashing.js'));
// const salt = require(path.join(__dirname, '../../config', 'config.json')).salt;
// const jwt = require('../../config/modules/jwt');
// const { query } = require('express');

module.exports = {

    makeBoard: (req, res) => {           //req가 프론트에서 나한테 주고 res로 내가 프론트한테 준다
        const body = req.body;

        boardService.makeBoard(body)
            .then(result => {
                let obj = {};
                if (result) {
                    obj['suc'] = true;
                    obj['board'] = result;
                    res.send(obj);
                } else {
                    obj['suc'] = false;
                    obj['err'] = "makeBoard err";
                }
            })
    },

    remakeBoard: (req, res) => {
        const body = req.body;

        boardService.remakeBoard(body)
            .then(result => {
                let obj = {};
                if (result) {
                    obj['suc'] = true;
                    res.send(obj);
                } else {
                    obj['suc'] = false;
                    obj['err'] = "remakeBoard err";
                }
            })
    },

    deleteBoard: (req, res) => {
        const boardId = req.params.board_id;

        boardService.deleteBoard(boardId)
            .then(result => {
                let obj = {};
                if (result) {
                    obj['suc'] = true;
                    res.send(obj);
                } else {
                    obj['suc'] = false;
                    obj['err'] = "deleteBoard err";
                }
            })
    },     

    inquiryBoard: (req, res) => {
        const boardType = req.params.board_type;
        const page = req.params.page;
        let offset = 0;
        
        if(page > 0){
            offset = 5 * (page -1);
          }

        boardService.inquiryBoard(boardType, offset)
            .then(result => {
                let obj = {};
                if (result) {
                    obj['suc'] = true;
                    obj['board'] = {
                        'result': result
                    }
                     res.send(obj);
                } else {
                    obj['suc'] = false;
                    obj['err'] = "inquiryBoard err";
                }
            })
    },

    inquiryBulletin: (req, res) => {
        const boardId = req.params.board_id;

        boardService.inquiryBulletin(boardId)
            .then(result => {
                let obj = {};
                if (result) {
                    obj['suc'] = true;
                    obj['board'] = {
                        'result' : result,
                    };
                    res.send(obj);
                } else {
                    obj['suc'] = false;
                    obj['err'] = "inquiryBulletin err";
                }
            })
    },

    search: (req, res) => {
        const searchWord = req.params.search;
        let pageNum = req.query.page; // 요청 페이지 넘버
        let offset = 0;
        
        if(pageNum > 1){
          offset = 5 * (pageNum - 1);
        }

        boardService.search(searchWord, offset)
        .then(result => {
            let obj = {};
            if (result) {
                obj['suc'] = true;
                obj['board'] = {
                    'result' : result
                }
                res.send(obj);
            } else {
                obj['suc'] = false;
                obj['err'] = "search err";
            }
        })
    }

}