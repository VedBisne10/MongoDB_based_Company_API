// mongoose  - used to validate MongoDB IDs
// Company   - the model that talks to the "companies" collection in MongoDB
const mongoose = require("mongoose");
const Company = require("../models/companyModel");


// ─────────────────────────────────────────────
// CREATE  →  POST /api/companies
// Adds a brand new company to the database
// ─────────────────────────────────────────────
const createCompany = async (req, res, next) => {
    try {
        // req.body contains the JSON data sent by the user (companyName, city, etc.)
        // Company.create() validates the data against the schema and saves it
        const company = await Company.create(req.body);

        // 201 = "Created" — everything went well and a new record was made
        res.status(201).json({
            success: true,
            message: "Company created successfully",
            company: company        // Send back the newly saved company
        });

    } catch (error) {
        // Pass any error (e.g. missing required field) to the error-handler middleware
        next(error);
    }
};


// ─────────────────────────────────────────────
// GET ALL  →  GET /api/companies
// Returns all companies, with optional filters
// Supports: ?name=  ?city=  ?category=
// ─────────────────────────────────────────────
const getCompanies = async (req, res, next) => {
    try {
        // Pull optional search parameters from the URL query string
        // Example URL: /api/companies?city=Mumbai&category=IT
        const { name, city, category } = req.query;

        // filter starts empty — if no query params are given, all companies are returned
        const filter = {};

        // If the user passed ?name=..., add a case-insensitive partial match for companyName
        // $regex lets us do a "contains" search  |  $options:"i" makes it case-insensitive
        if (name) {
            filter.companyName = { $regex: name, $options: "i" };
        }

        // If the user passed ?city=..., add a case-insensitive partial match for city
        if (city) {
            filter.city = { $regex: city, $options: "i" };
        }

        // If the user passed ?category=..., add a case-insensitive partial match for category
        if (category) {
            filter.category = { $regex: category, $options: "i" };
        }

        // Find companies that match the filter
        // .sort({ createdAt: -1 }) returns newest companies first (-1 = descending order)
        const companies = await Company.find(filter).sort({ createdAt: -1 });

        // 200 = "OK" — request was successful
        res.status(200).json({
            success: true,
            count: companies.length,    // How many companies were found
            companies: companies        // The actual list of companies
        });

    } catch (error) {
        next(error);
    }
};


// ─────────────────────────────────────────────
// GET ONE  →  GET /api/companies/:id
// Returns a single company that matches the ID
// ─────────────────────────────────────────────
const getCompanyById = async (req, res, next) => {
    try {
        // req.params.id is the ID taken from the URL  (e.g. /api/companies/abc123)
        // MongoDB ObjectIds have a specific 24-character hex format
        // isValid() checks that before hitting the database — avoids unnecessary DB calls
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid company ID"   // 400 = bad request from the user
            });
        }

        // Search the database for a company with this exact ID
        const company = await Company.findById(req.params.id);

        // findById() returns null if nothing matches — let the user know
        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found"    // 404 = resource does not exist
            });
        }

        // Company found — send it back
        res.status(200).json({
            success: true,
            company: company
        });

    } catch (error) {
        next(error);
    }
};


// ─────────────────────────────────────────────
// UPDATE  →  PUT /api/companies/:id
// Updates the details of an existing company
// ─────────────────────────────────────────────
const updateCompany = async (req, res, next) => {
    try {
        // Validate that the ID in the URL is a proper MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid company ID"
            });
        }

        // If the request body is completely empty there is nothing to update
        // Object.keys(req.body).length === 0  means no fields were sent
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please provide data to update"
            });
        }

        // findByIdAndUpdate() finds the document, applies the changes, and saves it
        // new: true       → return the UPDATED version (not the old one)
        // runValidators   → re-check the schema rules on the new values
        const company = await Company.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        // If no document was found with that ID, it doesn't exist
        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found"
            });
        }

        // Send back the updated company data so the user can confirm the changes
        res.status(200).json({
            success: true,
            message: "Company updated successfully",
            company: company
        });

    } catch (error) {
        next(error);
    }
};


// ─────────────────────────────────────────────
// DELETE  →  DELETE /api/companies/:id
// Permanently removes a company from the database
// ─────────────────────────────────────────────
const deleteCompany = async (req, res, next) => {
    try {
        // Validate the ID before touching the database
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid company ID"
            });
        }

        // findByIdAndDelete() finds the document, deletes it, and returns what was deleted
        const company = await Company.findByIdAndDelete(req.params.id);

        // If null is returned, no company existed with that ID
        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found"
            });
        }

        // Send back the deleted company's data as confirmation of what was removed
        res.status(200).json({
            success: true,
            message: "Company deleted successfully",
            company: company
        });

    } catch (error) {
        next(error);
    }
};


// Export all five functions so they can be used in the routes file
module.exports = {
    createCompany,
    getCompanies,
    getCompanyById,
    updateCompany,
    deleteCompany
};
