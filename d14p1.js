let p = prompt().split("\n").map(v=>v.split(""));
let load = 0;
p.forEach((v,i)=>v.forEach((v,j)=>{
	if(v=="O"){
		let k = i;
		p[k][j] = ".";
		while(k > 0 && p[k-1][j] == '.')
			k--;
		p[k][j] = "O";

		load += p.length - k;
	}
}));
console.log(p.map(v=>v.join("")).join("\n"))
load
