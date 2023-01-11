[![CircleCI](https://dl.circleci.com/status-badge/img/gh/Abdden/bcp/tree/supreme.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/Abdden/bcp/tree/supreme)

[![Coverage Status](https://coveralls.io/repos/github/Abdden/bcp/badge.svg?branch=supreme)](https://coveralls.io/github/Abdden/bcp?branch=supreme)

[![CircleCI](https://dl.circleci.com/insights-snapshot/gh/Abdden/bcp/supreme/workflow/badge.svg?window=30d)](https://app.circleci.com/insights/github/Abdden/bcp/workflows/workflow/overview?branch=supreme&reporting-window=last-30-days&insights-snapshot=true)

MY BRAND API - BCP

### Available API Endpoints

| HTTP Request | Endpoint      | Description                  |
| :----------- | :------------ | :--------------------------- |
| GET          | /api-docs     | Link To The Documentation    |
| POST         | /signup/admin | User Create An Admin Account |
| POST         | /signup       | User Create An Account       |
| POST         | /login        | User Logs In                 |
| GET          | /contacts     | Admin Gets All Queries       |
| POST         | /contact      | User Creates Query           |
| GET          | /blogs        | User Gets All Blogs          |
| GET          | /blogs/:id    | User Gets Single Blog        |
| POST         | /blogs        | Admin Creates Blog           |
| PUT          | /blogs/:id    | Admin Updates Blog           |
| DELETE       | /blogs/:id    | Admin Deletes Blog           |

## To Install The App

```
$ git clone https://github.com/Abdden/bcp.git
$ cd bcp
$ npm install
```

## To Run The App

```
$ npm run dev
```

## To Run The Test

```
$ npm run test
```

## Tools and Technologies Used For The App

#### Built With

- [Nodejs](https://www.nodejs.org)
- [Expressjs](https://www.expressjs.com)

#### Unit Tested With

- [Jest](https://jestjs.io/) And [Supertest](https://www.npmjs.com/package/supertest)

#### Continuous Integration And Test Coverage

- [CircleCi](https://www.circleci.com) For The CI
- [Coveralls](https://www.coveralls.io) For The Test Coverage

## Author:

#### Abdden
