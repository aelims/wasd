const sequelize = require("../../models").sequelize;
const {
  User,
  Likes, Board,
  Comment
} = require("../../models");
sequelize.query("SET NAMES UTF8");
//Todo social connet login Api will create
module.exports = {
  login: (body, hash) => {
    return new Promise((resolve) => {
      User.findOne({
        where: {
          user_id: body.user_id,
          user_password: hash,
        },
        attributes: ["user_id", "user_nickname", "user_image"],
        raw: true,
      })
        .then((result) => {
          console.log("Service Find User");
          console.log(result);
          result !== null ? resolve(result) : resolve(false);
        })
        .catch((err) => {
          resolve(false);
          throw err;
        });
    });
  },

  signUp: (body, hash) => {
    return new Promise((resolve) => {
      User.findOrCreate({
        where: { user_id: body.user_id },
        defaults: {
          user_id: body.user_id,
          user_password: hash,
          user_name: body.user_name,
          user_tel: body.user_tel,
          user_birth: body.user_birth,
          user_email: body.user_email,
          user_address: body.user_address,
          user_gender: body.user_gender,
          user_nickname: body.user_nickname,
          user_pw_question: body.user_pw_question,
          user_pw_answer: body.user_pw_answer,
          user_image: body.user_image
        },
        raw: true,
      })
        .then((result) => {
          console.log(result[0].user_id, result[0].user_password);
          if (result[1]) { // create-true
            resolve(result);
          } else {
            resolve(false);
          }

          console.log(result);
        })
        .catch((err) => {
          throw err;
        });
    });
  },
  deleteUser: (body, hash) => {
    return new Promise((resolve) => {
      User.destroy({
        where: {
          user_id: body.user_id,
          user_password: hash
        },
      })
        .then((result) => {
          console.log(result)
          result !== null ? resolve(result) : resolve(false);
        })
        .catch((err) => {
          resolve(false);
          throw err;
        });
    });
  },


  transPassword: (hash, body) => {
    return new Promise((resolve) => {
      User.update(
        { user_password: hash },
        {
          where: {
            user_id: body.user_id,
            user_pw_question: body.user_pw_question,
            user_pw_answer: body.user_pw_answer
          },
        }
      ).then((result) => {
        console.log(result);
        result !== null ? resolve(result) : resolve(false);
      }).catch((err) => {
        resolve(false);
        throw err;
      });
    });
  },

  transInfo: (body, hash) => {
    return new Promise((resolve) => {
      User.update(
        {
          user_id: body.user_id,
          user_email: body.user_email,
          user_tel: body.user_tel,
          user_nickname: body.user_nickname,
          user_image: body.user_image
        },
        {
          where: {
            user_id: body.user_id,
            user_password: hash
          },
        }
      ).then((result) => {
        result !== null ? resolve(result) : resolve(false);
      })
        .catch((err) => {
          resolve(false);
          throw err;
        });
    });
  },

  viewInfo: (body, hash) => {
    return new Promise((resolve) => {
      User.findOne({

        user_email: body.user_email,
        user_tel: body.user_tel,
        user_nickname: body.user_nickname,
        user_image: body.user_image

      }, {
        attributes: { exclude: ["user_password"] }

      },

        {
          where: {
            user_id: body.user_id,
            user_password: hash
          }

        })
        .then((result) => {
          console.log(result);
          result !== null ? resolve(result) : resolve(false);
        })
        .catch((err) => {
          resolve(false);
          throw err;
        });
    });
  },

  viewMyBoard: (userId, offset) => {
    return new Promise((resolve) => {
      Board.findAll({
        where: {
          user_id: userId
        },
        include: [
          {
            model: Likes,
            attributes: [
              [sequelize.fn('COUNT', 'likes_id'), 'likesCount'],
            ]
          },
          {
            model: Comment,
            attributes: [
              [sequelize.fn('COUNT', 'comment_id'), 'commentCount'],
            ]
          }
        ],
        attributes: { exclude: ["board_content", "board_file"] },
        offset: offset,
        limit: 5
      })
        .then((result) => {
          console.log(result);
          result !== null ? resolve(result) : resolve(false);
        })
        .catch((err) => {
          resolve(false);
          throw err;
        });
    });
  }
};
