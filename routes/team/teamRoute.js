const express = require('express');
const router = express.Router();
const teamController = require('./teamController');

//팀 모집하기
router.get('/teamRecruitment/:', teamController.teamRecruitment);
//팀 모집 보기
router.post('/teamRecruitmentView', teamController.teamRecruitmentView);
//팀 모집 수정
router.post('/teamRecruitmentRemake', teamController.teamRecruitmentRemake);
//팀 모집 삭제
router.post('/teamDeleteRecruitmentRemake', teamController.teamDeleteRecruitmentRemake);

module.exports = router;