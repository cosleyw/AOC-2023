let diffs = v => Array(v.length-1).fill(0).map((q,i)=>v[i+1]-v[i]);

let next = v => {
	let k = [v];
	while(!k[k.length-1].every(v=>v==0))
		k.push(diffs(k[k.length-1]));

	let r = 0;
	for(let i = k.length-1; i > 0; i--)
		r = k[i-1][0] - r;

	return r;
}

prompt().split("\n").map(v=>v.split(" ").map(v=>+v)).map(v=>next(v)).reduce((a,b)=>a+b,0);
