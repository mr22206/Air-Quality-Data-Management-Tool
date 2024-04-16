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
const corsOptions = {
  origin: 'http://localhost:5173',
}

app.use(cors(corsOptions))
a
app.get('/api', (req, res) => {
  res.json({ message: 'Online!' })
})
// Login page

app.get('/api/agency', async (req, res) => {
  res.send(await getAgency())
})

app.get('/api/user/bordeaux', async (req, res) => {
  res.send(await getUser())
})

app.get('/api/sensor', async (req, res) => {
  res.json(await getSensor())
})

app.get('/api/report', async (req, res) => {
  res.send(await getReport())
})

app.get('/api/gas-emissions', async (req, res) => {
  res.send(await getGasEmissions())
})

app.get('/api/most-polluting', async (req, res) => {
  res.send(await getMostPolluting())
})

app.get('/api/sort-report', async (req, res) => {
  res.send(await sortReport())
})

app.get('/api/agent', async (req, res) => {
  res.send(await getAgent())
})

app.get('/api/emission-sum', async (req, res) => {
  res.send(await getEmissionSum())
})

app.get('/api/prod-rate', async (req, res) => {
  res.send(await getProdRate())
})

app.get('/api/report-list/:gasType', async (req, res) => {
  const gasType = req.params.gasType
  res.send(await getReportList(gasType))
})

app.get('/api/region-list', async (req, res) => {
  res.send(await getRegionList())
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
