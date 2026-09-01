// Import mongoose to work with MongoDB IDs
const mongoose = require("mongoose");
// Import the Company model to interact with the companies collection in database
const Company = require("../models/companyModel");

// Function to CREATE a new company in the database
// This receives company details from the user and saves them
const createCompany = async (req, res) => {
    try {
        // Check if required fields (companyName, category, city) are provided
        // If any is missing, return error message
        if (!req.body.companyName || !req.body.category || !req.body.city) {
            return res.status(400).json({
            message: "Company name, category and city are required"
            });
        }

        // Create and save the new company in the database
        // req.body contains all the company information sent by the user
        const company = await Company.create(req.body);

        // Send success response with the newly created company data
        res.status(201).json({
            message: "Company created successfully",
            company: company
        });
    } 
    catch (error) {
        // If something goes wrong, send error message
        res.status(400).json({
            message: "Failed to create company",
            error: error.message
        });
    }
};

// Function to GET all companies from the database
// This retrieves and returns the complete list of all companies
const getCompanies = async (req, res) => {
    try {
        // Get all companies from the database (no filters applied)
        const companies = await Company.find();

        // Send success response with total count and list of all companies
        res.status(200).json({
            count: companies.length,    // Total number of companies found
            companies: companies         // Array of all company objects
        });
    } 
    catch (error) {
        // If something goes wrong, send error message
        res.status(500).json({
            message: "Failed to fetch companies",
            error: error.message
        });
    }
};

// Function to GET a single company by its ID
// This searches for and returns one specific company
const getCompanyById = async (req, res) => {
    try {
        // Check if the provided ID is in valid MongoDB ID format
        // MongoDB IDs have a specific format - if it doesn't match, return error
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid company ID"
            });
        }

        // Search for the company in database using the ID from URL
        const company = await Company.findById(req.params.id);

        // If no company found with that ID, return "not found" message
        if (!company) {
            return res.status(404).json({
                message: "Company not found"
            });
        }

        // If company is found, send it back in the response
        res.status(200).json({
            company: company
        });
    } 
    catch (error) {
        // If something goes wrong, send error message
        res.status(500).json({
            message: "Failed to fetch company",
            error: error.message
        });
    }
};

// Function to UPDATE an existing company's information
// This finds a company by ID and modifies its details
const updateCompany = async (req, res) => {
    try {
        // Check if the provided ID is in valid MongoDB ID format
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid company ID"
            });
        }

        // Find the company by ID and update it with new data from req.body
        const company = await Company.findByIdAndUpdate(
            req.params.id,           // Which company to update (ID from URL)
            req.body,                 // New data to update
            {
                new: true,            // Return the updated company (not the old one)
                runValidators: true   // Check that the new data is valid
            }
        );

        // If no company found with that ID, return "not found" message
        if (!company) {
            return res.status(404).json({
                message: "Company not found"
            });
        }

        // Send success response with the updated company data
        res.status(200).json({
            message: "Company updated successfully",
            company: company
        });
    } 
    catch (error) {
        // If something goes wrong, send error message
        res.status(400).json({
            message: "Failed to update company",
            error: error.message
        });
    }
};

// Function to DELETE a company from the database
// This permanently removes a company by its ID
const deleteCompany = async (req, res) => {
    try {
        // Check if the provided ID is in valid MongoDB ID format
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid company ID"
            });
        }

        // Find the company by ID and delete it from the database
        const company = await Company.findByIdandDelete(req.params.id);

        // If no company found with that ID, return "not found" message
        if (!company) {
            return res.status(404).json({
                message: "Company not found"
            });
        }

        // Send success response with the details of the deleted company
        res.status(200).json({
            message: "Company deleted successfully",
            company: company  // Shows which company was deleted
        });
    }
    catch (error) {
        // If something goes wrong, send error message
        res.status(400).json({
            message: "Failed to delete company",
            error: error.message
        });
    }
};

module.exports = {
    createCompany,
    getCompanies,
    getCompanyById,
    updateCompany,
    deleteCompany
};