const mongoose = require('mongoose');

const OrganizationsSchema = new mongoose.Schema(
    {
        EIN: {
            type: String,
            required: true,
            unique: true
        },
        OrganizationName: {
            type: String,
            required: true
        },
        avatar: {
            type: String
        }
    }
);

module.exports = Organizations = mongoose.model('organizations', OrganizationsSchema);