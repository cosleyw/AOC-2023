let s = prompt();
let a = s.split("\n").map(v=>v.split(""));
let b = s.split("\n").map(v=>[...v.matchAll(/[^0-9.]/g)]);
let getnum = (x, y) => {
	if(x < 0 || x >= a[0].length || y < 0 || y >= a.length || !/[0-9]/.test(a[y][x]))
		return "";
	let s = ""
	while(x >= 0 && /[0-9]/.test(a[y][x-1]))
		x--;

	while(x < a[y].length && /[0-9]/.test(a[y][x])){
		s += a[y][x];
		a[y][x] = ".";
		x++;
	}

	return s;
}

b.map((v,y)=>v.map(v=>[[1, 0],[-1, 0],[-1, -1],[1, 1],[0, 1],[0, -1],[-1, 1],[1, -1]].map(q=>getnum(v.index + q[0], y + q[1])).filter(v=>v!="")).reduce((a,b)=>[...a,...b],[])).reduce((a,b)=>[...a,...b],[]) .map(v=>+v).reduce((a,b)=>a+b);
