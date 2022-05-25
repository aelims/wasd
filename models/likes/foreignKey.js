module.exports = db => {


  db.Likes.belongsTo(db.User, {
    foreignKey: 'user_id'
  });

  db.Likes.belongsTo(db.Board, {
    foreignKey: 'board_id'
  });

}