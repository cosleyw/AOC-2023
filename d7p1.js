let s = prompt().split("\n").map(v=>v.split(" "));

let kind = h => {
	let a = h.split("").sort();
	let s = [...new Set(a)];
	let c = s.map(v=>a.map(k=>+(k==v)).reduce((a,b)=>a+b,0));

	if(s.length == 1)
		return 1; //five of a kind
	if(s.length == 2 && (c[0] == 1 || c[1] == 1))
		return 2; //four of a kind
	if(s.length == 2 && (c[0] == 2 || c[1] == 2))
		return 3; //full house
	if(s.length == 3 && (c[0] == 3 || c[1] == 3 || c[2] == 3))
		return 4; //three of a kind
	if(s.length == 3 && (c[0] == 1 || c[1] == 1 || c[2] == 1))
		return 5; // two pair
	if(s.length == 4)
		return 6; //one pair
	if(s.length == 5)
		return 7; //high card
}

//array comparison appears to convert arrays to strings and then string compare
//i love this language :yum:
let rank = c => String.fromCharCode("23456789TJQKA".indexOf(c)+97); 

let arrcmp = (a1, a2) => {
	if(a1 < a2)
		return -1;
	if(a2 < a1)
		return 1;
	return 0;
}

let handcmp = (h1, h2) => {
	if(kind(h1) == kind(h2))
		return arrcmp(h1.split("").map(rank), h2.split("").map(rank));
	return kind(h2) - kind(h1);
}

s.sort((a,b)=>handcmp(a[0],b[0])).map((v,i)=>(i+1)*+v[1]).reduce((a,b)=>a+b,0)

