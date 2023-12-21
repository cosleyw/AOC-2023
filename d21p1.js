let p = prompt().split("\n").map(v=>v.split(""));
let s = p.map((v,i)=>[v.indexOf("S"), i]).filter(v=>v[0]!=-1)[0];

let dists = p.map(v=>v.slice().fill(Infinity));
let queue = [[s, 0]];

let add = (a,b) => a.map((v,i)=>v+b[i]);
let dirs = [[1,0],[-1,0],[0,1],[0,-1]];

let bfs = (q, d) => {
	let [x,y] = q;
	
	if(!p[y]?.[x]||p[y][x]=="#"||dists[y][x]<=d)
		return;

	dists[y][x] = d;
	dirs.forEach(v=>queue.push([add(q,v),d+1]));
}

while(queue.length)
	bfs(...queue.shift());

let count = 0;
let steps = 64;
dists.flat().map(v=>{
	if(v != Infinity)
		if(v <= steps && v % 2 == steps % 2)
			count++;
});

count;
