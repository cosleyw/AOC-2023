let hash = s => {
	let h = 0;
	for(let i = 0; i < s.length; i++){
		h += s.charCodeAt(i);
		h *= 17;
		h %= 256;
	}
	return h;
}

let boxes = Array(256).fill(0).map(v=>{return {}});
let p = prompt().trim().split(",").map(v=>{
	let t = v.match(/(-|=)/)[0];
	return [t, v.split(t)];
}).forEach(([t, [l, f]])=>{
	let h = hash(l);
	switch(t){
		case "=":
			boxes[h][l] = +f;
		break;
		case "-":
			delete boxes[h][l];
		break;
	}
});

boxes.map((v, i)=>{
	let sm = 0;
	let ind = Object.keys(v);
	ind.forEach((k, j)=>sm+=(i+1)*(j+1)*v[k]);
	
	return sm;
}).reduce((a,b)=>a+b);
