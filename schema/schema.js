import { DataTypes, Sequelize } from "sequelize";
import 'dotenv/config';

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    logging: () => {}
});

try {
    await sequelize.authenticate();
    console.log('Connection à la bdd réussi !');
} catch (error) {
    console.log('Connection à la base de donné en échec');
}

const Guild = sequelize.define('Guild', {
    guildId: DataTypes.STRING,
    ticketCategoryChannelID: DataTypes.STRING,
    nsfwEnabled: DataTypes.BOOLEAN,
});

const Ticket = sequelize.define('Ticket', {
    userId: DataTypes.STRING,
    channelId: DataTypes.STRING,
    guildId: DataTypes.STRING,
});

await sequelize.sync();

export { Guild, Ticket };