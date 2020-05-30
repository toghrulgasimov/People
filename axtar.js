async  function f() {
    let fs = require('fs');

    let mongoUtil = require( './mongoUtil' );
    let cilentM = await mongoUtil.connectToServer();
    let db = await mongoUtil.getDb();


    let o = {unvan:"48.ci.meh..qacqinlar.binasi..ev.1", ata:"idris"};
    let ans = await db.collection("adlar").find(o).toArray();
    console.log(ans);
}

f();