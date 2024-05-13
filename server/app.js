import express from 'express'
import { getCreds, executeClientRequest } from './utils/queries.js'
import cors from 'cors'
import { generateAiRequest, executeAiRequest } from './utils/aiUtils.js'
import authenticateToken from './utils/middleware.js'
import jwt from 'jsonwebtoken'

const app = express()
const corsOptions = {
  origin: ['http://localhost:5173', 'https://rwrz.ddns.net/'],
}


app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.use(express.json())
app.use(cors(corsOptions))
app.use(express.static('dist'));




app.get('/api', (req, res) => {
  res.json({ message: 'Online!' })
})


app.get('/api/agency', authenticateToken, async (req, res) => {
  try {
    const agencies = await executeClientRequest(
      'SELECT * FROM agency',
      req.pool
    )
    res.json({ queryResult: agencies })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/user/bordeaux', authenticateToken, async (req, res) => {
  try {
    const users = await executeClientRequest(
      "SELECT technical_agent.id_emp FROM technical_agent JOIN employee ON technical_agent.id_emp = employee.id_emp JOIN agency ON employee.id_agc = agency.id_agc JOIN city ON agency.id_cty = city.id_cty WHERE name_cty = 'Bordeaux'",
      req.pool
    )
    res.json({ queryResult: users })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/sensor', authenticateToken, async (req, res) => {
  try {
    const sensors = await executeClientRequest(
      'SELECT count(id_sns) as total_number_of_sensors from sensor',
      req.pool
    )
    res.json({ queryResult: sensors })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/report', authenticateToken, async (req, res) => {
  try {
    const reports = await executeClientRequest(
      "SELECT * FROM Report WHERE publication_date_rep < '2023-01-01' AND publication_date_rep > '2017-12-31'",
      req.pool
    )
    res.json({ queryResult: reports })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/gas-emissions', authenticateToken, async (req, res) => {
  try {
    const gasEmissions = await executeClientRequest(
      "SELECT name_rgn, Sum(ppm_value_dta) as Sum_ppm_value_dta From region Join data On region.id_rgn = data.id_rgn Join gas On data.id_gas = gas.id_gas Join gas_type On gas.id_typ = gas_type.id_typ Where gas_type_typ = 'GES' and date_dta > '2019-12-31' and date_dta < '2020-01-01' Group by name_rgn",
      req.pool
    )
    res.json({ queryResult: gasEmissions })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/most-polluting', authenticateToken, async (req, res) => {
  try {
    const mostPolluting = await executeClientRequest(
      'SELECT *, SUM(data.ppm_value_dta) as sumeee FROM sector JOIN sensor ON sector.id_sec = sensor.id_sec JOIN data ON sensor.id_sns = data.id_sns JOIN region ON data.id_rgn = region.id_rgn GROUP BY name_sec ORDER BY sumeee DESC LIMIT 1',
      req.pool
    )
    res.json({ queryResult: mostPolluting })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/sort-report', authenticateToken, async (req, res) => {
  try {
    const sortedReports = await executeClientRequest(
      "SELECT report.* FROM report JOIN reports ON report.id_rep = reports.id_rep JOIN gas ON reports.id_gas = gas.id_gas WHERE name_gas = 'NH3' ORDER BY publication_date_rep",
      req.pool
    )
    res.json({ queryResult: sortedReports })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/agent', authenticateToken, async (req, res) => {
  try {
    const agents = await executeClientRequest(
      "SELECT surname_emp FROM Employee INNER JOIN Technical_Agent ON Employee.id_emp = Technical_Agent.id_emp INNER JOIN Sensor ON Technical_Agent.id_emp = Sensor.id_emp INNER JOIN Gas ON Sensor.id_gas = Gas.id_gas INNER JOIN Gas_Type ON Gas.id_typ = Gas_Type.id_typ WHERE gas_type_typ = 'GRA'",
      req.pool
    )
    res.json({ queryResult: agents })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/emission-sum', authenticateToken, async (req, res) => {
  try {
    const emissionSum = await executeClientRequest(
      "SELECT name_gas, SUM(ppm_value_dta) as sum_ppm_value_dta from region join data on region.id_rgn = data.id_rgn join gas on gas.id_gas = data.id_gas where name_rgn = 'Île-de-France' and date_dta > '2019-12-31' and date_dta < '2021-01-01' group by name_gas",
      req.pool
    )
    res.json({ queryResult: emissionSum })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/prod-rate', authenticateToken, async (req, res) => {
  try {
    const prodRate = await executeClientRequest(
      "SELECT COUNT(report.id_rep)/DATEDIFF(CURRENT_DATE(), employee.employment_date_emp) as taux_de_productivité, employee.id_emp, employee.surname_emp, employee.first_name_emp FROM agency JOIN city ON city.id_cty = agency.id_cty JOIN employee ON employee.id_agc = agency.id_agc JOIN wrote ON employee.id_emp = wrote.id_emp JOIN report ON wrote.id_rep = report.id_rep WHERE name_cty = 'Toulouse'",
      req.pool
    )

    res.json({ queryResult: prodRate }) //TODO: check this
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post('/api/report-list/:gasType', authenticateToken, async (req, res) => {
  try {
    const gasTypeParam = req.params['gasType'] // Accéder au paramètre sans les deux points
    const gasType = '"' + gasTypeParam.substring(1) + '"'

    const reportList = await executeClientRequest(
      `CALL GetReportsByGasName(${gasType})`,
      req.pool
    )
    // console.log(gasType)

    // console.log(JSON.stringify(reportList, null, 2)); // Affichage dans la console

    res.json({ queryResult: reportList[0] })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/region-list', authenticateToken, async (req, res) => {
  try {
    const regionList = await executeClientRequest(
      'SELECT * FROM Region INNER JOIN City ON Region.id_rgn = City.id_rgn INNER JOIN Agency ON City.id_cty = Agency.id_cty INNER JOIN Employee ON Employee.id_agc = Agency.id_agc INNER JOIN Technical_Agent ON Employee.id_emp = Technical_Agent.id_emp INNER JOIN Sensor ON Technical_Agent.id_emp = Sensor.id_emp GROUP BY name_rgn HAVING COUNT(sensor.id_sns) > COUNT(agency.id_agc)',
      req.pool
    )
    res.json({ queryResult: regionList })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post('/api/creds', async (req, res) => {
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
    console.log('JHLKJLJGJGJKGJK', request)
    const data = await executeAiRequest(request, req.pool)
    console.log(data)
    if (data === 'unauthorized') {
      return res
        .status(401)
        .json({ error: 'User does not have sufficient permissions' })
    }
    res.status(200).json({ request, data })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post('/api/request', authenticateToken, async (req, res) => {
  try {
    const userRequest = req.body.userRequest
    const data = await executeClientRequest(userRequest, req.pool)
    console.log('hello')
    if (data === 'unauthorized') {
      return res
        .status(401)
        .json({ error: 'User does not have sufficient permissions' })
    }
    res.status(200).json({ data })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on http://localhost:...`);
})


