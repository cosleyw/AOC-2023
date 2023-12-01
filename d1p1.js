let s = prompt().split("\n").map(v=>v.match(/[0-9]+/g).join("")).map(v=>+(v[0]+v[v.length-1])).reduce((a,b)=>a+b);
