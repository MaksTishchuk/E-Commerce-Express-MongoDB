import express from 'express'
import dotenv from 'dotenv'
import {dbConnect} from "./config/dbConnect.js"
import router from './routes/index.js'
import bodyParser from "body-parser"
import cors from 'cors'
import { ErrorMiddleware } from './middlewares/error.middleware.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.options('*', cors)

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
