const sequelize = require("../../models").sequelize;
const moment = require("moment");
const {
    // Sequelize: { Op },
    Team,
} = require("../../models");

sequelize.query("SET NAMES UTF8");
require("moment-timezone");

moment.tz.setDefault("Asia/Seoul");

module.exports = {
    teamUp: (body) => {
        return new Promise((resolve) => {
            Team.create({
                team_name: body.team_name,
                team_maximum: body.team_maximum,
                team_limit_date: body.team_limit_date,
                //    team_chat
            })
                .then((result) => {
                    console.log(result)
                    result !== null ? resolve(result) : resolve(flase);
                })
                .catch((err) => {
                    resolve();
                    throw err;
                });
        })
    },

    teamRemake: (body) => {
        return new Promise((resolve) => {
            Team.update({
                team_name: body.team_name,
                team_maximum: body.team_maximum,
                team_limit_date: body.team_limit_date,
                //    team_chat
            }, 
            {
                where: { team_id: body.team_id }
            })
                .then((result) => {
                    console.log(result)
                    result !== null ? resolve(result) : resolve(flase);
                })
                .catch((err) => {
                    resolve();
                    throw err;
                });
        })
    },

    teamDelete: (teamId) => {
        return new Promise((resolve) => {
            Team.destroy({
                where: {
                    team_id: teamId
                }
            })
            .then((result) => {
                result !== null ? resolve(result) : resolve(false);
            })
            .catch((err) => {
                resolve(false);
                throw err;
            });
        })
    },

    // teamJoin: (userId, teamId) => {
    //     return new Promise((resolve) => {
    //         Team
    //     })
    // }
}