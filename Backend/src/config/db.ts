import { Sequelize } from 'sequelize-typescript'
import dotenv from 'dotenv'
import User from '../models/User'
import Expense from '../models/Expense';
import Budget from '../models/Budget';

dotenv.config()

export const db = new Sequelize( process.env.DATABASE_URL , {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    },
  },
  logging: false,
  models: [User, Budget, Expense],
})