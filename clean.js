const axios = require('axios');
const cheerio = require('cheerio');
let mongoUtil = require( './mongoUtil' );


(async () => {

    let cilentM = await mongoUtil.connectToServer();
    let db = await mongoUtil.getDb();

    let index = 0;

    for(let i = 1848; i <= 2020; i++) {
        let r = await db.collection("adlar3").updateMany({te:i+""}, {$set:{te:i}});
        //console.log(r);
        console.log(i);
    }
    console.log("DONEEEEE");
})();