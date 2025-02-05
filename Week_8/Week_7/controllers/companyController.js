const CompanyModel = require("../models/companyModel");

const CompanyController = {
    // Fetch all companies
    getCompanies: async(req, res) => {
        try {
            const companies = await CompanyModel.getAllCompanies();
            console.log("📥 Fetched companies:", companies); // Debugging log
            res.status(200).json(companies);
        } catch (err) {
            console.error("❌ Error fetching companies:", err);
            res.status(500).send("Internal server error");
        }
    },

    // Add a new company
    addCompany: async(req, res) => {
        const { name, address, pin } = req.body;
        console.log("📤 Adding new company:", { name, address, pin }); // Debugging log
        try {
            const result = await CompanyModel.addCompany({ name, address, pin });
            console.log("✅ Company added successfully:", result); // Log the inserted document
            res.status(201).send("Company added successfully");
        } catch (err) {
            console.error("❌ Error adding company:", err);
            res.status(500).send("Internal server error");
        }
    },

    // Update a company
    updateCompany: async(req, res) => {
        const { id } = req.params;
        const { name, address, pin } = req.body;
        console.log("📤 Updating company ID:", id, { name, address, pin }); // Debugging log
        try {
            const result = await CompanyModel.updateCompany(id, { name, address, pin });
            console.log("✅ Company updated successfully:", result); // Log the updated document
            res.status(200).send("Company updated successfully");
        } catch (err) {
            console.error("❌ Error updating company:", err);
            res.status(500).send("Internal server error");
        }
    },

    // Delete a company
    deleteCompany: async(req, res) => {
        const { id } = req.params;
        console.log("📤 Deleting company ID:", id); // Debugging log
        try {
            const result = await CompanyModel.deleteCompany(id);
            console.log("✅ Company deleted successfully:", result); // Log the deleted document
            res.status(200).send("Company deleted successfully");
        } catch (err) {
            console.error("❌ Error deleting company:", err);
            res.status(500).send("Internal server error");
        }
    },
};

module.exports = CompanyController;