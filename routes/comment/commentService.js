const sequelize = require("../../models").sequelize;
const moment = require("moment");
const {
  Comment,
  User,
  Board,
  Sequelize: { Op },
} = require("../../models");
sequelize.query("SET NAMES UTF8");
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");

module.exports = {
  makeComment: (body) => {
    return new Promise((resolve) => {
      Comment.create({
        comment_content: body.comment_content,
        comment_date: moment().format("YYYY-MM-DD hh:mm:ss"),
        user_id: body.user_id,
        board_id: body.board_id,
        comment_parents: body.comment_parents,
        comment_state: "생성"
      }
      ).then((result) => {
        result !== null ? resolve(result) : resolve(false);
      });
    });
  },


  remakeComment: (body) => {
    return new Promise((resolve) => {
      Comment.update({
        comment_content: body.comment_content,
        comment_date: moment().format("YYYY-MM-DD HH:mm:SS"),
        comment_state: "수정"
      },
        {
          where: {
            comment_id: body.comment_id
          }
        })
        .then((result) => {
          result !== null ? resolve(result) : resolve(false);
        });
    });
  },

  // remakeReply: (body) => {
  //   return new Promise((resolve) => {
  //     const date = moment().format("YYYY-MM-DD HH:mm:SS");
  //     Comment.update({
  //       comment_content: body.comment_content,
  //       comment_date: date
  //     },
  //       {
  //         where: {
  //           comment_id: body.comment_id
  //         },
  //       })
  //       .then((result) => {
  //         result !== null ? resolve(result) : resolve(false);
  //       });
  //   });
  // },


  deleteComment: (body) => {
    return new Promise((resolve) => {
      Comment.destroy({
        where: {
          comment_id: body.comment_id,
        },
      })
        .then((result) => {
          result !== null ? resolve(result) : resolve(false);
        })
        .catch((err) => {
          resolve(false);
          throw err;
        });
    });
  }
};

//     if(!result.comment_seq){
//         comment.update({
//     comment_seq:result.comment_id,
//   },{
//     where:{
//       comment_id:result.comment_id
//     }
//   }
//   ).then(()=>{
//     result !== null ? resolve(result) : resolve(false);

//   })
//     }else{
//       result !== null ? resolve("result") : resolve(false);

//     }

//   });

// });
// },
// getLast:(userId)=>{
//     return new Promise((resolve)=>{
//         Last.findAll({
//             where:{user_id:userId},
//             order: [['last_date', 'DESC']],
//             limit:5,
//             include: [
//                 {
//                   model: Egg,
//                   attribute: [
//                     "egg_id",
//                     "egg_div",
//                     "egg_name",
//                     "egg_env",
//                     "egg_size",
//                     "egg_price",
//                     "egg_quantity",
//                     "egg_farm",
//                     "egg_certified",
//                     "egg_detail",
//                     "egg_star",
//                     "egg_img_url",
//                   ],
//                 },
//               ],

//         }).then((result)=>{
//           result !== null ? resolve(result) :resolve(false)
//         })
//     })
//   },
// };

// makeComment: (body) => {
//   return new Promise((resolve) => {
//     const date = moment().format("YYYY-MM-DD HH:mm:ss");

//   comment.create({
//       comment_content: body.comment_content,
//       comment_date: date,
//       user_id: body.user_id,
//       board_id: body.board_id,
//       comment_parent:body.comment_content,
//       comment_depth:body.comment_parent_id+1,

//     }).then((result) => {

//       if(!result.comment_seq){
//           comment.update({
//       comment_seq:result.comment_id,
//     },{
//       where:{
//         comment_id:result.comment_id
//       }
//     }
//     ).then(()=>{
//       result !== null ? resolve(result) : resolve(false);

//     })
//       }else{
//         result !== null ? resolve("result") : resolve(false);

//       }

// });
