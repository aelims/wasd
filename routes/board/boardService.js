const sequelize = require("../../models").sequelize;
var moment = require("moment");
const {
  Board,
  Likes,
  Sequelize: { Op },
} = require("../../models");

sequelize.query("SET NAMES UTF8");
//Todo social connet login Api will create

//not null은 무조건 있어야함 (아래) promise안에
module.exports = {
  makeBoard: (body) => {
    return new Promise((resolve) => {
      Board.create({
        board_title: body.board_title,
        board_content: body.board_content,
        board_date: moment().format("YYYY-MM-DD HH:mm:SS"),
        board_type: body.board_type,
        board_hits: 0,
        board_state: "생성",
        board_img: body.board_img,
        board_detail: body.board_detail,
        user_id: body.user_id,
        // likes_count: 0
      })
        .then((result) => {
          console.log(result)
          result !== null ? resolve(result) : resolve(flase);
        })
        .catch((err) => {
          resolve();
          throw err;
        });
    });
  },

  inquiryBoard: (boardType, offset) => {
    return new Promise((resolve) => {
      Board.findAll(
        {
          // include: [
          //   {
          //     model: Likes,
          //     attributes: [
          //       [sequelize.fn('COUNT', 'likes_id'), 'likesCount'],
          //     ]
          //   },
          //   {
          //     model: Comment,
          //     attributes: [
          //       [sequelize.fn('COUNT', 'comment_id'), 'commentCount'],
          //     ]
          //   }

          // ],
          where: {
            board_type: boardType,
          },

          attributes: { exclude: ["board_content", "board_file"] },

          offset: offset,
          limit: 5
        }
      ).then((result) => {
        console.log(result);
        result !== null ? resolve(result) : resolve(false);
      });
    });
  },

  remakeBoard: (body) => {
    return new Promise((resolve) => {
      Board.update({
        board_title: body.board_title,
        board_content: body.board_content,
        board_date: moment().format("YYYY-MM-DD hh:mm:ss"),
        board_type: body.board_type,
        board_hits: body.board_hits,
        board_state: "수정",
        board_img: body.board_img,
        board_detail: body.board_detail,
        user_id: body.user_id,
        // likes_count: body.likes_count
      }, 
      {
        where: {
          board_id: body.board_id,
        },
      })
        .then((result) => {
          result !== null ? resolve(result) : resolve(false);
          console.log(body);
        })
        .catch((err) => {
          resolve(false);
          throw err;
        });
    })


  },


  deleteBoard: (boardId) => {
    return new Promise((resolve) => {
      Board.destroy({
        where: {
          board_id: boardId
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


  inquiryBulletin: (boardId) => {
    return new Promise((resolve) => {
      Board.findOne({
          include: [
            {
              model: Likes,
              attributes: [
                [sequelize.fn('COUNT', 'likes_id'), 'likesCount'],
              ]
            },
            {
              model: Comment
            }

          ],
        where: {
          board_id: boardId
        }
      })
        .then((result) => {
          Board.increment({
            board_hits: 1,
          },
            {
              where: {
                board_id: boardId,
              },
            }

          ).then(() => {
            result !== null ? resolve(result) : resolve(flase);
          });
        });
    });
  },

    search: (searchWord, offset) => {
      return new Promise((resolve) => {
        Board.findAll({
          attributes: { exclude: ["board_content", "board_file"] },
          where: {
            [Op.or]: [
              {
                board_title: {
                  [Op.like]: "%" + searchWord + "%"
                }
              },
              {
                user_nickname: {
                  [Op.like]: "%" + searchWord + "%"
                }
              }
            ]
          },
          offset: offset,
          limit: 5
        }).then((result) => {
          console.log(result);
          result !== null ? resolve(result) : resolve(false);
        });
      })
    }

}