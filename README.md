Scripts
Install: npm install
Build: npm run build
Lint: npm run lint
Prettify: npm run prettify
Run unit tests: npm run test
Start server: npm run start

Usage
The server will listen on port 3000:

Expected query arguments are:

filename: Available filenames are:
argentina
width: require
height: require

Example 1: http://localhost:3000/api/images?filename=argentina&width=200&height=200 Will scale the argentina image to 200 by 200 pixels and store the resulting image.
Example 1: http://localhost:3000/api/images?filename=argentina Will return url wrong