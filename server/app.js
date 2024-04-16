import express from 'express'
import {
  getAgency,
  getUser,
  getSensor,
  getReport,
  getGasEmissions,
  getMostPolluting,
  sortReport,
  getAgent,
  getEmissionSum,
  getProdRate,
  getReportList,
  getRegionList,
} from './login.js'

import cors from 'cors'
const app = express()

<<<<<<<<< Temporary merge branch 1
app.get("/", (req, res) => {
=========
app.get("/api", (req, res) => {
>>>>>>>>> Temporary merge branch 2
    res.send('Online!')
})
// Login page

<<<<<<<<< Temporary merge branch 1
app.get("/agency", async (req, res) => {
    res.send(await getAgency());
});

app.get("/user/bordeaux", async (req, res) => {
    res.send(await getUser());
});

app.get("/sensor", async (req, res) => {
    res.send(await getSensor());
});

app.get("/report", async (req, res) => {
    res.send(await getReport());
});

app.get("/gas-emissions", async (req, res) => {
    res.send(await getGasEmissions());
});

app.get("/most-polluting", async (req, res) => {
    res.send(await getMostPolluting());
});

app.get("/sort-report", async (req, res) => {
    res.send(await sortReport());
});

app.get("/agent", async (req, res) => {
    res.send(await getAgent());
});

app.get("/emission-sum", async (req, res) => {
    res.send(await getEmissionSum());
});

app.get("/prod-rate", async (req, res) => {
    res.send(await getProdRate());
});

app.get("/report-list/:gasType", async (req, res) => {
=========
app.get("/api/agency", async (req, res) => {
    res.send(await getAgency());
});

app.get("/api/user/bordeaux", async (req, res) => {
    res.send(await getUser());
});

app.get("/api/sensor", async (req, res) => {
    res.send(await getSensor());
});

app.get("/api/report", async (req, res) => {
    res.send(await getReport());
});

app.get("/api/gas-emissions", async (req, res) => {
    res.send(await getGasEmissions());
});

app.get("/api/most-polluting", async (req, res) => {
    res.send(await getMostPolluting());
});

app.get("/api/sort-report", async (req, res) => {
    res.send(await sortReport());
});

app.get("/api/agent", async (req, res) => {
    res.send(await getAgent());
});

app.get("/api/emission-sum", async (req, res) => {
    res.send(await getEmissionSum());
});

app.get("/api/prod-rate", async (req, res) => {
    res.send(await getProdRate());
});

app.get("/api/report-list/:gasType", async (req, res) => {
>>>>>>>>> Temporary merge branch 2
    const gasType = req.params.gasType;
    res.send(await getReportList(gasType));
});

<<<<<<<<< Temporary merge branch 1
app.get("/region-list", async (req, res) => {
=========
app.get("/api/region-list", async (req, res) => {
>>>>>>>>> Temporary merge branch 2
    res.send(await getRegionList());
});

app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).send('Something went wrong!')
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
