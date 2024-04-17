import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise()

// Fonctions pour récupérer les données de la base de données

export async function getAgency() {
  const [rows] = await pool.query('SELECT * FROM agency')
  return rows
}

export async function getUser() {
  const [rows] = await pool.query(
    "SELECT technical_agent.id_emp FROM technical_agent JOIN employee ON technical_agent.id_emp = employee.id_emp JOIN agency ON employee.id_agc = agency.id_agc JOIN city ON agency.id_cty = city.id_cty WHERE name_cty = 'Bordeaux'"
  )
  return rows
}

export async function getSensor() {
  const [rows] = await pool.query(
    'SELECT count(id_sns) as total_number_of_sensors from sensor'
  )
  return rows
}

export async function getReport() {
  const [rows] = await pool.query(
    "SELECT * FROM Report WHERE publication_date_rep < '2023-01-01' AND publication_date_rep > '2017-12-31'"
  )
  return rows
}

export async function getGasEmissions() {
  const [rows] = await pool.query(
    "SELECT name_rgn, Sum(ppm_value_dta) as Sum_ppm_value_dta From region Join data On region.id_rgn = data.id_rgn Join gas On data.id_gas = gas.id_gas Join gas_type On gas.id_typ = gas_type.id_typ Where gas_type_typ = 'GES' and date_dta > '2019-12-31' and date_dta < '2020-01-01' Group by name_rgn"
  )
  return rows
}

export async function getMostPolluting() {
  const [rows] = await pool.query(
    'SELECT *, SUM(data.ppm_value_dta) as sumeee FROM sector JOIN sensor ON sector.id_sec = sensor.id_sec JOIN data ON sensor.id_sns = data.id_sns JOIN region ON data.id_rgn = region.id_rgn GROUP BY name_sec ORDER BY sumeee DESC LIMIT 1'
  )
  return rows
}

export async function sortReport() {
  const [rows] = await pool.query(
    "SELECT report.* FROM report JOIN reports ON report.id_rep = reports.id_rep JOIN gas ON reports.id_gas = gas.id_gas WHERE name_gas = 'NH3' ORDER BY publication_date_rep"
  )
  return rows
}

export async function getAgent() {
  const [rows] = await pool.query(
    "SELECT surname_emp FROM Employee INNER JOIN Technical_Agent ON Employee.id_emp = Technical_Agent.id_emp INNER JOIN Sensor ON Technical_Agent.id_emp = Sensor.id_emp INNER JOIN Gas ON Sensor.id_gas = Gas.id_gas INNER JOIN Gas_Type ON Gas.id_typ = Gas_Type.id_typ WHERE gas_type_typ = 'GRA'"
  )
  return rows
}

export async function getEmissionSum() {
  const [rows] = await pool.query(
    "SELECT name_gas, SUM(ppm_value_dta) as sum_ppm_value_dta from region join data on region.id_rgn = data.id_rgn join gas on gas.id_gas = data.id_gas where name_rgn = 'ile de france' and date_dta > '2019-12-31' and date_dta < '2021-01-01' group by name_gas"
  )
  return rows
}

export async function getProdRate() {
  const [rows] = await pool.query(
    "SELECT COUNT(report.id_rep)/DATEDIFF(CURRENT_DATE(), employee.employment_date_emp) as taux_de_productivité, employee.id_emp, employee.surname_emp, employee.first_name_emp FROM agency JOIN city ON city.id_cty = agency.id_cty JOIN employee ON employee.id_agc = agency.id_agc JOIN wrote ON employee.id_emp = wrote.id_emp JOIN report ON wrote.id_rep = report.id_rep WHERE name_cty = 'Toulouse'"
  )
  return rows
}

export async function getReportList(gasType) {
  const [rows] = await pool.query(
    `SELECT report.* FROM report JOIN reports ON report.id_rep = reports.id_rep JOIN gas ON reports.id_gas = gas.id_gas WHERE name_gas = '${gasType}'`
  )
  return
}

export async function getRegionList() {
  const [rows] = await pool.query(
    'SELECT * FROM Region INNER JOIN City ON Region.id_rgn = City.id_rgn INNER JOIN Agency ON City.id_cty = Agency.id_cty INNER JOIN Employee ON Employee.id_agc = Agency.id_agc INNER JOIN Technical_Agent ON Employee.id_emp = Technical_Agent.id_emp INNER JOIN Sensor ON Technical_Agent.id_emp = Sensor.id_emp GROUP BY name_rgn HAVING COUNT(sensor.id_sns) > COUNT(agency.id_agc)'
  )
  return rows
}

export async function getCreds(username, password) {
  const [rows] = await pool.query(
    `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`
  )
  return rows
}
