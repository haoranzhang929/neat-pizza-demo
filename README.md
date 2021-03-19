# Description

This is a full-stack project template using React + Express.js.

- This project is coded using `Typescript`.
- Frontend side of the app is using `React`

  - All reusable UI components and UI tests for each component are inside `client/src/components` directory.

  - `client/src/common` directory is created for all reusable `enums`, `constants` and `interfaces`
  - `client/src/service` are created to store reusable service function (fetch request in this case)
  - `client/src/utils` are created to store reusable utils function

* Backend side of the app is using `Express.js`

  - local backend server runs on http://localhost:8000

* Both frontend and backend code are checked by `eslint`, `prettier`, `typescript` and `UI tests` before running or building

### Technologies used:

#### Frontend

- React
- Material UI

#### Backend

- Express.js

#### Other Technologies

- Eslint
- Prettier
- @testing-library/react

# Setup

\*Please switch to **node v14.15.1 or later** and **npm v6.11.3 or later** before runnig following command.

To Install required npm deps for the app to run

```
npm run iall
```

### Run both forntend and backend app

```bash
npm run dev
```

## UI tests

```bash
npm test
```
