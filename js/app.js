/* shared: reveal on scroll, gate, scroll hint, always start at top */
if('scrollRestoration' in history) history.scrollRestoration='manual';
scrollTo(0,0); addEventListener('pageshow',()=>scrollTo(0,0));
const $=s=>document.querySelector(s), reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
function rnd(seed){return()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646;};}
function enter(delay){ const g=$('#gate'); if(!g||g.classList.contains('open'))return; g.classList.add('open');
  setTimeout(()=>{document.body.classList.remove('locked'); g.classList.add('gone');},reduce?0:delay);
  setTimeout(()=>{g.remove(); io(); const h=$('#hint'); if(h&&scrollY<40)h.classList.add('on');},reduce?50:delay+1200); }
let __io=null;function io(){if(__io)return;const o=__io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('on');o.unobserve(e.target);}}),{threshold:.14});
  document.querySelectorAll('.rv').forEach((el,i)=>{if(!el.style.transitionDelay)el.style.transitionDelay=(i%3)*.12+'s';o.observe(el);});}
addEventListener('scroll',()=>{const h=$('#hint'); if(h&&scrollY>40)h.classList.remove('on');},{passive:true});

const jaal=`<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'><g fill='none' stroke='%23C7DA9C' stroke-width='1.2'><path d='M60 10 C 80 30 80 50 60 60 C 40 50 40 30 60 10Z'/><path d='M60 110 C 80 90 80 70 60 60 C 40 70 40 90 60 110Z'/><path d='M10 60 C 30 40 50 40 60 60 C 50 80 30 80 10 60Z'/><path d='M110 60 C 90 40 70 40 60 60 C 70 80 90 80 110 60Z'/><circle cx='60' cy='60' r='4'/></g><g fill='%23C7DA9C'><circle cx='0' cy='0' r='2'/><circle cx='120' cy='0' r='2'/><circle cx='0' cy='120' r='2'/><circle cx='120' cy='120' r='2'/></g></svg>`;
document.documentElement.style.setProperty('--jaal',`url("data:image/svg+xml,${jaal.replace(/</g,'%3C').replace(/>/g,'%3E').replace(/"/g,"'")}")`);
// flourishes
document.querySelectorAll('.fl-orn').forEach(s=>s.innerHTML=`<path pathLength="1" d="M90 20 C 70 4 44 6 40 20 C 36 32 52 36 58 26 C 62 18 52 14 48 20"/><path pathLength="1" d="M90 20 C 110 4 136 6 140 20 C 144 32 128 36 122 26 C 118 18 128 14 132 20"/><path pathLength="1" d="M4 20 H34 M146 20 H176"/><circle class="d" cx="90" cy="20" r="3"/><circle class="d" cx="90" cy="32" r="1.6"/><circle class="d" cx="90" cy="8" r="1.6"/>`);
// tracker
const diya=`<svg viewBox="0 0 22 22"><path d="M2 13 Q11 22 20 13 Z" fill="#B8742E"/><path d="M2 13 H20" stroke="#F2C66D" stroke-width="1.2"/><g class="fl"><path d="M11 3 Q14 8 11 12 Q8 8 11 3Z" fill="#FFB43A"/><path d="M11 6 Q12.5 9 11 11.5 Q9.5 9 11 6Z" fill="#FFF2B0"/><circle cx="11" cy="9" r="6" fill="#FFB43A" opacity=".25"/></g></svg>`;
$('#diyas').innerHTML=[...Array(7)].map(()=>`<span class="dy">${diya}</span>`).join('');
const dys=[...document.querySelectorAll('.dy')];
function chapters(){return [...document.querySelectorAll('.ch')].filter(c=>c.offsetParent!==null).slice(0,7);}

/* ---------- festive gate: toran + bokeh ---------- */
(function(){const r=rnd(12);let h='<path d="M0 20 Q270 50 540 20" stroke="#E2BF6A" stroke-width="3" fill="none"/>';
 for(let i=0;i<19;i++){const x=14+i*28.5,y0=20+30*Math.sin(Math.PI*x/540),n=i%2?5:3;h+=`<g class="tst" style="transform-origin:${x}px ${y0}px"><line x1="${x}" y1="${y0}" x2="${x}" y2="${y0+n*14}" stroke="#7A5A10"/>`;
  for(let k=0;k<n;k++)h+=`<circle cx="${x}" cy="${y0+8+k*14}" r="7.5" fill="${(k+i)%3?'#F29F05':'#E8590C'}"/>`;h+=`<path d="M${x} ${y0+n*14+3} q-6 12 0 22 q6 -10 0 -22z" fill="#4F7A2A"/></g>`;}
 $('#gtoran').innerHTML=h;})();
const BD=Math.min(2,devicePixelRatio||1),bk=$('#bokeh'),bkx=bk.getContext('2d');function rsBk(){bk.width=innerWidth*BD;bk.height=innerHeight*BD;}rsBk();addEventListener('resize',rsBk);
const BK=[...Array(34)].map((_,i)=>{const r=rnd(i*7+3);return{x:r(),y:r(),s:6+r()*22,v:.004+r()*.01,ph:r()*6,c:r()<.7?[255,210,130]:[255,160,190]};});
(function bl(ts){if(!$('#gate'))return;const t=ts/1000,W=bk.width,H=bk.height;bkx.clearRect(0,0,W,H);
 for(const b of BK){const y=((b.y-t*b.v)%1+1)%1,x=b.x+Math.sin(t*.3+b.ph)*.02,a=.18+.22*Math.sin(t*.8+b.ph)**2,R=b.s*BD,g=bkx.createRadialGradient(x*W,y*H,0,x*W,y*H,R);g.addColorStop(0,`rgba(${b.c},${a})`);g.addColorStop(1,`rgba(${b.c},0)`);bkx.fillStyle=g;bkx.beginPath();bkx.arc(x*W,y*H,R,0,6.283);bkx.fill();}
 document.querySelectorAll('.tst').forEach((g,i)=>g.style.transform=`rotate(${Math.sin(t*1.2+i)*3}deg)`);requestAnimationFrame(bl);})(0);
/* ---------- clouds ---------- */
function bank(seed,y0,y1,n,col,op,yEnd){yEnd=yEnd||1100;const r=rnd(seed);let s=`<defs><filter id="cb${seed}" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="9"/></filter></defs><g filter="url(#cb${seed})" fill="${col}" opacity="${op}">`;
 for(let i=0;i<n;i++){const x=r()*600-30,y=y0+r()*(y1-y0),rx=50+r()*90,ry=26+r()*40;s+=`<ellipse cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" rx="${rx.toFixed(0)}" ry="${ry.toFixed(0)}"/>`;}
 for(let y=y1-30;y<yEnd;y+=40)for(let x=-40;x<620;x+=70)s+=`<ellipse cx="${x+r()*30}" cy="${y+r()*20}" rx="${70+r()*40}" ry="${40+r()*20}"/>`;return s+'</g>';}
$('#cloudB').innerHTML=bank(4,620,800,40,'#E89A80',.0,2000);
$('#cloudF').innerHTML=bank(9,1000,1100,46,'#F6C9A8',1,2700)+`<g fill="#FFFFFF" opacity=".7" filter="url(#cb9)">${[...Array(8)].map((_,i)=>{const r=rnd(i+50);return `<ellipse cx="${(r()*540).toFixed(0)}" cy="${(80+r()*360).toFixed(0)}" rx="${(40+r()*50).toFixed(0)}" ry="${(10+r()*10).toFixed(0)}"/>`}).join('')}</g>`;
function descent(){const clamp=x=>x<0?0:x>1?1:x;const H=innerHeight,d=clamp((scrollY-H*.28)/(H*.72));const ss=(a,b,x)=>{x=clamp((x-a)/(b-a));return x*x*(3-2*x);};
 $('#bgH').style.opacity=1-ss(.42,.58,d);
 $('#cloudB').style.transform=`translateY(${-d*H*1.1}px) scale(${1+d*.25})`;$('#cloudB').style.opacity=1-ss(.5,.75,d);
 $('#cloudF').style.transform=`translateY(${-d*H*1.7}px) scale(${1+d*.5})`;$('#cloudF').style.opacity=1-ss(.55,.8,d);
 $('#fog').style.opacity=ss(.3,.48,d)*(1-ss(.52,.72,d));
 $('#bgM').style.opacity=ss(.45,.6,d)*(1-ss(.72,1,d));
 const c2=$('#ch2');if(c2)c2.style.opacity=.15+.85*ss(.5,.8,d);
 if(!window.__sunW||window.__sunW<.5)$('#track').classList.toggle('dayt',d<.6);}
addEventListener('scroll',descent,{passive:true});addEventListener('resize',descent);descent();
/* ---------- join-hands gate ---------- */
const K=$('#knot'),ks=$('#ksvg'),hL=$('#hL'),hR=$('#hR');
let W=0,Y0=110,eL,eR,yL=Y0,yR=Y0,drag=null,tied=false,HK=1;
function reachPath(skin,shade){return `<path d="M-440 -22 L-118 -20 C-96 -24 -78 -27 -60 -25 C-42 -23 -28 -18 -14 -14 C-6 -12 1 -9 3 -5 C4 -1 0 1 -5 0 C-14 -1 -24 0 -31 2 C-25 3 -14 5 -8 8 C-3 11 -5 15 -11 14 C-20 13 -30 12 -38 12 C-32 14 -25 17 -21 20 C-17 23 -21 26 -27 24 C-34 22 -41 20 -47 19 C-43 22 -38 25 -36 28 C-35 31 -39 33 -44 31 C-52 28 -58 26 -64 24 C-76 24 -94 22 -118 20 L-440 22Z" fill="${skin}" stroke="${shade}" stroke-width=".9"/>
 <path d="M-31 2 C-40 4 -50 6 -60 8 M-38 12 C-46 13 -54 14 -62 15 M-47 19 C-52 20 -58 21 -64 22" stroke="${shade}" stroke-width=".8" fill="none" opacity=".55"/>`;}
function brideMehndi(){return `<g fill="none" stroke="#9A4A22" stroke-width=".9" opacity=".85"><circle cx="-70" cy="-10" r="7"/><circle cx="-70" cy="-10" r="3"/><path d="M-60 -14 q8 -2 14 2 M-50 -18 q6 0 10 3 M-84 -12 q-6 6 -2 12"/></g><g fill="#9A4A22" opacity=".85"><circle cx="-56" cy="-8" r="1"/><circle cx="-48" cy="-6" r="1"/><circle cx="-40" cy="-4" r="1"/></g>`;}
function chooda(){let b='';
 const ring=(x,col,w,glint)=>`<ellipse cx="${x}" cy="0" rx="3.6" ry="25" fill="none" stroke="${col}" stroke-width="${w}"/>`+(glint?`<path d="M${x-2.2} -18 q-1.4 8 0 14" stroke="rgba(255,255,255,.75)" stroke-width="1.1" fill="none" stroke-linecap="round"/>`:'');
 b+=ring(-124,'#E2BF6A',2.2,false);
 for(let i=0;i<8;i++){const x=-130-i*5.4;b+=ring(x,i%3===1?'#F5EBDA':'#C8102E',4.4,true);}
 b+=ring(-176,'#E2BF6A',2.2,false);
 return b+`<rect x="-440" y="-30" width="246" height="60" fill="#A80F2A"/><rect x="-194" y="-31" width="7" height="62" fill="#E2BF6A"/>`;}
function rudra(cx,y0){let g=`<path d="M${cx} -24 C${cx+8} -12 ${cx+8} 12 ${cx} 24" stroke="#5A3A1A" stroke-width="1" fill="none"/>`;
 const n=8;for(let i=0;i<n;i++){const a=-Math.PI/2+Math.PI*(i+.5)/n,x=cx+6*Math.cos(a),y=23*Math.sin(a),r=3.9;
  g+=`<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)})"><circle r="${r}" fill="url(#rudG)" stroke="#2E1608" stroke-width=".5"/><path d="M${-r*.7} ${-r*.3} q${r*.7} -1.2 ${r*1.4} 0 M${-r*.75} ${r*.3} q${r*.75} 1.2 ${r*1.5} 0 M0 ${-r} v${r*2}" stroke="#3E1E0C" stroke-width=".5" fill="none" opacity=".7"/></g>`;}
 return g+`<circle cx="${cx+1}" cy="-26" r="2.2" fill="#E2BF6A"/>`;}
function cuff(x){return `<rect x="${x}" y="-30" width="${440-x}" height="60" fill="#F3E6CC"/><rect x="${x-4}" y="-31" width="9" height="62" fill="#E2BF6A"/><path d="M${x+2} -26 v52" stroke="#B8862F" stroke-dasharray="2 3"/>`;}
/* ---- held pose: her hand (fingers to the right), his hand from the right wrapping around it ---- */
function heldPose(){
 // his hand: open, pointing left, slightly lower; her hand rests on top of it
 const his=`<g transform="translate(-34 10) scale(-1 1)">${reachPath('url(#skM)','#A8704E')}${rudra(-128,-21)}<rect x="-440" y="-30" width="290" height="60" fill="#F3E6CC"/><rect x="-156" y="-31" width="9" height="62" fill="#E2BF6A"/><path d="M-151 -26 v52" stroke="#B8862F" stroke-dasharray="2 3"/></g>`;
 const her=`<g transform="translate(34 -6)">${reachPath('url(#skF)','#C98A66')}${brideMehndi()}${chooda()}</g>`;
 return his+`<g style="filter:drop-shadow(0 3px 4px rgba(60,10,20,.35))">${her}</g>`;}

(function(){hL.innerHTML=reachPath('url(#skF)','#C98A66')+brideMehndi()+chooda()+`<g class="gripg"><circle cx="-62" cy="-4" r="13" fill="none" stroke="#FFE7A8" stroke-width="2" class="grip"/></g>`;
 hR.innerHTML=reachPath('url(#skM)','#A8704E')+rudra(-128,-21)+cuff(-420).replace(/x="-420"[^/]*\/>/,'')+`<rect x="-420" y="-30" width="270" height="60" fill="#F3E6CC"/><rect x="-156" y="-31" width="9" height="62" fill="#E2BF6A"/><path d="M-151 -26 v52" stroke="#B8862F" stroke-dasharray="2 3"/><g class="gripg"><circle cx="-62" cy="-4" r="13" fill="none" stroke="#FFE7A8" stroke-width="2" class="grip"/></g>`;
 $('#hHeld').innerHTML=heldPose();})();
function home(){W=K.clientWidth;ks.setAttribute('viewBox',`0 0 ${W} 220`);HK=Math.min(1,W/500);eL=W*.37;eR=W*.63;yL=yR=Y0;draw();}
function draw(){hL.setAttribute('transform',`translate(${eL} ${yL}) scale(${HK})`);hR.setAttribute('transform',`translate(${eR} ${yR}) scale(${-HK} ${HK})`);$('#knPos').setAttribute('transform',`translate(${W/2} ${Y0})`);$('#hHeld').setAttribute('transform',`translate(${W/2} ${Y0}) scale(${HK*1.05})`);}
function pt(e){const b=K.getBoundingClientRect();return[e.clientX-b.left,e.clientY-b.top];}
K.addEventListener('pointerdown',e=>{if(tied)return;const [x,y]=pt(e);if(Math.abs(y-Y0)>90)return;drag=x<W/2?'L':'R';window.__goff=(drag==='L'?eL:eR)-x;K.setPointerCapture(e.pointerId);K.style.cursor='grabbing';});
K.addEventListener('pointermove',e=>{if(!drag||tied)return;const [x,y]=pt(e),yy=Math.max(60,Math.min(190,y));const xx=x+(window.__goff||0);if(drag==='L'){eL=Math.max(40,Math.min(W-30,xx));yL=yy;}else{eR=Math.max(30,Math.min(W-40,xx));yR=yy;}draw();if(eR-eL<20&&Math.abs(yL-yR)<50)tie();});
function release(){if(!drag||tied){drag=null;return;}drag=null;K.style.cursor='grab';const s0={eL,eR,yL,yR},t0=performance.now();(function f(n){if(tied)return;const p=Math.min(1,(n-t0)/500),e=1-Math.pow(1-p,3);eL=s0.eL+(W*.32-s0.eL)*e;eR=s0.eR+(W*.68-s0.eR)*e;yL=s0.yL+(Y0-s0.yL)*e;yR=s0.yR+(Y0-s0.yR)*e;draw();if(p<1)requestAnimationFrame(f);})(t0);}
K.addEventListener('pointerup',release);K.addEventListener('pointercancel',release);
function tie(){if(tied)return;tied=true;drag=null;const s0={eL,eR,yL,yR},t0=performance.now();
 (function f(n){const p=Math.min(1,(n-t0)/380),e=1-Math.pow(1-p,3);eL=s0.eL+(W/2-2-s0.eL)*e;eR=s0.eR+(W/2+2-s0.eR)*e;yL=s0.yL+(Y0-s0.yL)*e;yR=s0.yR+(Y0-s0.yR)*e;draw();if(p<1)requestAnimationFrame(f);})(t0);
 $('#gate').classList.add('tied');startMusic();if(navigator.vibrate)navigator.vibrate(40);const b=K.getBoundingClientRect();setTimeout(()=>burst(b.left+W/2,b.top+Y0-60,70),300);
 const om=$('#omx'),gr=$('#gate').getBoundingClientRect();om.style.left=(b.left-gr.left+W/2)+'px';om.style.top=(b.top-gr.top+Y0)+'px';$('#gate').appendChild(om);
 setTimeout(()=>{const g=$('#gate');g.classList.add('opening');
  setTimeout(()=>{g.classList.add('entering');document.body.classList.add('arrived');},750);
  setTimeout(()=>{document.body.classList.remove('locked');g.classList.add('gone');},1300);
  setTimeout(()=>{const hc=$('#heavenCh');hc.classList.add('go');hc.querySelectorAll('.rv').forEach((el,i)=>el.style.transitionDelay=(0.05+i*0.16)+'s');io();$('#track').classList.add('on');update();descent();},1250);
  setTimeout(()=>{g.remove();const h=$('#hint');if(h&&scrollY<40)setTimeout(()=>h.classList.add('on'),1200);},2200);},2500);}

$('#kbdTie').addEventListener('click',tie);
$('#gate').addEventListener('click',function(){if(!tied)tie();});
addEventListener('resize',()=>{if(!tied)home();});
home();
// hand hint: gently nudge the left cloth
let nudgeT=performance.now();(function nud(n){if(tied||drag||!$('#gate'))return;const p=((n-nudgeT)/2200)%1,e=Math.sin(Math.min(1,p/.5)*Math.PI);eL=W*.37+e*W*.04;draw();requestAnimationFrame(nud);})(nudgeT);
/* ---------- petals / burst ---------- */
const fx=$('#fx'),fc=fx.getContext('2d');let parts=[];const DPR=Math.min(2,devicePixelRatio||1);
function rsFx(){fx.width=innerWidth*DPR;fx.height=innerHeight*DPR;}rsFx();addEventListener('resize',rsFx);
function burst(x,y,n){const r=rnd(Date.now()%9999+3);for(let i=0;i<n;i++){const a=r()*6.283,sp=3+r()*8;parts.push({x,y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp-5,l:1,c:['#F29F05','#E8590C','#8FAE5A','#E2BF6A','#C2185B'][i%5],r:r()*6});}}
(function loop(){fc.clearRect(0,0,fx.width,fx.height);parts=parts.filter(p=>p.l>0);for(const p of parts){p.vy+=.25;p.x+=p.vx;p.y+=p.vy;p.vx*=.98;p.l-=.012;p.r+=.15;fc.save();fc.globalAlpha=Math.min(1,p.l*1.4);fc.translate(p.x*DPR,p.y*DPR);fc.rotate(p.r);fc.fillStyle=p.c;fc.beginPath();fc.ellipse(0,0,5*DPR,3*DPR,0,0,6.283);fc.fill();fc.restore();}requestAnimationFrame(loop);})();
/* ---------- draw-on-reveal ---------- */
const dio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('go');dio.unobserve(e.target);}}),{threshold:.3});
/* ---------- scroll-driven scenes ---------- */
const bgF=$('#bgF'),bgS=$('#bgS'),sun=$('#sun'),hills=$('#hills'),kund=$('#kund');
const clamp=x=>x<0?0:x>1?1:x;let fireW=0;
function update(){const ch=chapters();let k=-1;ch.forEach((c,i)=>{if(c.getBoundingClientRect().top<innerHeight*.55)k=i;});dys.forEach((d,i)=>d.classList.toggle('lit',i<=k));$('#lab').textContent=k>=0?`${k+1} / ${ch.length} · ${ch[k].dataset.t}`:'';
 const vd=$('#vidai');if(!$('#rest').classList.contains('open')){fireW=0;bgF.style.opacity=bgS.style.opacity=sun.style.opacity=hills.style.opacity=kund.style.opacity=0;$('#bgY').style.opacity=$('#bgO').style.opacity=0;return;}
 const vr=vd.getBoundingClientRect(),H=innerHeight;
 const sunW=clamp((H*.95-vr.top)/(H*.6));
 const fr=document.querySelector('#rest .ch[data-t="Friday"]'),frTop=fr.getBoundingClientRect().top+scrollY,vdTop=vr.top+scrollY,st=frTop-H*.6,en=vdTop-H*.4,warm=clamp((scrollY-st)/(en-st));
 const ss=(a,b,x)=>{x=clamp((x-a)/(b-a));return x*x*(3-2*x);};
 $('#bgY').style.opacity=ss(0,.4,warm);$('#bgO').style.opacity=ss(.35,.72,warm);
 fireW=0;bgF.style.opacity=0;kund.style.opacity=0;bgS.style.opacity=sunW;hills.style.opacity=sunW;
 const rise=clamp((H*.6-vr.top)/(H*1.2));sun.style.top=(H*(.95-.3*rise)-0.8*Math.max(innerWidth,H))+'px';sun.style.opacity=sunW;const ry=$('#rays');ry.style.top=sun.style.top;ry.style.marginTop=(-0.3*Math.max(innerWidth,H))+'px';ry.style.opacity=sunW*.9;$('#mist').style.opacity=sunW;$('#birds').style.opacity=sunW;window.__sunW=sunW;$('#track').classList.toggle('dayt',sunW>.5||(scrollY-innerHeight*.28)/(innerHeight*.72)<.5);
 }
addEventListener('scroll',update,{passive:true});setInterval(()=>{if(typeof doliUpd==='function')doliUpd();},500);addEventListener('resize',update);

/* dawn birds */
const bc=$('#birds'),bx=bc.getContext('2d');function rsB(){bc.width=innerWidth*DPR;bc.height=innerHeight*DPR;}rsB();addEventListener('resize',rsB);
const FL=[...Array(7)].map((_,i)=>({dx:i*22+(i%2)*10,dy:(i%3)*12+i*4,ph:i}));
(function bl(ts){const t=ts/1000;bx.clearRect(0,0,bc.width,bc.height);if((window.__sunW||0)>.02){const cyc=(t%16)/16,W=bc.width,Hh=bc.height;bx.strokeStyle='#2F4420';bx.lineWidth=1.8*DPR;bx.lineCap='round';
 for(const o of FL){const x=-80*DPR+cyc*(W+200*DPR)+o.dx*DPR,y=Hh*.28-cyc*Hh*.08+o.dy*DPR,w=Math.sin(t*9+o.ph)*4*DPR;bx.beginPath();bx.moveTo(x-7*DPR,y+w);bx.quadraticCurveTo(x-3*DPR,y-2*DPR,x,y+DPR);bx.quadraticCurveTo(x+3*DPR,y-2*DPR,x+7*DPR,y+w);bx.stroke();}}requestAnimationFrame(bl);})(0);

/* ---------- final: music, doli, calendar, maps, countdown, share ---------- */
const music=$('#music'),mBtn=$('#musicBtn');
function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(t._h);t._h=setTimeout(()=>t.classList.remove('on'),2400);}
const shloka=$('#shloka');let musicOn=false,onMain=false;const VOL=.7;
function ramp(el,to,ms){cancelAnimationFrame(el._r);const from=el.volume,t0=performance.now();(function f(n){const q=Math.max(0,Math.min(1,(n-t0)/ms));el.volume=Math.max(0,Math.min(1,from+(to-from)*q));if(q<1)el._r=requestAnimationFrame(f);else if(to===0)el.pause();})(t0);}
const cur=()=>onMain?music:shloka;
const conn=navigator.connection||navigator.mozConnection||navigator.webkitConnection;
const saveData=!!(conn&&(conn.saveData||/2g/.test(conn.effectiveType||'')));
function armAudio(el){if(!el||el.dataset.armed)return;el.dataset.armed='1';el.preload='auto';try{el.load();}catch(e){}}
function warmWedding(){if(saveData)return;armAudio(music);}
/* Warm shloka on first gate touch (gesture-friendly); defer wedding until after entry */
$('#gate')&&$('#gate').addEventListener('pointerdown',()=>{armAudio(shloka);},{once:true,passive:true});

/* the shloka carries the blessings chapter; the wedding song takes over from the invitation on */
function setTrack(main){if(!musicOn||main===onMain)return;onMain=main;
 const on=main?music:shloka,off=main?shloka:music;
 armAudio(on);on.volume=0;const p=on.play();if(p&&p.catch)p.catch(()=>{});
 ramp(on,VOL,1800);ramp(off,0,1800);}
function startMusic(){musicOn=true;armAudio(shloka);shloka.volume=0;const p=shloka.play();if(p&&p.then)p.then(()=>{mBtn.hidden=false;ramp(shloka,VOL,2500);if('requestIdleCallback' in window)requestIdleCallback(warmWedding,{timeout:2500});else setTimeout(warmWedding,1200);}).catch(()=>{});$('#shareBtn').hidden=false;}

mBtn.addEventListener('click',()=>{const el=cur();if(musicOn){musicOn=false;music.pause();shloka.pause();mBtn.style.opacity=.55;mBtn.setAttribute('aria-label','Play music');}else{musicOn=true;armAudio(el);el.volume=VOL;el.play();mBtn.style.opacity=1;mBtn.setAttribute('aria-label','Pause music');}});
shloka.addEventListener('error',()=>{if(!onMain)setTrack(true);});
addEventListener('scroll',()=>{const c2=$('#ch2');if(!c2)return;const near=c2.getBoundingClientRect().top<innerHeight*1.2;if(near)warmWedding();setTrack(c2.getBoundingClientRect().top<innerHeight*.55);},{passive:true});
music.addEventListener('error',()=>{mBtn.hidden=true;});
const HOTEL='Hotel Sagar View, Galu, Barsar, Distt. Hamirpur, Himachal Pradesh',HOME='V.P.O. Kanoh, Ward No. 3, Tehsil Barsar, Distt. Hamirpur, Himachal Pradesh';
const EVS=[['Ladies Sangeet','2026-12-10T13:30Z',1,HOME],['Cocktail · DJ Night · Dine','2026-12-10T14:00Z',3.5,HOME],['Lunch','2026-12-11T07:00Z',2,HOME],['Sehra Bandi','2026-12-11T10:30Z',2,HOME],['Departure of Barat','2026-12-11T12:30Z',1,HOME],['Vadhu Pravesh','2026-12-12T02:30Z',1.5,HOME],['Dhaam','2026-12-12T07:00Z',3,HOME]];
const fmt=d=>d.toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'');
EVS.forEach((e,i)=>{const st=new Date(e[1]),en=new Date(st.getTime()+e[2]*3600e3);e.st=st;e.en=en;
 const u=`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(e[0]+' — Anshul & Gunjan')}&dates=${fmt(st)}/${fmt(en)}&details=${encodeURIComponent('With love, the Sharma family. RSVP: 94181 31673')}&location=${encodeURIComponent(e[3])}&ctz=Asia/Kolkata`;
 document.querySelectorAll(`.calb[data-ev="${i}"]`).forEach(a=>a.href=u);});
$('#icsBtn').addEventListener('click',()=>{const esc=t=>t.replace(/[,;]/g,m=>'\\'+m);let ics='BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Anshul weds Gunjan//EN\r\n';
 EVS.forEach((e,i)=>{ics+=`BEGIN:VEVENT\r\nUID:aw-g-${i}@anshul-weds-gunjan\r\nDTSTAMP:${fmt(new Date())}\r\nDTSTART:${fmt(e.st)}\r\nDTEND:${fmt(e.en)}\r\nSUMMARY:${esc(e[0]+' — Anshul & Gunjan')}\r\nLOCATION:${esc(e[3])}\r\nBEGIN:VALARM\r\nTRIGGER:-PT2H\r\nACTION:DISPLAY\r\nDESCRIPTION:${esc(e[0])}\r\nEND:VALARM\r\nEND:VEVENT\r\n`;});ics+='END:VCALENDAR\r\n';
 try{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([ics],{type:'text/calendar'}));a.download='Anshul-weds-Gunjan.ics';document.body.appendChild(a);a.click();a.remove();toast('Calendar file downloaded');}catch(e){toast('Use the calendar buttons beside each event');}});
const mq=q=>'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(q);
const HOMEMAP='https://maps.app.goo.gl/Tj6Totaqz9ZoMhPc9?g_st=ac',HOTELMAP='https://maps.app.goo.gl/mfVY46TGdJ3F27E5A?g_st=ac';
$('#mapH1').href=$('#mapH2').href=$('#mapR').href=$('#vm1').href=$('#vm2').href=$('#vm4').href=HOMEMAP;$('#mapB').href=$('#mapV').href=$('#vm3').href=HOTELMAP;
$('#wa').href='https://wa.me/919418131673?text='+encodeURIComponent("Namaste! 🙏 We'd love to join Anshul & Gunjan's wedding celebrations.\nName: \nNumber of guests: ");
$('#shareBtn').addEventListener('click',async()=>{const d={title:'Anshul weds Gunjan',text:"You're invited to the wedding of Anshul & Gunjan — 10–12 December 2026, Barsar 💚",url:location.href};try{if(navigator.share)await navigator.share(d);else{await navigator.clipboard.writeText(location.href);toast('Link copied');}}catch(e){}});
const target_t=Date.UTC(2026,11,11,12,30,0);function tick(){let x=Math.max(0,Math.floor((target_t-Date.now())/1000));const D=Math.floor(x/86400);x%=86400;const Hh=Math.floor(x/3600);x%=3600;const M=Math.floor(x/60),S=x%60;
 $('#cdD').textContent=D;$('#cdH').textContent=String(Hh).padStart(2,'0');$('#cdM').textContent=String(M).padStart(2,'0');$('#cdS').textContent=String(S).padStart(2,'0');}tick();setInterval(tick,1000);
// doli walks across the dawn as you scroll
const doli=$('#doli');function doliUpd(){}
(function walk(ts){const on=$('#rest').classList.contains('open')&&(window.__sunW||0)>.02;const rv=$('#rsvpCh'),rt=rv?rv.getBoundingClientRect().top:1e9,fade=Math.max(0,Math.min(1,(rt-innerHeight*.5)/(innerHeight*.3)));doli.style.opacity=on?window.__sunW*fade:0;
 if(on){const w=doli.getBoundingClientRect().width,cyc=15000,p=(ts%cyc)/cyc;doli.style.transform=`translateX(${-w*.85+p*(innerWidth+w*1.7)}px)`;}
 requestAnimationFrame(walk);})(0);
addEventListener('scroll',doliUpd,{passive:true});addEventListener('resize',doliUpd);
/* ---------- fire ---------- */
const fcv=$('#fire'),f=fcv.getContext('2d');function rsF(){fcv.width=innerWidth*DPR;fcv.height=innerHeight*DPR;}rsF();addEventListener('resize',rsF);
const R=rnd(3),FP=[...Array(70)].map(()=>({o:R(),x:(R()-.5),s:.6+R()*.8,sp:.6+R()*.6}));
const PT=[...Array(18)].map(()=>({x:R(),y:R(),s:.6+R()*.8,v:.02+R()*.03,r:R()*6,c:['#F29F05','#E8590C','#8FAE5A','#FFD35C'][Math.floor(R()*4)]}));
const pc=$('#pet'),pp=pc.getContext('2d');function rsP(){pc.width=innerWidth*DPR;pc.height=innerHeight*DPR;}rsP();addEventListener('resize',rsP);
function loop(ts){const t=ts/1000,Wc=fcv.width,Hc=fcv.height,u=DPR;f.clearRect(0,0,Wc,Hc);
 if(fireW>0.01){f.globalAlpha=fireW;const cx=Wc/2,base=Hc-70*u;
  let g0=f.createRadialGradient(cx,base-40*u,0,cx,base-40*u,160*u);g0.addColorStop(0,'rgba(255,170,60,.35)');g0.addColorStop(1,'rgba(255,90,30,0)');f.fillStyle=g0;f.fillRect(0,0,Wc,Hc);
  f.globalCompositeOperation='lighter';
  for(const [ox,hs,ph] of [[-26,.9,0],[24,.85,1.7],[-8,1.25,3.1],[10,1.05,4.4],[0,1.5,5.3]]){const h=(110+22*Math.sin(t*5+ph))*hs*u,w=(26+4*Math.sin(t*7+ph))*u,x0=cx+ox*u,sw=Math.sin(t*4.2+ph)*14*u,sw2=Math.sin(t*6.3+ph*1.7)*10*u;
   const gr=f.createLinearGradient(0,base,0,base-h);gr.addColorStop(0,'rgba(255,245,200,.95)');gr.addColorStop(.3,'rgba(255,190,70,.85)');gr.addColorStop(.7,'rgba(240,90,30,.55)');gr.addColorStop(1,'rgba(200,40,20,0)');
   f.fillStyle=gr;f.beginPath();f.moveTo(x0-w,base);f.bezierCurveTo(x0-w*1.1,base-h*.35,x0-w*.3+sw2,base-h*.6,x0+sw,base-h);f.bezierCurveTo(x0+w*.4+sw2,base-h*.6,x0+w*1.1,base-h*.35,x0+w,base);f.closePath();f.fill();}
  for(const q of FP){const life=((t*q.sp*.7+q.o)%1),x=cx+q.x*50*u+Math.sin(t*3+q.o*30)*10*u*life,y=base-40*u-life*230*u*q.s;f.fillStyle=`rgba(255,${180-life*100|0},60,${(1-life)*.9})`;f.beginPath();f.arc(x,y,(1.6*(1-life)+.6)*u,0,6.283);f.fill();}
  f.globalCompositeOperation='source-over';f.globalAlpha=1;}
 pp.clearRect(0,0,pc.width,pc.height);if(!$('#gate')){for(const q of PT){const y=((q.y+t*q.v)%1)*pc.height,x=(q.x+Math.sin(t*.5+q.r)*.03)*pc.width;pp.save();pp.translate(x,y);pp.rotate(q.r+t);pp.scale(1,.5+.5*Math.sin(t*2+q.r));pp.fillStyle=q.c;pp.globalAlpha=.7;pp.beginPath();pp.ellipse(0,0,5*q.s*u,3*q.s*u,0,0,6.283);pp.fill();pp.restore();}}
 requestAnimationFrame(loop);}
requestAnimationFrame(loop);
// observe flourishes after entry
const _io=io;io=function(){_io();document.querySelectorAll('main .fl-orn').forEach(el=>{if(el.offsetParent!==null)dio.observe(el);});};