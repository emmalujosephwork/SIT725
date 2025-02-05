const express = require("express");
const CompanyController = require("../controllers/companyController"); // Ensure this path is correct

const router = express.Router();

// Route to fetch all companies
router.get("/companies", CompanyController.getCompanies);

// Route to add a new company
router.post("/companies", CompanyController.addCompany);

// Route to update a company
router.put("/companies/:id", CompanyController.updateCompany);

// Route to delete a company
router.delete("/companies/:id", CompanyController.deleteCompany);

module.exports = router;