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

let memo;
let solve_init = (s, a) => {
	memo = Array(s.length * a.length).fill(-1);
	return solve(s, a);
}

let solve = (s, a, si = 0, ai = 0) => {
	let ind = si + ai*s.length;
	if(si < s.length && ai < a.length){
		if(memo[ind] != -1)
			return memo[ind];
		return memo[ind] = solve_(s, a, si, ai);
	}
	
	return solve_(s, a, si, ai);
}

let solve_ = (s, a, si = 0, ai = 0) => {
	if(ai >= a.length){
		while(si < s.length)
			if(s[si++] == '#')
				return 0;
		return 1;
	}
	
	let count = 0;
	k: for(;si < s.length && s[si] != "#"; si++){
		if(s[si] == "?"){
			let i = 0;
			for(; i < a[ai]; i++)
				if(si+i >= s.length || s[si+i] == '.')
					continue k;

			if(s[si+i] != '#')
				count += solve(s, a, si+i+1, ai+1);
		}
	}

	let i = 0;
	for(; i < a[ai]; i++)
		if(si+i >= s.length || s[si+i] == '.')
			return count;

	if(s[si+i] != '#')
		count += solve(s, a, si+i+1, ai+1);

	return count;
}

let s = prompt().split("\n").map(v=>v.split(" ")).map(v=>[v[0].split(""), v[1].split(",").map(v=>+v)]).map(v=>[[...v[0], "?",...v[0], "?",...v[0], "?",...v[0], "?",...v[0]], [...v[1],...v[1],...v[1],...v[1],...v[1]]]);

s.map(v=>solve_init(...v)).reduce((a,b)=>a+b);

