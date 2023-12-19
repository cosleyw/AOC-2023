let [w, p] = prompt().split("\n\n");

let range_and = (r1, r2) => {
	if(r1[0] > r2[0]){
		let t = r1;
		r1 = r2;
		r2 = t;
	}
	
	if((r2[0] - r1[0]) < r1[1])
		return [r2[0], Math.min(r1[1] - (r2[0] - r1[0]), r2[1])];
	
	return [0, -1];
}

let range_sub = (r1, r2) => {
	if(r2[0] >= r1[0] && (r2[0] - r1[0]) < r1[1]){
		let a1 = [r1[0], r2[0] - r1[0]];
		let a2 = [r2[0] + r2[1], r1[0] + r1[1] - (r2[0] + r2[1])];

		if(a2[1] > 0)
			return [a1, a2];
		return [a1];
	}

	if(r2[0] + r2[1] >= r1[0] && r2[0] < r1[0]){
		let ar =  [r2[0]+r2[1], r1[0]+r1[1] - (r2[0]+r2[1])];
		if(ar[1] > 0)
			return [ar];
		return [];
	}

	return [r1];
}

let wo = {};
w.split("\n").forEach(v=>{
	let [n, w] = v.split("{");
	w = w.slice(0, -1).split(",").map(v=>v.split(":"))
		.map(v=>[v[0].split(/(\<|\>)/),v[1]]);

	wo[n] = w;
});

let stack = [{x: [1, 4000], m: [1, 4000], a: [1, 4000], s: [1, 4000], w: "in"}];
let passing = 0;
k: while(stack.length){
	let q = stack.pop();
	let {x,m,a,s,w} = q;

	if([x,m,a,s].some(v=>v[1]<=0) || w == "R")
		continue;
	if(w == "A"){
		passing += [x,m,a,s].map(v=>v[1]).reduce((a,b)=>a*b);
		continue;
	}

	w = wo[w];

	let fragments = [q];
	for(let i = 0; i < w.length-1; i++){
		let nf = [];
		console.log(fragments, w[i], stack);
		fragments.map(fr=>{
			let nx = w[i][1];
			let q = w[i][0][0];
			let n = +w[i][0][2];

			let rn = [1, 3999];
			switch(w[i][0][1]){
				case "<":
					rn = [1, n-1];
					break;
				case ">":
					rn = [n+1, 4000];
					break;
			}

			let k = {...fr};
			k.w = nx;
			k[q] = range_and(fr[q], rn);
			stack.push(k);

			let rs = range_sub(fr[q], rn)
			console.log(fr[q], rn, rs);	
			rs.forEach(v=>{
				let k = {...fr};
				k[q] = v;
				nf.push(k);
			});
		});
		fragments = nf;
	}

	console.log("\n");
	fragments.forEach(v=>{
		v.w = w[w.length-1][0];
		stack.push(v);
	});
}
passing
