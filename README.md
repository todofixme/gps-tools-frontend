<p align="center">
    <a href="https://github.com/devshred/gps-tools-frontend/actions/workflows/release.yaml" alt="Release Pipeline">
        <img src="https://github.com/devshred/gps-tools-frontend/actions/workflows/release.yaml/badge.svg" /></a>
</p>

# Frontend of GPS-Tools based on React and Leaflet
This is the frontend of [GPS-Tools Backend](https://github.com/devshred/gps-tools-backend). It provides some useful features for dealing with GPS files:
* Merging files
* Converting between formats (FIT, GPX, TCX)
* Visualizing GPS-files
* Adding, changing and removing waypoints

# Production
[GPS-Tools](https://gps-tools.pages.dev/)

# How-to start locally
## start backend
```sh
docker run -p 7001:7001 devshred/gps-tools-backend
```
## start frontend
Create the file `.env.local` and add URL of backend-API:
```sh
VITE_BACKEND_BASE_URL=http://localhost:7001/api/v1
```
Start development server
```sh
npm run dev
```

Open http://localhost:5173/
