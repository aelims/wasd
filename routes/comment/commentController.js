 const commentService = require('./commentService');

module.exports = {
    makeComment: (req, res) => {
        const body = req.body;

        commentService.makeComment(body)
            .then(result => {
                let obj = {};
                if (result) {
                    obj['suc'] = true;
                    obj['comment'] = result;
                    res.send(obj);
                } else {
                    obj['suc'] = false;
                    obj['err'] = "makeComment err";
                }
            })
    },

    deleteComment: (req, res) => {
        const body = req.body;
        commentService.deleteComment(body)
            .then(result => {
                let obj = {};
                if (result) {
                    obj['suc'] = true;
                    res.send(obj);
                } else {
                    obj['suc'] = false;
                    obj['err'] = "remakeComment err";
                }
            })
    },

    remakeComment: (req, res) => {
        const body = req.body;
        commentService.remakeComment(body)
            .then(result => {
                let obj = {};
                if (result) {
                    obj['suc'] = true;
                    res.send(obj);
                } else {
                    obj['suc'] = false;
                    obj['err'] = "deleteComment err";
                }
            })
    }

    // makeReply: (req, res) => {
    //     const body = req.body;
    //     commentService.makeReply(body).then(result => {
    //         res.send(result);
    //     })
    // },

    // remakeReply: (req, res) => {
    //     const body = req.body;
    //     commentService.remakeReply(body).then(result => {
    //         res.send(result);
    //     })
    // },

}