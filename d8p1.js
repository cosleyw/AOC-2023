let s = prompt().split(/\n+/g);
let a = s.splice(0, 1)[0];
let graph = {};
s.map(v=>v.match(/[A-Z]+/g)).forEach(v=>graph[v[0]] = v.slice(1));

let c = "AAA", i = 0;
while(c != "ZZZ"){
	if(a[i++ % a.length] == "R")
		c = graph[c][1];
	else
		c = graph[c][0];
}
i
