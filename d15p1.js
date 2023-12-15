let hash = s => {
	let h = 0;
	for(let i = 0; i < s.length; i++){
		h += s.charCodeAt(i);
		h *= 17;
		h %= 256;
	}
	return h;
}

let p = prompt().trim().split(",").map(hash).reduce((a,b)=>a+b);
