let quad = (a, b, c) => {
	let s = Math.sqrt(b**2 - 4*a*c);
	return [(-b + s)/(2*a), (-b - s)/(2*a)];
}

let held_for = (t, d) => quad(-1, t, -d);

let s = prompt().split("\n").map(v=>v.split(":")[1].trim().split(/\s+/).map(v=>+v));

s[0].map((v,i)=>[v, s[1][i]]).map(v=>held_for(v[0],v[1])).map(v=>[Math.floor(v[0]+1), Math.ceil(v[1]-1)]).map(v=>v[1]-v[0]+1).reduce((a,b)=>a*b, 1);
