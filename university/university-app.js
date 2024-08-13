
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const fs = require("fs");

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const httpsOptions = {
    // key: fs.readFileSync("./key.crt"),
    // cert: fs.readFileSync("./cert.crt"),
};




app.prepare().then(() => {
    createServer(httpsOptions, (req, res) => {

        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);


    }).listen(process.env.PORT, (err) => {
        if (err) throw err;
        console.log(`> Frontend started on port ${process.env.PORT}`);
    });
});