import express from 'express'
// This line is needed to parse the body of incoming POST requests

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
  getCreds,
} from './login.js'

import cors from 'cors'
const app = express()
const corsOptions = {
  origin: 'http://localhost:5173',
}

app.use(express.json());
app.use(cors(corsOptions))

app.get('/api', (req, res) => {
  res.json({ message: 'Online!' })
})
// Login page

app.get('/api/agency', async (req, res) => {
  res.json(await getAgency())
})

app.get('/api/user/bordeaux', async (req, res) => {
  res.json(await getUser())
})

app.get('/api/sensor', async (req, res) => {
  res.json(await getSensor())
})

app.get('/api/report', async (req, res) => {
  res.json(await getReport())
})

app.get('/api/gas-emissions', async (req, res) => {
  res.json(await getGasEmissions())
})

app.get('/api/most-polluting', async (req, res) => {
  res.json(await getMostPolluting())
})

app.get('/api/sort-report', async (req, res) => {
  res.json(await sortReport())
})

app.get('/api/agent', async (req, res) => {
  res.json(await getAgent())
})

app.get('/api/emission-sum', async (req, res) => {
  res.json(await getEmissionSum())
})

app.get('/api/prod-rate', async (req, res) => {
  res.json(await getProdRate())
})

app.get('/api/report-list/:gasType', async (req, res) => {
  const gasType = req.params.gasType
  res.json(await getReportList(gasType))
})

app.get('/api/region-list', async (req, res) => {
  res.json(await getRegionList())
})


app.post('/api/creds', async (req, res) => {
  const { username, password } = req.body;
  
  const creds = await getCreds(username, password);

  if (creds.length > 0) {
    res.json({ loggedIn: true })
  } else {
    res.json({ loggedIn: false })
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
