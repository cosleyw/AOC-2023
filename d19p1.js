let [w, p] = prompt().split("\n\n");

let wo = {};
w.split("\n").forEach(v=>{
	let [n, w] = v.split("{");
	w = w.slice(0, -1).split(",").map(v=>v.split(":"));

	wo[n] = w;
});

p = p.split("\n").map(v=>{
	let x,m,a,s,w="in";
	eval(v);
	return {x,m,a,s,w};
});

let t = 0;
k: while(p.length){
	let {x,m,a,s,w} = p.pop();

	if(w == "A"){
		t += x+m+a+s;
		continue;
	}

	if(w == "R")
		continue;
	
	w = wo[w];
	
	for(let i = 0; i < w.length-1; i++){
		if(eval(w[i][0])){
			p.push({x,m,a,s,w:w[i][1]});
			continue k;
		}
	}

	p.push({x,m,a,s,w:w[w.length-1][0]});
}`
