import express from 'express'
import { getAgency, getUser, getSensor, getReport, getGasEmissions, getMostPolluting, sortReport, getAgent, getEmissionSum, getProdRate, getReportList, getRegionList } from './login.js';

const app = express()

app.get("/api", (req, res) => {
    res.json('Online!')
})
// Login page

app.get("/api/agency", async (req, res) => {
    res.json(await getAgency());
});

app.get("/api/user/bordeaux", async (req, res) => {
    res.json(await getUser());
});

app.get("/api/sensor", async (req, res) => {
    res.json(await getSensor());
});

app.get("/api/report", async (req, res) => {
    res.json(await getReport());
});

app.get("/api/gas-emissions", async (req, res) => {
    res.json(await getGasEmissions());
});

app.get("/api/most-polluting", async (req, res) => {
    res.json(await getMostPolluting());
});

app.get("/api/sort-report", async (req, res) => {
    res.json(await sortReport());
});

app.get("/api/agent", async (req, res) => {
    res.json(await getAgent());
});

app.get("/api/emission-sum", async (req, res) => {
    res.json(await getEmissionSum());
});

app.get("/api/prod-rate", async (req, res) => {
    res.json(await getProdRate());
});

app.get("/api/report-list/:gasType", async (req, res) => {
    const gasType = req.params.gasType;
    res.json(await getReportList(gasType));
});

app.get("/api/region-list", async (req, res) => {
    res.json(await getRegionList());
});

app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).json('Something went wrong!')
})

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})