let p = prompt().split("\n").map(v=>v.split(""));
let load = 0;

let seq = [];
let next = () => {
	//tilt north
	for(let i = 0; i < p.length; i++){
		for(let j = 0; j < p[i].length; j++){
			if(p[i][j]=="O"){
				let k = i;
				p[k][j] = ".";
				while(k > 0 && p[k-1][j] == '.')
					k--;
				p[k][j] = "O";
			}
		}
	};
	
	//tilt west
	for(let i = 0; i < p.length; i++){
		for(let j = 0; j < p[i].length; j++){
			if(p[i][j]=="O"){
				let k = j;
				p[i][k] = ".";
				while(k > 0 && p[i][k-1] == '.')
					k--;
				p[i][k] = "O";
			}
		}
	};
	
	//tilt south
	for(let i = p.length-1; i >= 0; i--){
		for(let j = 0; j < p[i].length; j++){
			if(p[i][j]=="O"){
				let k = i;
				p[k][j] = ".";
				while(k < p.length-1 && p[k+1][j] == '.')
					k++;
				p[k][j] = "O";
			}
		}
	};
	
	//tilt east
	for(let i = 0; i < p.length; i++){
		for(let j = p[i].length-1; j >= 0; j--){
			if(p[i][j]=="O"){
				let k = j;
				p[i][k] = ".";
				while(k < p[i].length-1 && p[i][k+1] == '.')
					k++;
				p[i][k] = "O";
			}
		}
	};

	seq.push(p.map(v=>[...v]));
}

let getLoad = (p) => {
	load = 0;
	p.forEach((v,i)=>v.forEach(v=>{
		if(v == 'O')
			load+=p.length-i;
	}));
	return load;
}

let t = 1;
let h = 2;
for(let i = 0; i < 3; i++)
	next();

while(!seq[t].every((v,i)=>v.every((v,j)=>v==seq[h][i][j]))){
	t += 1;
	h += 2;
	
	while(h >= seq.length)
		next();
}

let mu = 0;
t = 0;
while(!seq[t].every((v,i)=>v.every((v,j)=>v==seq[h][i][j]))){
	t += 1;
	h += 1;
	mu++;
	
	while(h >= seq.length)
		next();
}

let lam = 1;
h = t+1;
while(!seq[t].every((v,i)=>v.every((v,j)=>v==seq[h][i][j]))){
	h++;
	lam++;
}

console.log(mu, lam, getLoad(seq[mu+(1000000000-1-mu)%lam]));
