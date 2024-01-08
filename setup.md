# Set-up
This project was set up as follows

```sh
npm create vite@latest gpx-tools-frontend -- --template react
cd gpx-tools-frontend
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
# configure as described here: https://tailwindcss.com/docs/guides/vite
npm i -D daisyui@latest
npm install axios
npm install --save react-dropzone
npm i react-router-dom react-icons
npm install @hello-pangea/dnd --save
```