// Import mongoose library to connect with MongoDB database
const mongoose = require("mongoose");

/**
 * Function to establish connection with MongoDB database
 * This runs when the server starts and connects to the database
 */
const connectDB = async () => {
    try {
        // Try to connect to MongoDB using the connection string from .env file
        await mongoose.connect(process.env.MONGO_URI);
        
        // If connection is successful, print success message
        console.log("MongoDB connected successfully");
    }
    catch(error){
        // If connection fails, print the error message
        console.error("MongoDB connection failes: ", error.message);

        // Exit the application with error code 1 (means something went wrong)
        process.exit(1);
    }
};

// Export the function so it can be used in other files (like server.js)
module.exports= connectDB;

