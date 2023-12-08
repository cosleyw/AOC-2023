let gcd = (m, n) => m == 0 || n == 0 ? m + n : gcd(n, m % n);
let lcm = (m, n) => m * (n / gcd(m, n));
let s = prompt().split(/\n+/g);
let a = s.splice(0, 1)[0];
let graph = {};
s.map(v=>v.match(/[A-Z]+/g)).forEach(v=>graph[v[0]] = v.slice(1));

let pathLen = (c) => {
	let i = 0;
	while(c[2] != "Z"){
		if(a[i++ % a.length] == "R")
			c = graph[c][1];
		else
			c = graph[c][0];
	}
	return i;
}

let sp = s.map(v=>v.match(/[A-Z]+/)[0]).filter(v=>v[2]=="A").map(pathLen).reduce((a, b)=>lcm(a, b), 1);
