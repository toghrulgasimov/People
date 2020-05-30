const axios = require('axios');
const cheerio = require('cheerio');
let mongoUtil = require( './mongoUtil' );


(async () => {

    let cilentM = await mongoUtil.connectToServer();
    let db = await mongoUtil.getDb();

    function f(e) {
        return new Promise(r=>{
            e.each(function( index ) {
                let s = $( this ).children().eq(1).text();
                let ms = $( this ).children().eq(2).text();
                let n = $( this ).children().eq(3).text();
                let adres = $( this ).children().eq(4).text();
                let te = $( this ).children().eq(5).text();

                let d = {s:s, ms:ms, n:n,adres:adres,te:te};
                let ar = d.n.split(' ');
                if(ar.length == 0) {
                    d.soyad = "y";
                }else {
                    d.soyad = ar[0]
                }
                if(ar.length >= 2) {
                    d.ad = ar[1]
                }else {
                    d.ad = "y";
                }
                if(ar.length >= 3) {
                    d.ata = ar[2]
                }else {
                    d.ata = "y";
                }
                da.push(d);
                //console.log( index + ": " + JSON.stringify(d) );
                if(index == e.length - 1) {
                    console.log("----------------------------")
                    r('resolved');
                }
            });
        })

    }
    var da = [];
    var $;
    for(let s = 1; s <= 125; s++ ){


        for(let j = 1; j <= 100; j++ ){
            try {
                const response = await axios.get('https://www.infocenter.gov.az/page/voters/?s='+s+'&sm='+j, {rejectUnauthorized: false,})
                console.log("downloaded");
                let st = response.data + "";
                if(st.indexOf("Məlumat tapılmadı.") != -1) {
                    console.log("Sona geldi--------------------------------");
                    break;
                }
                $ = cheerio.load(st);
                await f($('#ctl00_HolderBody_GridSecici tr'));
                console.log("salam");
                if(da.length >= 5000) {
                    console.log(s + "--" + j);
                    await db.collection("adlar2").insertMany(da);

                    da = [];
                }

            } catch (error) {
                j--;
                console.log(s + "---" + j);
            }
        }

    }
    if(da.length >= 0) {
        console.log("Done");
        await db.collection("adlar2").insertMany(da);

        da = [];
    }

})();