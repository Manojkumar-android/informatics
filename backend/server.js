const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

require('./mongodb')
// app
const app = express();


const allowedOrigins = [
    process.env.ADMIN_URL,
    process.env.UNIVERSITY_URL,

];

app.use(cors({
    origin: function (origin, callback) {
        // If origin is not provided (e.g., a direct server request), allow it
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true  // Enable credentials (cookies, authorization headers, etc.)
}));

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const admin = require('./route/admin/adminRotute');
const resourceRoute = require('./route/admin/resourceRoute');
const universityRoute = require('./route/university/route');


app.use('/api/admin', admin);
app.use('/api/admin/resource', resourceRoute);
app.use('/api/university', universityRoute);

app.use('/public', express.static('public'));
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});