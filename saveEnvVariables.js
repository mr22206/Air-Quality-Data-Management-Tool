import fs from 'fs';

// Lire les variables d'environnement
const {
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
  OPENAI_API_KEY
} = process.env;

// Construire le contenu à enregistrer dans le fichier texte
const content = `
DB Host: ${MYSQL_HOST}
DB User: ${MYSQL_USER}
DB Password: ${MYSQL_PASSWORD}
DB Name: ${MYSQL_DATABASE}
OpenAI API Key: ${OPENAI_API_KEY}
`;

// Enregistrer le contenu dans un fichier texte
fs.writeFileSync('variables_env.txt', content);

console.log('Les variables d\'environnement ont été enregistrées dans variables_env.txt');
