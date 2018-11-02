const mongoose = require('mongoose');

const CompanySchema = mongoose.Schema({
    name: String,
    crunchbase_url: String,
    homepage_url: String,
    blog_url: String,
    twitter_username: String,
    number_of_employees: Number,
    founded_year: Number,
    founded_month: Number,
    founded_day: Number,
    tag_list: [{
        type: String
    }],
    email_address: String,
    description: String,
    products: [{
        name: String,
        permalink: String
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Company', CompanySchema);