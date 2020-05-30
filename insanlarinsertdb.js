async  function f() {
    let fs = require('fs');

    let mongoUtil = require( './mongoUtil' );
    let cilentM = await mongoUtil.connectToServer();
    let db = await mongoUtil.getDb();


    let s = fs.readFileSync("./ans.csv") + "";

    let a = s.split('\n');
    let ans = [];
    let p = a[0].split(",");
    console.log(p);
    for(let i = 1; i < a.length; i++) {
        let t = a[i].split(",");
        let  o = {};
        for(let j = 1; j < p.length; j++) {
            o[p[j]] = t[j];
        }
        //console.log(o);
        ans.push(o)
        if(ans.length > 1000) {
            console.log(i);
            await db.collection("adlar").insertMany(ans);
            ans = [];
        }
    }
    await db.collection("adlar").insertMany(ans);
    console.log(a.length);
}

f();