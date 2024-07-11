const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

require('./mongodb')
// app
const app = express();


app.use(cors({
    origin: 'http://localhost:3000',  // Allow requests from localhost:3000
    credentials: true,  // Enable credentials (cookies, authorization headers, etc.)
}));

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const admin = require('./route/admin/adminRotute');


app.use('/api/admin', admin);

app.use('/public', express.static('public'));
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});