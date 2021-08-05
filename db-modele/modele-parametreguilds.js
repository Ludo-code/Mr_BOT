const { Sequelize, DataTypes, Model } = require("sequelize");

module.exports = class parametreguilds extends Model {
  static init(sequelize) {
    return super.init(
      {
        guildid: {
          type: DataTypes.CHAR,
          primaryKey: true,
        },
        nsfw: {
          type: DataTypes.CHAR,
          primaryKey: true,
          defaultValue: "inactif",
        },
      },
      {
        tableName: "parametreguilds",
        timestamps: true,
        sequelize,
      }
    );
  }
};
