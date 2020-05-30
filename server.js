async function f() {

    const axios = require('axios');
    const cheerio = require('cheerio');
    let mongoUtil = require( './mongoUtil' );

    const fs = require('fs');
    const express = require('express')
    const app = express()
    const port = 3005;

    let cilentM = await mongoUtil.connectToServer();
    let db = await mongoUtil.getDb();



    app.get('/asdf', async (req, res) => {
        let s = fs.readFileSync('./e.html') + "";
        res.send(s);
    })
    app.get('/qu', async (req, res) => {
        console.log(req.query);
        if(req.query.rayon != undefined) {
            req.query.rayon = {$regex: ".*"+req.query.rayon+".*"}
            console.log(req.query);
        }
        let dd = await db.collection('adlar3').find(req.query).limit(1000).toArray();
        let data = {d : dd};
        console.log(dd);
        res.send(data);
    })

    app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

}

f();