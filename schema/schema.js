import { DataTypes, Sequelize } from 'sequelize'
import 'dotenv/config'

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  logging: () => {}
})

try {
  await sequelize.authenticate()
  console.log('Connection à la bdd réussi !')
} catch {
  console.log('Connection à la base de donné en échec')
}

const Guild = sequelize.define('Guild', {
  guildId: {
    type: DataTypes.STRING
  },
  ticketCategoryChannelID: {
    type: DataTypes.STRING
  },
  nsfwEnabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  defaultLanguage: {
    type: DataTypes.STRING,
    defaultValue: 'FR'
  }
})

const Ticket = sequelize.define('Ticket', {
  userId: {
    type: DataTypes.STRING
  },
  channelId: {
    type: DataTypes.STRING
  },
  guildId: {
    type: DataTypes.STRING
  }
})

await sequelize.sync()

export { Guild, Ticket }
