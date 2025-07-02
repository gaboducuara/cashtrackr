import express, { Application } from 'express'
import morgan from 'morgan'
import { db } from './config/db'
import budgetRouter from './routes/budgetRouter'
import authRouter from './routes/authRouter'

export async function connectDB() {
  try {
    await db.authenticate()
    db.sync()
  } catch (error) {
    process.exit(1)
  }
}

connectDB()

const app: Application = express()

app.set('trust proxy', true);

app.use(morgan('dev'))

app.use(express.json())

app.use('/api/budget', budgetRouter)
app.use('/api/auth', authRouter)

app.use('/', (req, res) => {
  res.send('cashtrackr')
})

export default app