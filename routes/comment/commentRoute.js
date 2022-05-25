const express = require('express');
const router = express.Router();
const commentController = require('./commentController');
// const authUtil = require('../../middlewares/auth').verifyToken;

//댓글 쓰기
router.post('/makeComment'/*, authUtil*/, commentController.makeComment);
//댓글 삭제
router.get('/deleteComment'/*, authUtil*/, commentController.deleteComment);
//댓글 수정
router.post('/remakeComment'/*, authUtil*/, commentController.remakeComment);

module.exports = router;
