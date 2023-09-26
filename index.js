import express from 'express'
import dotenv from 'dotenv'
import {dbConnect} from "./config/dbConnect.js"
import router from './routes/index.js'
import bodyParser from "body-parser"
import cors from 'cors'
import compression from 'compression'
import hpp from 'hpp'
import morgan from 'morgan'
import helmet from 'helmet'
import { ErrorMiddleware } from './middlewares/error.middleware.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(morgan('dev'))
app.use(cors())
app.options('*', cors)
app.use(hpp())
app.use(helmet())
app.use(compression())
app.use(express.urlencoded({ limit: '10mb', extended: true }))
app.use(bodyParser.json({ limit: '10mb' }))

app.use('/api', router)

app.use(ErrorMiddleware)

async function start() {
    try {
      await dbConnect()
        .then(() => {
          console.log('Database has been connected!')
          app.listen(PORT, () => {
            console.log(`Server has been started on port ${PORT}!`)
          })
        })
        .catch((err) => {
          console.log(err)
        })
    } catch (error) {
      console.log('Server Error:', error.message)
      process.exit(1)
    }
}

start()
