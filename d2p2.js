let s = prompt().split("\n").map(v=>v.split(":")).map(v=>[+v[0].match(/[0-9]+/)[0],v[1].split(";").map(v=>v.split(",").map(v=>v.trim().split(" ")).map(v=>[+v[0], v[1]]))]).map(v=>{
	let blocks = {red: 0, green: 0, blue: 0};
	v[1].forEach(v=>v.map(v=>blocks[v[1]] = Math.max(blocks[v[1]], v[0])));
	return blocks.red * blocks.green * blocks.blue;
}).reduce((a,b)=>a+b);

