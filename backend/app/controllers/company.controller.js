const Company = require('../models/company.model.js');

// Create and Save a new Company
exports.create = (req, res) => {
    // Validate request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Company name can not be empty"
        });
    }
 
    // Create a Company
    const company = new Company({
        name: req.body.name, 
        crunchbase_url: req.body.crunchbase_url,
        homepage_url: req.body.homepage_url,
        blog_url: req.body.blog_url,
        twitter_username: req.body.twitter_username,
        number_of_employees: req.body.number_of_employees,
        founded_year: req.body.founded_year,
        founded_month: req.body.founded_month,
        founded_day: req.body.founded_day,
        tag_list: req.body.tag_list,
        email_address: req.body.email_address,
        description: req.body.description,
        products: req.body.products
    });

    // Save Company in the database
    company.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Company."
        });
    });
};

//------------------------------------------------------------------------------------------------------------------------------

// Retrieve and return all companies from the database.
exports.findAll = (req, res) => {
    Company.find()
    .then(companies => {
        res.send(companies);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving companies."
        });
    });
};

//-----------------------------------------------------------------------------------------------------------------------------

// Find a single company with a companyId
exports.findOne = (req, res) => {
    Company.findById({_id: req.params.companyId })
    .then(company => {
        if(!company) {
            return res.status(404).send({
                message: "Company not found with id " + req.params.companyId
            });            
        }
        res.send(company);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Company not found with id " + req.params.companyId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving company with id " + req.params.companyId
        });
    });
};

//-----------------------------------------------------------------------------------------------------------------------


// Update a company identified by the companyId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Company name can not be empty"
        });
    }

    // Find company and update it with the request body
    Company.findByIdAndUpdate({_id: req.params.companyId }, {
        name: req.body.name, 
        crunchbase_url: req.body.crunchbase_url,
        homepage_url: req.body.homepage_url,
        blog_url: req.body.blog_url,
        twitter_username: req.body.twitter_username,
        number_of_employees: req.body.number_of_employees,
        founded_year: req.body.founded_year,
        founded_month: req.body.founded_month,
        founded_day: req.body.founded_day,
        tag_list: req.body.tag_list,
        email_address: req.body.email_address,
        description: req.body.description,
        products: req.body.products
    }, {new: true})
    .then(company => {
        if(!company) {
            return res.status(404).send({
                message: "Company not found with id " + req.params.companyId
            });
        }
        res.send(company);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Company not found with id " + req.params.companyId
            });                
        }
        return res.status(500).send({
            message: "Error updating company with id " + req.params.companyId
        });
    });
};


//----------------------------------------------------------------------------------------------------------------------------

// Delete a note with the specified companyId in the request
exports.delete = (req, res) => {
    Company.findByIdAndRemove({_id: req.params.companyId })
    .then(company => {
        if(!company) {
            return res.status(404).send({
                message: "Company not found with id " + req.params.companyId
            });
        }
        res.send({message: "Company deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Company not found with id " + req.params.companyId
            });                
        }
        return res.status(500).send({
            message: "Could not delete company with id " + req.params.companyId
        });
    });
};