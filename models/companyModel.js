// Import mongoose library to work with MongoDB database
const mongoose = require("mongoose");

// Define the structure (blueprint) for how company data should look in the database
const companySchema = new mongoose.Schema({
    // Company name field - must be provided, spaces at start/end are removed
    companyName: {
        type: String,
        required: true,  // This field is mandatory
        trim: true       // Removes extra spaces before and after the text
    },
    // Category field - tells what type of business this is (e.g., IT, Retail, etc.)
    category: {
        type: String,
        required: true,  // This field is mandatory
        trim: true       // Removes extra spaces before and after the text
    },
    // City field - location of the company
    city: {
        type: String,
        required: true,  // This field is mandatory
        trim: true       // Removes extra spaces before and after the text
    },
    // Name of the person to contact at the company (optional field)
    contactPerson: {
        type: String,
        trim: true       // Removes extra spaces before and after the text
    },
    // Phone number of the company (optional field)
    phone: {
        type: String,
        trim: true       // Removes extra spaces before and after the text
    },
    // Email address - checks if it's in proper email format (e.g., name@domain.com)
    email: {
        type: String,
        trim: true,      // Removes extra spaces before and after the text
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/  // Pattern to validate email format
    },
    // Company website URL (optional field)
    website: {
        type: String,
        trim: true       // Removes extra spaces before and after the text
    }
});

// Create and export the Company model so it can be used in other files
// This turns our schema into a model we can use to interact with the database
module.exports = mongoose.model("Company", companySchema);