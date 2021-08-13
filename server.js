import app from './app/index.js'
import dotenv from 'dotenv'

dotenv.config();

app.listen(process.env.PORT || 3000)
console.log('Server running at', process.env.PORT || 3000)
  