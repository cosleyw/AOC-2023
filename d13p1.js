let p = prompt().split("\n\n").map(v=>v.trim().split("\n").map(v=>v.split("")));

let transpose = m => {
	let res = Array(m[0].length).fill(0).map(v=>Array(m.length));
	m.forEach((v,i)=>v.forEach((v,j)=>res[j][i]=v));
	return res;
}

let is_arr_reflected = (s, k) => {
	let d = Math.min(k, s.length - k);
	for(let i = 0; i < d; i++)
		if(s[k + i] != s[k-1-i])
			return 0;
	return true;
}

let is_mat_reflected = (m, k) => m.every(v=>is_arr_reflected(v, k));

let find_reflection = m => {
	let h = [];
	for(let i = 0; i < m[0].length; i++)
		if(is_mat_reflected(m, i))
			h.push(i);

	let v = [];
	m = transpose(m);
	for(let j = 0; j < m[0].length; j++)
		if(is_mat_reflected(m, j))
			v.push(j);

	return [h, v];
}

p.map(find_reflection).map(v=>v[0].reduce((a,b)=>a+b) + 100*v[1].reduce((a,b)=>a+b)).reduce((a,b)=>a+b);

