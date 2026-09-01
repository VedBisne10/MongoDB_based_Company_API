// Import required packages
const express = require("express");        // Framework to build web server and APIs
const dotenv = require("dotenv");          // Package to read environment variables from .env file

// Import our custom files
const connectDB = require("./config/db");              // Function to connect to MongoDB database
const companyRoutes = require("./routes/companyRoutes"); // All company-related API routes

// Load environment variables from .env file (like database URL, port number, etc.)
dotenv.config();

// Connect to MongoDB database when the server starts
connectDB();

// Create an Express application (this is our web server)
const app = express();

// Middleware to read and understand JSON data sent in API requests
app.use(express.json());

// Tell the app to use company routes for any URL starting with /api/companies
// Example: GET /api/companies will fetch all companies
app.use("/api/companies", companyRoutes);

// Set the port number - use PORT from .env file, or default to 3000
const PORT = process.env.PORT || 3000;

// Start the server and listen for incoming requests
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

