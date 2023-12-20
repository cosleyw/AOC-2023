
/*
//start
broadcaster -> km, lr, xh, rf

//end
&tg -> rx //all high

&ln -> tg //low
&db -> tg //low
&vq -> tg //low
&tf -> tg //low


&bk -> xh, ln, zx //all high
%xh -> bk, ql
%ql -> bk, zx
%zx -> rq
%rq -> bk, gr
%gr -> bk, mn
%mn -> jh, bk
%jh -> lm, bk
%lm -> tr, bk
%tr -> bk, vp
%vp -> lp, bk
%lp -> jt, bk
%jt -> bk

n = 0b111111111011
o =          0b101


&tp -> dr, km, kg, db, vj, qr //all high
%km -> tp, dr
%dr -> kg
%kg -> lv
%lv -> jc, tp
%jc -> tp, qr
%qr -> dk
%dk -> tp, vj
%vj -> ps
%ps -> xf, tp
%xf -> bd, tp
%bd -> tp, gg
%gg -> tp

n = 0b111101011001
o =     0b10100111


&pt -> vq, rf, cm, jx, rg //all high
%rf -> pt, dj
%dj -> pt, gc
%gc -> cm, pt
%cm -> rg
%rg -> sd
%sd -> pt, jx
%jx -> cn
%cn -> mv, pt
%mv -> pt, hq
%hq -> fl, pt
%fl -> pt, sk
%sk -> pt

n = 0b111110100111
o =      0b1011001


&vd -> tf, lf, nb, cx, hx, lr //all high
%lr -> vd, vg
%vg -> lf, vd
%lf -> nb
%nb -> cg
%cg -> vd, hx
%hx -> sb
%sb -> vd, cx
%cx -> gp
%gp -> vd, sj
%sj -> rm, vd
%rm -> st, vd
%st -> vd

n = 0b111101010011
o =     0b10101101 

note: n + o results in zero so we are basically doing mod n
*/

let nl = [0b111111111011, 0b111101011001, 0b111110100111, 0b111101010011];

let gcd = (m, n) => m == 0 || n == 0 ? m+n : gcd(n, m % n);
let lcm = (m, n) => m*(n/gcd(m,n));

let k = nl.reduce(lcm);
