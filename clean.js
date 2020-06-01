const axios = require('axios');
const cheerio = require('cheerio');
let mongoUtil = require( './mongoUtil' );


(async () => {

    let cilentM = await mongoUtil.connectToServer();
    let db = await mongoUtil.getDb();

    let index = 0;
    let k = db.collection('adlar3').find({});

    for(let i = 1800; i <= 2020; i++) {
        let r = await db.collection("adlar2").updateMany({te:i+""}, {$set:{te:i}});
        console.log(r);
        console.log(i);
    }
    console.log("DONEEEEE");
})();