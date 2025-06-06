import express, { Application } from 'express'
import colors from 'colors'
import morgan from 'morgan'
import { db } from './config/db'
import budgetRouter from './routes/budgetRouter'
import authRouter from './routes/authRouter'

export async function connectDB() {
  try {
    await db.authenticate()
    db.sync()
    // console.log(colors.blue.bold('Conexion exitosa a la base de datos'))
  } catch (error) {
    // console.error(colors.red.bold('Fallo la Conexion a la base de datos'), error)
    process.exit(1)
  }
}

connectDB()

const app: Application = express()

app.use(morgan('dev'))

app.use(express.json())

app.use('/api/budget', budgetRouter)
app.use('/api/auth', authRouter)

console.log(process.env.NODE_ENV)
app.use('/', (req, res) => {
  res.send('Todo Bien...')
})

export default app