let m = prompt().split("\n").map(v=>v.split("").map(v=>+v));

let rl = ([x, y]) => [-y, x];
let rr = ([x, y]) => [y, -x];

let add = (a, b) => a.map((v, i)=>v+b[i]);
let same = (a, b) => a.every((v, i)=>v==b[i]);

let randRange = n => Math.random() * n | 0;

let dirNum = d => {
	if(same(d, [-1, 0]))
		return 0;
	if(same(d, [1, 0]))
		return 1;
	if(same(d, [0, -1]))
		return 2;
	if(same(d, [0, 1]))
		return 3;
}

let dists = Array(12).fill(0).map(
	v=>Array(m.length).fill(0).map((v,i)=>Array(m[0].length).fill(0).map((v,j)=>2*((i+j)*9 + 5*9)))
);

let queue = [];
let bfs = (p, d, c, l) => {
	p = add(p, d);
	if(p[0] < 0 || p[0] >= m[0].length || p[1] < 0 || p[1] >= m.length)
		return;

	l += m[p[1]][p[0]];
	if(dists[dirNum(d) + 4*c][p[1]][p[0]] <= l)
		return;

	dists[dirNum(d) + 4*c][p[1]][p[0]] = l;
	
	queue.push(
		[p,rl(d),2,l],
		[p,rr(d),2,l]);

	if(c > 0)
		queue.push(
			[p,d,c-1,l]);
}
queue = [[[0, 0], [1, 0], 2, 0],[[0, 0], [0, 1], 2, 0]];
while(queue.length){
	bfs(...queue.pop());
}
let mindists = dists.reduce((a,b)=>a.map((v,i)=>v.map((v,j)=>Math.min(v, b[i][j]))));

mindists
