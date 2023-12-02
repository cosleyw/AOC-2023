let blocks = {"red": 12, "green": 13, "blue": 14};

let s = prompt().split("\n").map(v=>v.split(":")).map(v=>[+v[0].match(/[0-9]+/)[0],v[1].split(";").map(v=>v.split(",").map(v=>v.trim().split(" ")).map(v=>[+v[0], v[1]]))]).filter(v=>v[1].map(v=>v.map(v=>v[0] <= blocks[v[1]]).reduce((a,b)=>a&&b)).reduce((a,b)=>a&&b)).map(v=>v[0]).reduce((a,b)=>a+b);
