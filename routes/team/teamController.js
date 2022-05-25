const teamService = require('./teamService');

module.exports = {
    useteam: (req, res) => {
       const userId = req.params.user_id;
       const eggId =req.params.egg_id;
    
        teamService.useteam(userId, eggId).then(result => {
            res.send(result);
        })
    },
    getteam:(req,res)=>{
        const userId = req.params.user_id;
        teamService.getteam(userId).then(result=>{
            res.send(result);
        })

    }
}
