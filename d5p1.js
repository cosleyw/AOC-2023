let s = prompt().split("\n\n");
let a = s[0].split(":")[1].trim().split(" ").map(v=>+v);
let b = s.slice(1).map(v=>v.trim().split("\n").slice(1).map(v=>v.trim().split(" ").map(v=>+v)));

a.map(v=>{
	let n = v;
	b.map(t=>{
		console.log(v, n);
		let i = 0;
		for(; i < t.length; i++){
			if(t[i][1] <= n && (n - t[i][1]) <= t[i][2]){	
				n = n - t[i][1] + t[i][0];
				break;
			}
		}
	});
	return n;
}).reduce((a,b)=>Math.min(a,b));
