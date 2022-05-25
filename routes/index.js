const express = require('express');
const router = express.Router();

const userRoute = require('./user/userRoute');
const commentRoute = require('./comment/commentRoute');
const boardRoute = require('./board/boardRoute');
const likesRoute = require('./likes/likesRoute');
// const contestRoute = require('./contest/contestRoute');
// const teamRoute = require('./team/teamRoute');
// const memberRoute = require('./member/memberRoute');


router.use('/user', userRoute);
router.use('/board', boardRoute);
router.use('/comment', commentRoute);
router.use('/likes', likesRoute);
// router.use('/contest', contestRoute);
// router.use('/team', teamRoute);
// router.use('/member', memberRoute);


module.exports = router;