let s = prompt().split("\n").map(v=>v.split(" ")).map(v=>[v[0].split(""), v[1].split(",").map(v=>+v)]);

let test = (s, a) => {
	let i = 0;
	for(let k = 0; k < a.length; k++){
		while(s[i] == ".")
			i++;

		for(let j = 0; j < a[k]; j++)
			if(s[i++] != "#")
				return false;

		if(s[i] == "#")
			return false;
	}
	while(s[i] == ".")
		i++;

	return i >= s.length;
}

let solve = (s, a) => {
	let q = s.map((v,i)=>[v,i]).filter(v=>v[0]=="?").map(v=>v[1]);

	let count = 0;
	for(let j = 0; j < 2**q.length; j++){
		let i = j;
		let r = [...s];
		q.forEach(v=>{
			if(i & 1)
				r[v] = "#";
			else
				r[v] = ".";
			i>>=1;
		});

		if(test(r, a))
			count++;
	}

	return count;
}

s.map(v=>solve(v[0], v[1])).reduce((a,b)=>a+b);
