let w = prompt().split("\n").map(v=>v.split(""))
let q = w.map(v=>v.map(v=>0));

let add = (a,b) => a.map((v,i)=>v+b[i]);
let rl = ([x, y]) => [-y, x];
let rr = ([x, y]) => [y, -x];

let bounce = (p, d) => {
	if(p[0] < 0 || p[0] >= w[0].length || p[1] < 0 || p[1] >= w.length)
		return;
	let c = w[p[1]][p[0]];

	let qi = 1 * (d[0] == 1) + 2 * (d[0] == -1)
					+ 4 * (d[1] == 1) + 8 * (d[1] == -1);
	if(q[p[1]][p[0]] & qi)
		return;

	q[p[1]][p[0]] |= qi;

	switch(c){
		case "-":
			if(d[1] != 0){
				bounce(add(p, rl(d)), rl(d));
				bounce(add(p, rr(d)), rr(d));
			}else{	
				bounce(add(p, d), d);
			}
			break;
		case "|":
			if(d[0] != 0){
				bounce(add(p, rl(d)), rl(d));
				bounce(add(p, rr(d)), rr(d));
			}else{	
				bounce(add(p, d), d);
			}
			break;
		case "/":
			if(d[0] != 0)
				d = rr(d);
			else
				d = rl(d);
			
			bounce(add(p, d), d);
			break;
		case "\\":
			if(d[0] != 0)
				d = rl(d);
			else
				d = rr(d);
			bounce(add(p, d), d);
			break;
		default:
			bounce(add(p, d), d);
			break;
	}
}

let run = (p, d) => {
	q = w.map(v=>v.map(v=>0))
	bounce(p, d);
	return q.flat().map(v=>+!!v).reduce((a,b)=>a+b);
}

let mx = 0;
for(let i = 0; i < w.length; i++){
	mx = Math.max(mx, run([0, i], [1, 0]));
	mx = Math.max(mx, run([w[0].length-1, i], [-1, 0]));
}
for(let i = 0; i < w[0].length; i++){
	mx = Math.max(mx, run([i, 0], [0, 1]));
	mx = Math.max(mx, run([i, w.length-1], [0, -1]));
}

mx
