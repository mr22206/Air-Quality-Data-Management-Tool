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
  getCreds,
} from './utils/queries.js'
import cors from 'cors'
import { generateAiRequest, executeAiRequest } from './utils/aiUtils.js'

const app = express()
const corsOptions = {
  origin: 'http://localhost:5173',
}

app.use(express.json())
app.use(cors(corsOptions))

app.get('/api', (req, res) => {
  res.json({ message: 'Online!' })
})

app.get('/api/agency', async (req, res) => {
  try {
    const agencies = await getAgency()
    res.json({ queryResult: agencies })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/user/bordeaux', async (req, res) => {
  try {
    const users = await getUser()
    res.json({ queryResult: users })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/sensor', async (req, res) => {
  try {
    const sensors = await getSensor()
    res.json({ queryResult: sensors })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/report', async (req, res) => {
  try {
    const reports = await getReport()
    res.json({ queryResult: reports })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/gas-emissions', async (req, res) => {
  try {
    const gasEmissions = await getGasEmissions()
    res.json({ queryResult: gasEmissions })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/most-polluting', async (req, res) => {
  try {
    const mostPolluting = await getMostPolluting()
    res.json({ queryResult: mostPolluting })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/sort-report', async (req, res) => {
  try {
    const sortedReports = await sortReport()
    res.json({ queryResult: sortedReports })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/agent', async (req, res) => {
  try {
    const agents = await getAgent()
    res.json({ queryResult: agents })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/emission-sum', async (req, res) => {
  try {
    const emissionSum = await getEmissionSum()
    res.json({ queryResult: emissionSum })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/prod-rate', async (req, res) => {
  try {
    const prodRate = await getProdRate()
    res.json({ queryResult: prodRate })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post('/api/report-list/:gasType', async (req, res) => {
  try {
    const gasType = req.params.gasType
    const reportList = await getReportList(gasType)
    res.json({ queryResult: reportList })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/region-list', async (req, res) => {
  try {
    const regionList = await getRegionList()
    res.json({ queryResult: regionList })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post('/api/creds', async (req, res) => {
  const { username, password } = req.body

  try {
    const creds = await getCreds(username, password)

    if (creds.length > 0) {
      res.json({ loggedIn: true })
    } else {
      res.json({ loggedIn: false })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post('/api/ask-ai', async (req, res) => {
  try {
    const userInput = req.body.userInput
    const request = await generateAiRequest(userInput)

    const data = await executeAiRequest(request)

    res.status(200).json({ request, data })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
