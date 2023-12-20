let p = prompt().split("\n")
	.map(v=>v.split("->")
		.map(v=>v.trim()))
		.map(v=>[
			...v[0].split(/(\%|\&|^b)/).slice(1),
			v[1].split(",").map(v=>v.trim())]);

let modules = {};
p.forEach(v=>{
	let name = v[1];
	let k = modules[v[1]] ??= {};
	k.type = v[0];
	k.outputs = v[2];
	k.inputs ??= [];
	k.st = false;
	k.instate = {};

	v[2].forEach(v=>{
		let d = modules[v] ??= {};
		d.inputs ??= [];
		d.inputs.push(name);
	});
});

let queue;
let high = 0;
let low = 0;
let pulse_prop = (n, t, f) => {
	let p = false;
	let m = modules[n];
	switch(m.type){
		case "%":
			if(t)
				return;
			m.st = !m.st;
			p = m.st;
			break;
		case "&":
			m.instate[f] = t;
			if(m.inputs.some(v=>!m.instate[v]))
				p = true;
			break;
	}

	m.outputs.forEach(v=>{
		//console.log(n, p, v);
		if(p)
			high++;
		else
			low++;
		
		let k = modules[v];
		if(k.type != undefined)
			queue.push([v, p, n]);
	});
}


let press_button = () => {
	low++;
	queue = [["roadcaster", false]];
	while(queue.length)
		pulse_prop(...queue.shift());
}

for(let i = 0; i < 1000; i++)
	press_button();

low*high;
