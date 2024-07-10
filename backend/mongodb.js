// db.js
const mongoose = require('mongoose');

require('dotenv').config();
require('./model/settings/location/country');
require('./model/settings/location/state');
require('./model/settings/location/city');
require('./model/settings/location/pincode');
require('./model/settings/specification');
require('./model/settings/college');



mongoose
    .connect(process.env.DATABASE_LOCAL)
    .then(() => console.log('DB connected')).catch(err => {
        console.log(err)
        console.log(err.message)
    });



module.exports = mongoose;
