const mongoose = require('mongoose');

const FilingsSchema = new mongoose.Schema(
    {
        EIN: {
            type: String,
            // required: true,
        },
        TaxPeriod: {
            type: String
        },
        DLN: {
            type: String
        },
        FormType: {
            type: String
        },
        URL: {
            type: String
        },
        OrganizationName: {
            type: String
        },
        SubmittedOn: {
            type: Date
        },
        ObjectId: {
            type: String
        },
        LastUpdated: {
            type: Date
        }
    }
);

module.exports = Filings = mongoose.model('filings', FilingsSchema);