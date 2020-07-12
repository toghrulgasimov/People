const fs = require('fs');

let  s = fs.readFileSync('./yerler') + "";

// preprocessing
//simple push
let a = s.split('\n');
console.log("let rayonlar = {}")
for(let i = 0; i < a.length; i++) {
    let ind1 = a[i].indexOf("\">") + 2;
    let ind2 = a[i].indexOf("SECKI DAIRESI");
    let f1 = a[i].substring(ind1, ind2);
    let tin = f1.indexOf(' ');
    let say = f1.substring(0, tin);
    let r = f1.substring(tin + 1,f1.length-1);
    console.log("rayonlar[\""+say+"\"]=\""+r+"\"");
}