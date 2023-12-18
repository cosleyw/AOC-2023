let dirs = {'U': [0, -1], 'R': [1, 0], 'D': [0, 1], 'L': [-1, 0]};
let mul = (a, b) => a.map(v=>v*b);
let add = (a, b) => a.map((v,i)=>v+b[i]);
let dot = (a, b) => a.map((v,i)=>v*b[i]).reduce((a,b)=>a+b);
let sub = (a, b) => add(a, mul(b, -1));
let length = (a) => Math.sqrt(dot(a,a));
let rot90 = ([x, y]) => [y, -x];
let sign = (p1, p2, p3) => (p1[0] - p3[0]) * (p2[1] - p3[1]) - (p2[0] - p3[0]) * (p1[1] - p3[1]);

function PointInTriangle (pt, v1, v2, v3)
{
    let d1, d2, d3;
    let has_neg, has_pos;

    d1 = sign(pt, v1, v2);
    d2 = sign(pt, v2, v3);
    d3 = sign(pt, v3, v1);

    has_neg = (d1 < 0) || (d2 < 0) || (d3 < 0);
    has_pos = (d1 > 0) || (d2 > 0) || (d3 > 0);

    return !(has_neg && has_pos);
}
let ccw = (p1, p2, p3) => dot(rot90(sub(p2, p1)), sub(p3, p2));
let area = ([x1,y1],[x2,y2],[x3,y3]) => {
	//console.log([x1,y1],[x2,y2],[x3,y3], 0.5*Math.abs(x1*(y2-y3)+x2*(y3-y1)+x3*(y1-y2)) );
	return 0.5*Math.abs(x1*(y2-y3)+x2*(y3-y1)+x3*(y1-y2))
};


let p = prompt().split("\n").map(v=>v.split(" ")).map(v=>[dirs["RDLU"[+("0x"+v[2][7])]], +("0x"+v[2].slice(2,7))]);
//let p = prompt().split("\n").map(v=>v.split(" ")).map(v=>[dirs[v[0]],+v[1]]);

let points = [];
p.map(v=>mul(v[0], v[1])).reduce((a,b,i)=>{
	let p = add(a, b);
	points.push(p);
	return p;
},[0, 0]);

let filled = 0;
p.forEach(v=>{
	if(dot(v[0], [0, 1]) == 1 || dot(v[0], [1, 0]) == 1)
		filled += v[1];
});


if(dot(p[0][0], [0, 1]) == 1 || dot(p[0][0], [1, 0]) == 1
   || dot(p[p.length-1][0], [0, 1]) == 1 || dot(p[p.length-1][0], [1, 0]) == 1)
	filled++;

let reduce = (p) => {
	k: for(let i = 0; i < p.length; i++){
		let a = p[i], b = p[(i+1)%p.length], c = p[(i+2)%p.length];
		for(let j = i+3; j < p.length; j++)
			if(PointInTriangle(p[j], a, b, c))
				continue k;
		let ar = area(a, b, c);
		if(ccw(a, b, c) > 0)
			filled -= ar;
		else
			filled += ar;

		return [...p.slice(0, i+1), ...p.slice(i+2)];
	}
}

while(points.length > 2)
	points = reduce(points);

filled;

