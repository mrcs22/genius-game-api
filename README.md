<h1 align="center">genius-game-api</h1>

## 📕 Summary

- [📋 About](#about)
- [📝 Features](#features)
- [🕹 technologies ](#tecnologias)
- [🧑🏽‍💻 How to run](#how-to-run)

<hr>

<!-- About -->

# About

<p align="left">project guided by <a href="https://github.com/nathyts/"> Nathally Souza </a> in the Cognizant Cloud Data Engineer #2 bootcamp with the objective of practicing the content studied in the Mysql courses, such as relationships, table manipulation clauses, and CRUD, also taught by her. Initially it would be a project to control TV series, but I decided to customize it to make one to manage a game in the Genius style. So this is an API for Genius memory game, where you can select a color, get expected colors, and get user and top 5 users scores. This application is used at Genius game that you can access by clicking <a href="https://github.com/mrcs22/Jogo-de-memoria-estilo-Genius"> here. </a></p>

<!-- Features -->

# Features

- [x] Sign up
- [x] Sign in
- [x] Post selected color 
- [x] Get next expected color
- [x] Get user score
- [x] List top 5 users scores

<!-- technologies -->

# Technologies

- [Node JS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [MySQL](https://www.mysql.com/)

<hr>

<!-- how to run -->

# How to run

##### requirements

- Node JS

  ```sh
  https://nodejs.org/en/
  ```

- Yarn or Npm

  ```sh
  https://yarnpkg.com/
  ```

- MySQL

  ```sh
  https://www.mysql.com/
  ```

<hr>

```bash
# clone this repo by running
$ git clone https://github.com/mrcs22/genius-game-api.git
# or use the download option.

#change to project directory
$ cd genius-game-api

# install the dependencies
$ yarn or npm install

# Populate .env.example file and rename it to .env

# Create the tables using the command
$ yarn or npm run createDbTables


# Run the application using the command
$ yarn or npm run dev
```

---
