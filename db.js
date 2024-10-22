
const mongoose=require('mongoose')
 const dotenv =require('dotenv')
 const cors=require('cors')

  dotenv.config()

let database;
   async function getDatabase(){
    
  await mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("DATA BASE CONNECTED")
    })
    .catch((err)=>{
     console.log(err)
    })

   }


//    module.exports={getDatabase}


// const mongoose = require('mongoose');
// const dotenv = require('dotenv');

// dotenv.config(); // Load environment variables from .env

// const getDatabase = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI, {
//       serverSelectionTimeoutMS: 10000, // Timeout after 10 seconds
//     });
//     console.log('MongoDB connected');
//   } catch (error) {
//     console.error('MongoDB connection error:', error);
//     process.exit(1); // Exit the process with an error code
//   }
// };

module.exports = { getDatabase };
