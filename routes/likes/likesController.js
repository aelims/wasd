const likesService = require('./likesService');

module.exports = {
    likes: (req, res) => {
        const body = req.body;
        
        likesService.likes(body)
            .then(result => {
                let obj = {};
                if (result[1] == true) {
                    obj['suc'] = true;
                    obj['likes'] = result;
                    res.send(obj);
                } else {
                    obj['suc'] = false;
                    obj['err'] = "likes err";
                }
            })
    }
}