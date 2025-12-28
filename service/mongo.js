import mongoose from "mongoose"

export const dbConnect = async () => {
    try {
      const conn = await mongoose.connect("mongodb+srv://mehedi2000:mehedi2002@exploredb.qjnhrwi.mongodb.net/educonnect?retryWrites=true&w=majority&appName=exploredb")
       
      return conn
    } catch (error) {
  
      process.exit(1)
    }
  }