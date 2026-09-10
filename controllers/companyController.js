const mongoose = require("mongoose");
const Company = require("../models/companyModel");

// Add a new company
const createCompany = async (req, res, next) => {
    try {
        const company = await Company.create(req.body);

        res.status(201).json({
            success: true,
            message: "Company created successfully",
            company: company
        });
    } catch (error) {
        next(error);
    }
};


// Get all companies
const getCompanies = async (req, res, next) => {
    try {
        const companies = await Company.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: companies.length,
            companies: companies
        });
    } catch (error) {
        next(error);
    }
};


// Get one company by ID
const getCompanyById = async (req, res, next) => {
    try {

        // Check whether ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid company ID"
            });
        }

        const company = await Company.findById(req.params.id);

        // Company doesn't exist
        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found"
            });
        }

        res.status(200).json({
            success: true,
            company: company
        });

    } catch (error) {
        next(error);
    }
};


// Update a company by ID
const updateCompany = async (req, res, next) => {
    try {

        // Validate MongoDB ID
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid company ID"
            });
        }

        // Don't allow an empty update request
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please provide data to update"
            });
        }

        const company = await Company.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        // Company doesn't exist
        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Company updated successfully",
            company: company
        });

    } catch (error) {
        next(error);
    }
};


// Delete a company by ID
const deleteCompany = async (req, res, next) => {
    try {

        // Validate MongoDB ID
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid company ID"
            });
        }

        const company = await Company.findByIdAndDelete(req.params.id);

        // Company doesn't exist
        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Company deleted successfully",
            company: company
        });

    } catch (error) {
        next(error);
    }
};


module.exports = {
    createCompany,
    getCompanies,
    getCompanyById,
    updateCompany,
    deleteCompany
};