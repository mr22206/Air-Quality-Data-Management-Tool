# DATA-X - Outil de Gestion des Données sur la Qualité de l'Air

Bienvenue sur le dépôt GitHub de l'**outil de gestion des données sur la qualité de l'air** développé par **DATA-X** pour le compte du **Ministère de l'Écologie**. Ce dépôt contient le code source de l'application, conçue pour centraliser les données météorologiques, gérer le personnel et les capteurs, et publier des rapports sur la qualité de l'air.

## Table des matières
- [À propos](#à-propos)
- [Fonctionnalités principales](#fonctionnalités-principales)
- [Structure des pages](#structure-des-pages)
- [Comment installer et utiliser le projet](#comment-installer-et-utiliser-le-projet)
- [Contact](#contact)
- [Licence](#licence)

---

## À propos
Le projet de **DATA-X** vise à créer un outil de gestion des données pour le **Ministère de l'Écologie**, facilitant la **centralisation des informations** provenant des agences météorologiques. Cet outil permet également de **gérer les capteurs**, le personnel, et de générer des **rapports de qualité de l'air**.

### Objectifs :
- Centralisation des données météorologiques.
- Suivi et gestion des capteurs installés.
- Gestion des utilisateurs et de leurs privilèges.
- Extraction et gestion des données via des requêtes SQL spécifiques.
- Publication de rapports détaillés sur la qualité de l'air.

Le projet utilise des technologies modernes pour assurer une **gestion fluide** des données et respecter des **normes strictes de sécurité** et de qualité.

---

## Fonctionnalités principales

### 1. **Gestion des utilisateurs et des privilèges**
L'outil permet une gestion centralisée des utilisateurs et de leurs rôles. Chaque rôle détermine les actions qu'un utilisateur peut effectuer (requêtes SQL, ajout de données, etc.).

![image](https://github.com/user-attachments/assets/cd1074b8-4701-4449-b118-b517b0b55a11)

### 2. **Centralisation des données météorologiques**
Toutes les données des capteurs sur la qualité de l'air sont centralisées et peuvent être visualisées ou exportées pour l'analyse.
- 💡 **Illustration suggérée** : Tableau des données collectées par les capteurs (température, niveaux de CO2, etc.).

### 3. **Requêtes SQL interactives**
Les utilisateurs peuvent exécuter des requêtes SQL pour extraire des informations ou mettre à jour les données, selon leurs droits d'accès.
- 💡 **Illustration suggérée** : Interface utilisateur permettant de saisir des requêtes SQL personnalisées.

### 4. **Assistant AI pour les requêtes SQL**
Un assistant AI aide les utilisateurs à formuler des requêtes SQL en langage naturel pour interroger la base de données.
- 💡 **Illustration suggérée** : Capture d'écran de l'assistant avec une requête en langage naturel convertie en SQL.

### 5. **Publication de rapports**
Des rapports périodiques sur la qualité de l'air peuvent être générés automatiquement et consultés par les administrateurs.
- 💡 **Illustration suggérée** : Aperçu d'un rapport généré avec des graphiques sur les niveaux de pollution.

---

## Structure des pages

### Page d'accueil
- **Sections** : Accueil, Données, Requêtes, Assistant AI, Connexion.
- **Description** : Présente les fonctionnalités principales de l'outil, avec un guide d'utilisation.

### Page Data
- **Description** : Affiche les données collectées par les capteurs, avec la possibilité de filtrer et exporter les résultats. Les utilisateurs peuvent spécifier des paramètres tels que la région ou le type de gaz pour affiner leur recherche.

### Page Query
- **Description** : Interface pour exécuter des requêtes SQL directement sur la base de données. Les privilèges des utilisateurs déterminent les requêtes autorisées (SELECT, INSERT, UPDATE).
- **Simplicité** : Les utilisateurs peuvent facilement exécuter des requêtes via une interface intuitive.

### Page Ask Ai
- **Description** : Permet aux utilisateurs de formuler des requêtes en langage naturel pour obtenir des données spécifiques sans avoir besoin de maîtriser le SQL.

### Page Login
- **Description** : Permet aux utilisateurs de se connecter avec leurs identifiants pour accéder aux fonctionnalités adaptées à leur rôle.

---

## Comment installer et utiliser le projet

### Prérequis
- Visual Studio Code
- NodeJS
- Xampp (pour la gestion de MySQL)

### Installation

1. **Cloner le dépôt** :
   ```bash
   git clone https://github.com/votre-utilisateur/data-x-air-quality.git
   ```
2. **Extraire le projet** et ouvrir le dossier dans Visual Studio Code.
3. **Installer les dépendances** :
   ```bash
   npm install
   ```
4. **Configurer la base de données** :
   - Démarrez MySQL via Xampp.
   - Importez le fichier SQL dans la base de données via phpMyAdmin.
5. **Lancer le projet** :
   ```bash
   npm start
   ```
6. **Accéder au site** :
   Ouvrez votre navigateur et accédez à l'URL suivante :
   ```
   http://localhost:5173/
   ```

### Utilisation
- **Navigation** : Utilisez la page d'accueil pour explorer les fonctionnalités, soumettre des requêtes, et accéder aux données.
- **Connexion** : Les utilisateurs doivent se connecter pour accéder aux fonctionnalités avancées comme la gestion des capteurs ou des requêtes SQL.

---

## Contact
Si vous avez des questions ou souhaitez obtenir plus d'informations, vous pouvez nous contacter :
- **Téléphone** : 06 61 ** ** **
- **E-mail** : support@data-x.com

---

## Licence
Ce projet est sous licence [MIT](LICENSE). Veuillez consulter le fichier de licence pour plus de détails.

---
