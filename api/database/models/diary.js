module.exports = (sequelize, DataTypes) => {
  const Diary = sequelize.define('Diary', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  }, {});
  Diary.associate = (models) => {
    // associations can be defined here
    Diary.hasMany(models.Record, {
      foreignKey: 'diaryId',
      as: 'records',
    });
    Diary.belongsTo(models.User, {
      as: 'user',
    });
  };
  return Diary;
};
