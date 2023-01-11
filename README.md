![MY_BRAND_API](https://user-images.githubusercontent.com/113042334/211926619-8c8fe31d-bec5-4f54-ab2e-b1a7702784d4.png)

[![CircleCI](https://dl.circleci.com/status-badge/img/gh/Abdden/bcp/tree/supreme.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/Abdden/bcp/tree/supreme)

[![Coverage Status](https://coveralls.io/repos/github/Abdden/bcp/badge.svg?branch=supreme)](https://coveralls.io/github/Abdden/bcp?branch=supreme)

[![CircleCI](https://dl.circleci.com/insights-snapshot/gh/Abdden/bcp/supreme/workflow/badge.svg?window=30d)](https://app.circleci.com/insights/github/Abdden/bcp/workflows/workflow/overview?branch=supreme&reporting-window=last-30-days&insights-snapshot=true)

> Description

## My Brand BackEnd Server App & DataBase Connection

## My Brand UI Template Is Hosted [here](https://abdden.github.io/my-brand/) On Gh-Pages.

## My Brand API Endpoints Are Hosted On [Cyclic.sh](https://).

### Available API Endpoints

| HTTP Request | Endpoint            | Description                    |
| :----------- | :------------------ | :----------------------------- |
| GET          | /api-docs           | Link To The Documentation      |
| POST         | /signup/admin       | User Create An Admin Account   |
| POST         | /signup             | User Create An Account         |
| GET          | /signup             | Admin Gets All Signed Up Users |
| POST         | /login              | User Logs In                   |
| GET          | /contacts           | Admin Gets All Queries         |
| POST         | /contact            | User Creates Query             |
| DELETE       | /contact/:id        | Admin Deletes Query            |
| GET          | /blogs              | User Gets All Blogs            |
| GET          | /blogs/:id          | User Gets Single Blog          |
| GET          | /blogs/:id/comments | User Gets All Comments On Blog |
| POST         | /blogs              | Admin Creates Blog             |
| POST         | /blogs/:id/comments | User Comments On Blog          |
| POST         | /blogs/:id/stats    | User Likes Or Unlikes Blog     |
| PUT          | /blogs/:id          | Admin Updates Blog             |
| DELETE       | /blogs/:id          | Admin Deletes Blog             |

## To Install The App

```sh
$ git clone https://github.com/Abdden/bcp.git
$ cd bcp
$ npm install
```

## To Run The App

```sh
$ npm run dev
```

## To Run The Test

```sh
$ npm run test
```

## Tools And Technologies Used For The App

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
