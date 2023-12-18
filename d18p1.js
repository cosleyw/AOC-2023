let dirs = {'U': [0, -1], 'R': [1, 0], 'D': [0, 1], 'L': [-1, 0]};
let mul = (a, b) => a.map(v=>v*b);
let add = (a, b) => a.map((v,i)=>v+b[i]);
let dot = (a, b) => a.map((v,i)=>v*b[i]).reduce((a,b)=>a+b);
let sub = (a, b) => add(a, mul(b, -1));

let p = prompt().split("\n").map(v=>v.split(" ")).map(v=>[dirs[v[0]],+v[1],v[2]]);

let lb = [0, 0];
let ub = [0, 0];
let rb = [0, 0];
let db = [0, 0];

p.map(v=>mul(v[0], v[1])).reduce((a,b)=>{
	let p = add(a, b);
	if(dot(p, dirs['U']) > dot(ub, dirs['U']))
		ub = p;
	if(dot(p, dirs['D']) > dot(db, dirs['D']))
		db = p;
	if(dot(p, dirs['L']) > dot(lb, dirs['L']))
		lb = p;
	if(dot(p, dirs['R']) > dot(rb, dirs['R']))
		rb = p;
		
	return p;
},[0, 0]);

let pos = mul([lb[0]-10, ub[1]-10], -1);
let wh = sub([rb[0]+10, db[1]+10], [lb[0]-10, ub[1]-10]);

let map = Array(wh[1]).fill(0).map(v=>Array(wh[0]).fill("."));

map[pos[1]][pos[0]] = '#';
p.forEach(([d,n,c])=>{
	while(n){
		pos = add(pos, d);
		map[pos[1]][pos[0]] = '#';
		n--;
	}
});

let rot90 = ([a,b]) => [-b, a];
let equ = (a,b) => a.every((v,i)=>v==b[i]);

let fill = (p, q) => {
	let queue = [p];
	let dirs = [[1, 0],[-1, 0],[0, -1],[0, 1]];

	while(queue.length != 0){
		let p = queue.pop();
		if(p[0] >= 0 && p[0] < map[0].length && p[1] >= 0 && p[1] < map.length){
			let k = map[p[1]][p[0]];
			if(k != "#" && k != q){
				map[p[1]][p[0]] = q;
				dirs.forEach(v=>queue.push(add(p, v)));
			}
		}
	}
}

fill([0, 0], 'Q');
map.map(v=>v.filter(v=>v=='.'||v=='#').length).reduce((a,b)=>a+b);

