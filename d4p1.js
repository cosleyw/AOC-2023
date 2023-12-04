let intersect = (a, b) => [...a].filter(v=>b.indexOf(v)!=-1).sort((a,b)=>a-b);
let s = prompt().split("\n").map(v=>v.match(/:[^]+/)[0].slice(1).split("|").map(v=>v.trim().split(/\s+/g).map(v=>+v))).map(([a,b])=>intersect(a,b)).map(v=>2**(v.length-1)|0).reduce((a,b)=>a+b)
