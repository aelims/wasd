const express = require('express');
const router = express.Router();
const boardController = require('./boardController');
// const authUtil = require('../../middlewares/auth').verifyToken;


//게시판 글쓰기
router.post('/makeBoard'/*, authUtil*/, boardController.makeBoard);
//게시판 수정
router.post('/remakeBoard', /*, authUtil*/ boardController.remakeBoard);
//게시판 삭제
router.get('/deleteBoard/:board_id', /*, authUtil*/ boardController.deleteBoard);
//게시판 조회
router.get('/inquiryBoard/:board_type/:page', boardController.inquiryBoard);
//게시글 조회
router.get('/inquiryBulletin/:board_id', boardController.inquiryBulletin);
//검색
router.get('/search/:search/:page', boardController.search);

//좋아요 누르기
// router.post('/likes', authUtil, boardController.likes);

module.exports = router;


