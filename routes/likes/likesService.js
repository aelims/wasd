const sequelize = require("../../models").sequelize;
const {
    Board,
    Likes,
    Sequelize: { Op },
} = require("../../models");
// const user = require("../../models/user");
// const board = require("../../models/board");
sequelize.query("SET NAMES UTF8");


module.exports = {
    likes: (body) => {
        return new Promise((resolve) => {
            Likes.findOrCreate({
                where:
                {
                    likes_id: body.likes_id
                },
                defaults: {
                    board_id: body.board_id,
                    user_id: body.user_id,
                    likes_count: 0
                }
            })
                .then((result) => {
                    console.log(result);
                    result !== null ? resolve(result) : resolve(false);

                })
                .catch((err) => {
                    resolve(false);
                    throw err
                })
        });
    },

    // increaseLikes: (body) => {
    //     Likes.increment({
    //         likes_count: 1
    //     },
    //         {
    //             where: {
    //                 board_id: body.board_id
    //             }
    //         }
    //     )
    //     .then((result) => {
    //         console.log(result);
    //         result !== null ? resolve(result) : resolve(false);

    //     })
    //     .catch((err) => {
    //         resolve(false);
    //         throw err
    //     })
    // },

    // decreaseLikes: (body) => {
    //     Likes.decrement({
    //         likes_count: 1
    //     },
    //         {
    //             where: {
    //                 board_id: body.board_id
    //             }
    //         }
    //     )
    //     .then((result) => {
    //         console.log(result);
    //         result !== null ? resolve(result) : resolve(false);

    //     })
    //     .catch((err) => {
    //         resolve(false);
    //         throw err
    //     })
    // }
}