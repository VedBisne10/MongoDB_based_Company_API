// Import express to create routes
const express = require("express");

// Import all the controller functions that handle the actual logic
const {
    createCompany,      // Function to add a new company
    getCompanies,       // Function to get all companies
    getCompanyById,     // Function to get one specific company
    updateCompany,      // Function to update company details
    deleteCompany       // Function to delete a company
} = require("../controllers/companyController");

// Create a router object to define our API routes
const router = express.Router();

// Route to CREATE a new company
router.post("/", createCompany);

// Route to GET all companies
router.get("/", getCompanies);

// Route to GET a single company by its ID
router.get("/:id", getCompanyById);

// Route to UPDATE a company by its ID
router.put("/:id", updateCompany);

// Route to DELETE a company by its ID
router.delete("/:id", deleteCompany);

// Export the router so it can be used in server.js
module.exports = router;

