import mongoose from 'mongoose'
import InitialAdmin from './services/seed'
import { app } from './app'

const start = async () => {
  if(!process.env.JWT_KEY) throw new Error('JWT_KEY must be defined')
  if(!process.env.MONGO_URI) throw new Error('MONGO_URI must be defined')

  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Connect to mongo db')
    InitialAdmin()
    console.log('Admin Initialize Succeed')
  } catch (err) {
    console.error(err)
  }
  
  app.listen(3000, () => {
    console.log("Listening on port 3000")
  })
}

start()