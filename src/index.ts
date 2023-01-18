import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import authUserRoute from './routes/authRoutes'
import usersRoutes from './routes/usersRoutes'
import postsRoutes from './routes/postsRoutes'


dotenv.config()
const app = express()

app.use(cors())
app.use(helmet())
app.use(express.json())

app.use('/api', authUserRoute)
app.use('/api', usersRoutes)
app.use('/api', postsRoutes)

if (!process.env.PORT) {
    process.exit(1)
}
const PORT = process.env.PORT

const start = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`🚀 Server listening on port ${PORT}...`)
        })
    } catch (err: any) {
        console.log(err)
    }
}

start()

