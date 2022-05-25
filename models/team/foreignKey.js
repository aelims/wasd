module.exports = db => {
    db.Team.belongsTo(db.User, {
        foreignKey: 'user_id'
      });

      db.Team.belongsTo(db.Board, {
        foreignKey: 'board_id'
      });
    
}
