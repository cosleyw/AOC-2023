let add = (a,b) => a.map((v,i)=>v+b[i]);
let equ = (a,b) => a.every((v,i)=>v==b[i]);

let UP = 1, DOWN = 2, LEFT = 4, RIGHT = 8;
let neg = a => {return {1: DOWN, 2: UP, 4: RIGHT, 8: LEFT}[a]};

let pipes = {"|": UP|DOWN, "-": LEFT|RIGHT, "L": UP|RIGHT, "J": UP|LEFT, "7": LEFT|DOWN, "F": DOWN|RIGHT, ".": 0, "S": UP|DOWN|LEFT|RIGHT};

let s = prompt().split("\n").map(v=>v.split(""));
let c = s.map((v,i)=>[v.indexOf("S"), i]).filter(v=>v[0]!=-1)[0];

let dirs = [[0, 1, UP], [1, 0, LEFT], [0, -1, DOWN], [-1, 0, RIGHT]];
let di = {2: [0, 1], 8: [1, 0], 1: [0, -1], 4: [-1, 0]};


let se = dirs.map(v=>{
	let p = add(c, v);
	console.log(p, s[p[1]][p[0]], pipes[s[p[1]][p[0]]], v[2]);
	p[2] = v[2];
	if((pipes[s[p[1]][p[0]]] & v[2]) != 0)
		return p;

	return undefined;
}).filter(v=>v!=undefined);


let ed = se[1];
let pd = neg(se[0][2]);
let st = se[0];
let path = [st];

while(!equ(st, ed)){
	//console.log(pd, st, s[st[1]][st[0]]);
	pd = pipes[s[st[1]][st[0]]] ^ neg(pd);
	st = add(di[pd], st);
	path.push(st);
}

console.log((path.length / 2 | 0) + 1);
