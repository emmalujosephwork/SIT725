const CompanyModel = require("../models/companyModel");

const CompanyController = {
    // Fetch all companies
    getCompanies: async(req, res) => {
        try {
            const companies = await CompanyModel.getAllCompanies();
            res.status(200).json(companies);
        } catch (err) {
            console.error("Error fetching companies:", err);
            res.status(500).send("Internal server error");
        }
    },

    // Add a new company
    addCompany: async(req, res) => {
        const { name, address, pin } = req.body;
        try {
            await CompanyModel.addCompany({ name, address, pin });
            res.status(201).send("Company added successfully");
        } catch (err) {
            console.error("Error adding company:", err);
            res.status(500).send("Internal server error");
        }
    },

    // Update a company
    updateCompany: async(req, res) => {
        const { id } = req.params;
        const { name, address, pin } = req.body;
        try {
            await CompanyModel.updateCompany(id, { name, address, pin });
            res.status(200).send("Company updated successfully");
        } catch (err) {
            console.error("Error updating company:", err);
            res.status(500).send("Internal server error");
        }
    },

    // Delete a company
    deleteCompany: async(req, res) => {
        const { id } = req.params;
        try {
            await CompanyModel.deleteCompany(id);
            res.status(200).send("Company deleted successfully");
        } catch (err) {
            console.error("Error deleting company:", err);
            res.status(500).send("Internal server error");
        }
    },
};

module.exports = CompanyController;