# Space Travel :rocket:

> Responsive web application

The app allows users to buy a one-way ticket to a Planet in the Solar System in a situation when the environment on Earth is not livable anymore (the tickets can’t be used, yet). Customers can check the air quality in their location to make an informed decision about this important matter.

## Prerequisites

Docker, docker-compose, node, yarn.

Install client dependencies in the root directory:

```bash
yarn install
```

Install server dependencies in the `server` directory:

```bash
yarn install
```

## Auth secrets

In `server` directory create a `.env` file:

```bash
NODE_PATH=src
PRISMA_SECRET=your-prisma-secret
APP_SECRET=your-app-secret
```

> Find more about the secrets in [Prisma docs.](<https://www.prisma.io/docs/reference/service-configuration/prisma.yml/yaml-structure-ufeshusai8/#secret-(optional)>)

## API keys

In project root create a `.env` file:

```bash
NODE_PATH=src
REACT_APP_PRISMA_SECRET=your-prisma-secret
REACT_APP_AUTH_TOKEN=your-auth-secret
REACT_APP_AQICN_API_KEY=your-aqicn-api-key
REACT_APP_MAPBOX_API_KEY=your-mapbox-api-key
```

Get your AQICN API key [here.](https://aqicn.org/data-platform/token/)

Get your Mapbox API token following [this guide.](https://www.mapbox.com/help/how-access-tokens-work/#creating-and-managing-access-tokens)

## Server

### Setup

In `server` directory, run:

```bash
docker-compose up -d
```

Then deploy the Prisma service:

```bash
yarn prisma deploy
```

#### Development

To start development server, run:

```bash
yarn dev
```

#### Production

To start production server, run:

```bash
yarn start
```

## Client

#### Development

In the project root directory, run:

```sh
yarn start
```

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

#### Production

```sh
yarn build
```

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!
