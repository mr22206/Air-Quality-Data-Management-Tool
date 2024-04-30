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
  executeClientRequest,
} from './utils/queries.js'
import cors from 'cors'
import { generateAiRequest, executeAiRequest } from './utils/aiUtils.js'
import authenticateToken from './utils/middleware.js'
import jwt from 'jsonwebtoken'

const app = express()
const corsOptions = {
  origin: 'http://localhost:5173',
}

app.use(express.json())
app.use(cors(corsOptions))

app.get('/api', (req, res) => {
  res.json({ message: 'Online!' })
})

app.get('/api/agency', authenticateToken, async (req, res) => {
  try {
    const agencies = await getAgency()
    res.json({ queryResult: agencies })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/user/bordeaux', authenticateToken, async (req, res) => {
  try {
    const users = await getUser()
    res.json({ queryResult: users })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/sensor', authenticateToken, async (req, res) => {
  try {
    const sensors = await getSensor()
    res.json({ queryResult: sensors })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/report', authenticateToken, async (req, res) => {
  try {
    const reports = await getReport()
    res.json({ queryResult: reports })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/gas-emissions', authenticateToken, async (req, res) => {
  try {
    const gasEmissions = await getGasEmissions()
    res.json({ queryResult: gasEmissions })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/most-polluting', authenticateToken, async (req, res) => {
  try {
    const mostPolluting = await getMostPolluting()
    res.json({ queryResult: mostPolluting })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/sort-report', authenticateToken, async (req, res) => {
  try {
    const sortedReports = await sortReport()
    res.json({ queryResult: sortedReports })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/agent', authenticateToken, async (req, res) => {
  try {
    const agents = await getAgent()
    res.json({ queryResult: agents })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/emission-sum', authenticateToken, async (req, res) => {
  try {
    const emissionSum = await getEmissionSum()
    res.json({ queryResult: emissionSum })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/prod-rate', authenticateToken, async (req, res) => {
  try {
    const prodRate = await getProdRate()

    res.json({ queryResult: prodRate })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post('/api/report-list/:gasType', authenticateToken, async (req, res) => {
  try {
    const gasTypeParam = req.params['gasType'] // Accéder au paramètre sans les deux points
    const gasType = '"' + gasTypeParam.substring(1) + '"'
    const reportList = await getReportList(gasType)
    // console.log(gasType)

    // console.log(JSON.stringify(reportList, null, 2)); // Affichage dans la console

    res.json({ queryResult: reportList[0] })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/region-list', authenticateToken, async (req, res) => {
  try {
    const regionList = await getRegionList()
    res.json({ queryResult: regionList })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post('/api/creds', authenticateToken, async (req, res) => {
  const { username, password } = req.body

  try {
    const creds = await getCreds(username, password)
    const user = creds[0]
    console.log(user)

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' }) //change res
    }
    const token = jwt.sign(
      { userName: user.username, userPrivileges: user.privileges },
      'secretKey',
      {
        expiresIn: '1h',
      }
    )
    return res.status(200).json({ message: 'Login successful', token })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

app.post('/api/ask-ai', authenticateToken, async (req, res) => {
  try {
    const userInput = req.body.userInput
    const request = await generateAiRequest(userInput)

    const data = await executeAiRequest(request)

    res.status(200).json({ request, data })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post('/api/request', authenticateToken, async (req, res) => {
  try {
    const userRequest = req.body.userRequest
    const data = await executeClientRequest(userRequest)
    console.log('hello')
    res.status(200).json({ data })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
