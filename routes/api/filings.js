const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const xml = require('xml');
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const xml2js = require('xml2js');
const https = require('https');
const request = require('request-promise');
const { check, validationResult } = require('express-validator');




const Filings = require('../../models/Filings');

// const urls = [
// 'https://s3.amazonaws.com/irs-form-990/index_2013.json',
// 'https://s3.amazonaws.com/irs-form-990/index_2014.json',
// 'https://s3.amazonaws.com/irs-form-990/index_2015.json',
// 'https://s3.amazonaws.com/irs-form-990/index_2016.json',
// 'https://s3.amazonaws.com/irs-form-990/index_2017.json',
// 'https://s3.amazonaws.com/irs-form-990/index_2018.json',
// 'https://s3.amazonaws.com/irs-form-990/index_2019.json',
// 'https://s3.amazonaws.com/irs-form-990/index_2020.json'
// ];


// @route   GET api/filings/updatedb
// @desc    Update DB from irs db
// @access  Public
router.get('/updatedb', async (req, res) => {
    try {
        const finalIndex = await Promise.all(urls.map(url => fetch(url).then(result => result.json())));
        for (let i = 0; i < finalIndex.length; i++) {
            for (const [key, value] of Object.entries(finalIndex[i])) {
                // console.log(`${key}: ${value}`);
                for (const v of Object.values(value)) {
                    let filings = new Filings({
                        ein: v.EIN,
                        taxPeriod: v.TaxPeriod,
                        dln: v.DLN,
                        formType: v.FormType,
                        url: v.URL,
                        organizationName: v.OrganizationName,
                        submittedOn: v.SubmittedOn,
                        objectId: v.ObjectId,
                        lastUpdated: v.LastUpdated
                    })
                    filings.save(() => {
                        console.log(`saved ${filings}`);
                    })
                }
            }
        }

        res.send('db udpated');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/filings
// @desc    Get all returns
// @access  Public
router.get('/', async (req, res) => {
    try {
        const returns = await Filings.find().limit(10);

        res.json(returns);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/filings/reeturn/:return_id
// @desc    Get all returns
// @access  Public
router.get('/return/:return_id', async (req, res) => {
    try {
        const returns = await Filings.findOne({ _id: req.params.return_id });
        console.log(req.params.return_id);
        res.json(returns);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/filings/return/:return_id
// @desc    Get all returns
// @access  Public
router.get('/org/:org_ein', async (req, res) => {
    try {
        console.log('starting');
        const xmlUrls = await Filings.find({ EIN: req.params.org_ein });

        let urlList = [];
        let returns = [];
        for (let [key, value] of Object.entries(xmlUrls)) {
            if (value.FormType == '990') {
                urlList.push(value.URL);
            }
        }
        console.log(urlList.length);
        const parser = new xml2js.Parser();

        const parsedJson = async function () {
            let list = [];
            for (let i = 0; i < urlList.length; i++) {
                let resp = await request({
                    uri: urlList[i]
                });
                let parsedXml = await parser.parseStringPromise(resp);
                list.push(parsedXml);
            }
            return list;
        }
        parsedJson().then(parsedJson => {
            res.json(parsedJson);
            console.log('done');
        })
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
);

module.exports = router;