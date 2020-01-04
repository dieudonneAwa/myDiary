module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'Diaries',
    'description',
    {
      type: Sequelize.STRING,
      allowNull: false,
    },
  ),

  down: (queryInterface) => queryInterface.removeColumn(
    'Diaries',
    'description',
  ),
};
