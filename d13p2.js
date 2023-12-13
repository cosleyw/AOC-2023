let p = prompt().split("\n\n").map(v=>v.trim().split("\n").map(v=>v.split("")));

let transpose = m => {
	let res = Array(m[0].length).fill(0).map(v=>Array(m.length));
	m.forEach((v,i)=>v.forEach((v,j)=>res[j][i]=v));
	return res;
}

let is_arr_reflne = (s, k) => {
	let d = Math.min(k, s.length - k);
	let r = [];
	for(let i = 0; i < d; i++)
		if(s[k + i] != s[k-1-i])
			r.push(i);
	return r;
}

let is_mat_smuged_reflected = (m, k) =>{
	let r = 0;
	return m.every(v=>{
		let a = is_arr_reflne(v, k);
		if(a.length == 0)
			return true;
		if(a.length == 1 && r == 0){
			r = 1;
			return true;
		}
		return false;
	}) && (r == 1);
}

let find_reflection = m => {
	let h = [];
	for(let i = 0; i < m[0].length; i++)
		if(is_mat_smuged_reflected(m, i))
			h.push(i);

	let v = [];
	m = transpose(m);
	for(let j = 0; j < m[0].length; j++)
		if(is_mat_smuged_reflected(m, j))
			v.push(j);

	return [h, v];
}

p.map(find_reflection).map(v=>v[0].reduce((a,b)=>a+b,0) + 100*v[1].reduce((a,b)=>a+b,0)).reduce((a,b)=>a+b);

