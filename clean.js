const axios = require('axios');
const cheerio = require('cheerio');
let mongoUtil = require( './mongoUtil' );


(async () => {

    let cilentM = await mongoUtil.connectToServer();
    let db = await mongoUtil.getDb();

    let index = 0;
    let k = db.collection('adlar2').find({});
    let S = new Set();
    let cnt = await k.count();
    console.log(cnt);
    k.forEach(async function (d) {
        index++;
        delete d._id;
        S.add(JSON.stringify(d));
        if(index % 100000 == 0) {
            console.log(S.size);
        }
        if(index == cnt-1) {
            console.log('--------Bang' + S.size);
            let index2 = 0;
            let ans = [];
            for(let x of S.values()) {
                index2++;
                x = x.split("İ").join('i');
                x = x.split("İ").join('i');
                x = x.split("Ə").join('e');
                x = x.split("Ö").join('o');
                x = x.split("Ğ").join('g');
                x = x.split("Ç").join('c');
                x = x.split("Ş").join('s');
                x = x.split("Ü").join('u');
                x = x.split("I").join('i');
                x = x.toLowerCase();
                let o = JSON.parse(x);
                ans.push(o);
                if(index2 % 10000 == 0) {
                    console.log(o);
                    await db.collection("adlar3").insertMany(ans);
                    ans = [];
                }
                //console.log(x);
            }
            await db.collection("adlar3").insertMany(ans);
            ans = [];
            console.log("DONE");
        }
    })
})();