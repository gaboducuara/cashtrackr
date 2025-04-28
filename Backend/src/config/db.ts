import { Sequelize } from 'sequelize-typescript'
import dotenv from 'dotenv'

dotenv.config()

export const db = new Sequelize( process.env.DATABASE_URL , {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: false,
    },
  },
  logging: false,
  models: [__dirname + './../models/**/*.ts'],
})