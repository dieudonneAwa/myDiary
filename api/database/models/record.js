module.exports = (sequelize, DataTypes) => {
  const Record = sequelize.define('Record', {
    title: DataTypes.STRING,
    text: DataTypes.STRING,
    location: DataTypes.STRING,
    diaryId: DataTypes.INTEGER,
  }, {});
  Record.associate = (models) => {
    // associations can be defined here
    Record.belongsTo(models.Diary, {
      as: 'diary',
      foreignKey: 'diaryId',
    });
  };
  return Record;
};
