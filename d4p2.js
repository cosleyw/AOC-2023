let intersect = (a, b) => [...a].filter(v=>b.indexOf(v)!=-1).sort((a,b)=>a-b);
let count = {};
let s = prompt().split("\n").map(v=>v.match(/:[^]+/)[0].slice(1).split("|").map(v=>v.trim().split(/\s+/g).map(v=>+v))).map(([a,b])=>intersect(a,b));

s.map((v,i)=>{
	count[i] = (count[i]??0)+1;
	v.map((v,j)=>count[i+j+1]=(count[i+j+1]??0)+count[i]);
}).reduce((a,b)=>a+b);

Object.keys(count).map(v=>count[v]).reduce((a,b)=>a+b);
