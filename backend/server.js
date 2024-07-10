const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const routeMappings = require('./api_routes');

require('./mongodb')
// app
const app = express();



// // Dynamically load routes for each base path and mount them to their respective base paths
// Object.entries(routeMappings).forEach(([basePath, { routes, directory }]) => {
//     routes.forEach(routeName => {
//         const route = require(path.join(__dirname, directory, routeName));
//         app.use(basePath, route);
//     });
// });
const corsOptions = {
    origin: process.env.CLIENT_URL,
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions));

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const locations = require('./route/settings/location');
const specification = require('./route/settings/specification');
const college = require('./route/settings/college');

app.use('/api/settings/location', locations);
app.use('/api/settings/specification', specification);
app.use('/api/settings/college', college);

app.use('/public', express.static('public'));
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});