import mongoose from 'mongoose';





const connection = {}
mongoose.Promise = global.Promise
async function dbConnect() {
  if(connection.isConnected) return

  const db = await mongoose.connect(process.env.MONGO_URI, {
  // const db = await mongoose.connect('mongodb://localhost/news', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  connection.isConnected = db.connections[0].readyState
}
export default dbConnect