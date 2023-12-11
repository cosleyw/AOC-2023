let sub = (a,b) => a.map((v,i)=>v-b[i]);

let p = prompt().split("\n").map(v=>v.split(""));
let gal = p.map((v,i)=>v.map((v,j)=>v=="#"?[j, i]:undefined).filter(v=>v!=undefined)).reduce((a,b)=>[...a,...b],[]);


let w = p.reduce((a,b)=>a.map((v,i)=>v=="#"||b[i]=="#"?"#":".")).map((v,i)=>[v, i]).filter(v=>v[0]==".").map(v=>v[1]);
let h = p.map(v=>v.indexOf("#")==-1?".":"#").map((v,i)=>[v, i]).filter(v=>v[0]==".").map(v=>v[1]);

let inRange = (c, a, b) => {
	if(a > b)
		[a, b] = [b, a];

	return c >= a && c < b;
}

let dist = 0;
let pairs = 0;
for(let i = 0; i < gal.length-1; i++){
	for(let j = i+1; j < gal.length; j++){
		let p = sub(gal[i], gal[j]);
		
		let xe = w.filter(v=>inRange(v, gal[i][0], gal[j][0])).length;
		let ye = h.filter(v=>inRange(v, gal[i][1], gal[j][1])).length;
		let dis = Math.abs(p[0]) + Math.abs(p[1]) + xe + ye;
		//console.log(dis, i, j, gal[i], gal[j]);
		dist += dis;
		pairs++;
	}
}

dist

