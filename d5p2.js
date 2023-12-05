let s = prompt().split("\n\n");
let a = s[0].split(":")[1].trim().match(/[0-9]+ [0-9]+/g).map(v=>v.trim().split(" ").map(v=>+v));
let b = s.slice(1).map(v=>v.trim().split("\n").slice(1).map(v=>v.trim().split(" ").map(v=>+v)));

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

	if(r2[0] + r2[1] >= r1[0] && (r2[0] - r2[0] - r2[1]) < r1[1]){
		let ar =  [[r2[0] + r2[1], Math.max((r1[0]+r1[1]) - (r2[0] + r2[1]), 0)]];
		if(ar[1] > 0)
			return ar;
		return [];
	}

	return r1;
}

a.map(v=>{
	let n = [v];
	let a = [];
	b.forEach(t=>{
		console.log(v, ""+n, t);
		for(let j = 0; j < n.length; j++){
			let done = false;
			k = n[j];
			for(let i = 0; i < t.length; i++){
				let ar = range_and([t[i][1], t[i][2]], k);
				if(ar[1] > 0){
					console.log("test", v, ""+t, ""+k, ""+ar);
					if(ar[1] > 0)
						a.push([ar[0] - t[i][1] + t[i][0], ar[1]]);
					
					let rs = range_sub(k, [t[i][1], t[i][2]]);
					console.log(rs);
					n.push(...rs);
					done = true;
					break;
				}
			}
			if(!done)
				a.push(k);
		}
		n = a;
		a = [];
	});
	return n;
}).reduce((a,b)=>[...a,...b],[]).filter(v=>v[1]>0).reduce((a,b)=>a[0]<b[0]?a:b)
