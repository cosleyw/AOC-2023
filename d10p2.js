let add = (a,b) => a.map((v,i)=>v+b[i]);
let sub = (a,b) => a.map((v,i)=>v-b[i]);
let rot90 = ([a,b]) => [-b, a];
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
let path = [c, st];

while(!equ(st, ed)){
	//console.log(pd, st, s[st[1]][st[0]]);
	pd = pipes[s[st[1]][st[0]]] ^ neg(pd);
	st = add(di[pd], st);
	path.push(st);
}

let ins = 0;
let fill = (p, q) => {
	if(p[0] >= 0 && p[0] < s[0].length && p[1] >= 0 && p[1] < s.length){
		let k = s[p[1]][p[0]];
		if(k != "B" && k != q){
			s[p[1]][p[0]] = q;
			ins++;

			dirs.forEach(v=>fill(add(p, v), q));
		}
	}
}

path.forEach(v=>s[v[1]][v[0]] = "B");

for(let i = 1; i < path.length-1; i++){
	let d = sub(path[i], path[i-1]);
	let d2 = sub(path[i+1], path[i]);
	//catches most of it
	let o = rot90(d);
	let o2 = rot90(d2);
	
	fill(add(path[i], o), "O");
	fill(add(path[i], o2), "O");

	let o3 = add(o, o2);
	if(o3[0]**2 + o3[1]**2 == 1)
		fill(add(path[i], o3), "O");
	
}
console.log(ins);

console.log(s.map(v=>v.join("")).join("\n"));
