import { openai } from './openai.js'
import { pool } from './queries.js'

export const generateAiRequest = async (prompt) => {
  const results = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: ` You are an expert in SQL, I ask you for requests on a database constructed as such and you reply ONLY with the request, I insist on the fact that you return only the request.
              CREATE TABLE Report(
                  id_rep VARCHAR(50),
                  title_rep VARCHAR(50),
                  publication_date_rep VARCHAR(50),
                  content_rep VARCHAR(50),
                  PRIMARY KEY(id_rep)
               );
               
               CREATE TABLE Region(
                  id_rgn VARCHAR(50),
                  name_rgn VARCHAR(50) NOT NULL,
                  PRIMARY KEY(id_rgn)
               );
               
               CREATE TABLE Gas_Type(
                  id_typ VARCHAR(50),
                  gas_type_typ VARCHAR(50) NOT NULL,
                  PRIMARY KEY(id_typ)
               );
               
               CREATE TABLE Sector(
                  id_sec VARCHAR(50),
                  name_sec VARCHAR(50) NOT NULL,
                  PRIMARY KEY(id_sec)
               );
               
               CREATE TABLE City(
                  id_cty VARCHAR(50),
                  name_cty VARCHAR(50),
                  id_rgn VARCHAR(50) NOT NULL,
                  PRIMARY KEY(id_cty),
                  FOREIGN KEY(id_rgn) REFERENCES Region(id_rgn)
               );
               
               CREATE TABLE Agency(
                  id_agc VARCHAR(50),
                  name_agc VARCHAR(50),
                  address_agc VARCHAR(50),
                  id_cty VARCHAR(50) NOT NULL,
                  PRIMARY KEY(id_agc),
                  FOREIGN KEY(id_cty) REFERENCES City(id_cty)
               );
               
               CREATE TABLE Employee(
                  id_emp VARCHAR(50),
                  surname_emp VARCHAR(50),
                  first_name_emp VARCHAR(50),
                  birth_date_emp VARCHAR(50),
                  employment_date_emp VARCHAR(50),
                  address_emp VARCHAR(50),
                  id_agc VARCHAR(50) NOT NULL,
                  PRIMARY KEY(id_emp),
                  FOREIGN KEY(id_agc) REFERENCES Agency(id_agc)
               );
               
               CREATE TABLE Gas(
                  id_gas VARCHAR(50),
                  name_gas VARCHAR(50) NOT NULL,
                  id_typ VARCHAR(50),
                  PRIMARY KEY(id_gas),
                  FOREIGN KEY(id_typ) REFERENCES Gas_Type(id_typ)
               );
               
               CREATE TABLE Technical_Agent(
                  id_emp VARCHAR(50),
                  PRIMARY KEY(id_emp),
                  FOREIGN KEY(id_emp) REFERENCES Employee(id_emp)
               );
               
               CREATE TABLE Administrative_Agent(
                  id_emp VARCHAR(50),
                  PRIMARY KEY(id_emp),
                  FOREIGN KEY(id_emp) REFERENCES Employee(id_emp)
               );
               
               CREATE TABLE Agency_Head(
                  id_emp VARCHAR(50),
                  PRIMARY KEY(id_emp),
                  FOREIGN KEY(id_emp) REFERENCES Employee(id_emp)
               );
               
               CREATE TABLE Sensor(
                  id_sns VARCHAR(50),
                  id_sec VARCHAR(50) NOT NULL,
                  id_emp VARCHAR(50) NOT NULL,
                  id_gas VARCHAR(50) NOT NULL,
                  PRIMARY KEY(id_sns),
                  FOREIGN KEY(id_sec) REFERENCES Sector(id_sec),
                  FOREIGN KEY(id_emp) REFERENCES Technical_Agent(id_emp),
                  FOREIGN KEY(id_gas) REFERENCES Gas(id_gas)
               );
               
               CREATE TABLE Data(
                  id_dta VARCHAR(50),
                  ppm_value_dta VARCHAR(50),
                  date_dta VARCHAR(50),
                  id_gas VARCHAR(50) NOT NULL,
                  id_rgn VARCHAR(50) NOT NULL,
                  id_sns VARCHAR(50) NOT NULL,
                  PRIMARY KEY(id_dta),
                  FOREIGN KEY(id_gas) REFERENCES Gas(id_gas),
                  FOREIGN KEY(id_rgn) REFERENCES Region(id_rgn),
                  FOREIGN KEY(id_sns) REFERENCES Sensor(id_sns)
               );
               
               CREATE TABLE Includes(
                  id_dta VARCHAR(50),
                  id_rep VARCHAR(50),
                  PRIMARY KEY(id_dta, id_rep),
                  FOREIGN KEY(id_dta) REFERENCES Data(id_dta),
                  FOREIGN KEY(id_rep) REFERENCES Report(id_rep)
               );
               
               CREATE TABLE Wrote(
                  id_rep VARCHAR(50),
                  id_emp VARCHAR(50),
                  PRIMARY KEY(id_rep, id_emp),
                  FOREIGN KEY(id_rep) REFERENCES Report(id_rep),
                  FOREIGN KEY(id_emp) REFERENCES Administrative_Agent(id_emp)
               );
               
               CREATE TABLE Directs(
                  id_agc VARCHAR(50),
                  id_emp VARCHAR(50),
                  PRIMARY KEY(id_agc, id_emp),
                  FOREIGN KEY(id_agc) REFERENCES Agency(id_agc),
                  FOREIGN KEY(id_emp) REFERENCES Agency_Head(id_emp)
               );
               
               CREATE TABLE Reports(
                  id_rep VARCHAR(50),
                  id_gas VARCHAR(50),
                  PRIMARY KEY(id_rep, id_gas),
                  FOREIGN KEY(id_rep) REFERENCES Report(id_rep),
                  FOREIGN KEY(id_gas) REFERENCES Gas(id_gas)
               );
               `,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
  })

  return results.choices[0].message.content
}

export const executeAiRequest = async (request) => {
  const [rows] = await pool.query(request)
  return rows
}
