<p align="center">
    <a href="https://github.com/devshred/gps-tools-frontend/actions/workflows/release.yaml" alt="Release Pipeline">
        <img src="https://github.com/devshred/gps-tools-frontend/actions/workflows/release.yaml/badge.svg" /></a>
</p>

# Frontend of GPS-Tools based on React and Leaflet
This is the frontend of [GPS-Tools Backend](https://github.com/devshred/gps-tools-backend). It provides some useful features for dealing with GPS files:
* Merging files
* Converting between formats (FIT, GPX, TCX, GeoJSON)
* Visualizing GPS-files
* Adding, changing and removing waypoints
* Optimization of waypoints to improve performance on GPS-devices

## Production
The prod website is hosted by [Cloudflare](https://www.cloudflare.com/) at: https://gps-tools.pages.dev/ 

## How-to run
### … with mocks for development and tests
While running in develoment mode, all APIs (GPS-Tools-backend, tile-server, photon) are mocked with [Mock Service Worker](https://mswjs.io/).
```sh
npm run dev
```
Open http://localhost:5173/

### … locally with all external APIs
Start the GPT-Tool-backend
```sh
docker run -p 7001:7001 devshred/gps-tools-backend
```

Create the file `.env.local` and add the URL of the backend-API:
```sh
VITE_BACKEND_BASE_URL=http://localhost:7001/api/v1
```
Build and start the application
```sh
npm run build
npm run preview
```

Open http://localhost:4173/

## Release process
This project is using [semantic versioning](https://semver.org/) and [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/). It's recommended to use [Commitizen](https://commitizen-tools.github.io/commitizen/) to commit changes.

Codequality will be checked by [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/). To use these tools, automatically fix problems and execute the tests, run
```sh
npm run check:fix
```
_See [package.json](./package.json) for more options on using these tools._

As soon as code has been pushed to the main branch, a [GitHub Actions workflow](.github/workflows/release.yaml) checks for fixes or new features and, if necessary, creates a new tag and a new release. Every new release [triggers the deployment](.github/workflows/deploy.yaml) to Cloudflare.

## End-to-end tests
The e2e tests are based on [Playwright](https://playwright.dev/) and [Axe](https://www.deque.com/axe/) to check for accessibility of content and functionality. You can run these tests by
```sh
npm run test:e2e
```
