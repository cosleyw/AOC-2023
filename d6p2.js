let quad = (a, b, c) => {
	let s = Math.sqrt(b**2 - 4*a*c);
	return [(-b + s)/(2*a), (-b - s)/(2*a)];
}

let held_for = (t, d) => quad(-1, t, -d);

let s = prompt().split("\n").map(v=>+v.split(":")[1].trim().replace(/\s+/g, ""));
let k = held_for(s[0], s[1]);
Math.ceil(k[1]-1) - Math.floor(k[0]+1) + 1;

