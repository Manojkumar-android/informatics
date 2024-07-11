// db.js
const mongoose = require('mongoose');

require('dotenv').config();
require('./model/admin/adminModel');



mongoose
    .connect(process.env.DATABASE_LOCAL)
    .then(() => console.log('DB connected')).catch(err => {
        console.log(err)
        console.log(err.message)
    });



module.exports = mongoose;
