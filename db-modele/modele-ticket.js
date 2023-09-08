const { Sequelize, DataTypes, Model } = require("sequelize");

module.exports = class ticket extends Model {
  static init(sequelize) {
    return super.init(
      {
        guildid: {
          type: DataTypes.CHAR,
          primaryKey: true,
        },
        utilisateurid: {
          type: DataTypes.CHAR,
          primaryKey: true,
        },
        messageid: {
          type: DataTypes.CHAR,
        },
      },
      {
        tableName: "ticketsystem",
        timestamps: true,
        sequelize,
      }
    );
  }
};
