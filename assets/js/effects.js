import { $ } from './core.js';
/** Confeti y flores. */
export function wishBurst(){
  const colors=['#dcb6f7','#ffdf9c','#ffc3e9','#b28df0','#ffffff'];
  for(let i=0;i<35;i++){
    const el=document.createElement('span');el.className='confetti-piece';
    el.style.left=Math.round(Math.random()*100)+'vw';
    el.style.background=colors[Math.floor(Math.random()*colors.length)];
    el.style.animationDuration=2.8+Math.random()*2.5+'s';
    el.style.animationDelay=Math.random()*.5+'s';
    el.style.setProperty('--drift',Math.round(Math.random()*150-75)+'px');
    document.body.append(el);setTimeout(()=>el.remove(),6000);
  }
}
$('confettiButton').addEventListener('click',wishBurst);


export function showerVioletFlowers(){
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const flowers=['✿','❀','✾','✦'];
  for(let i=0;i<27;i++){
    const petal=document.createElement('span');
    petal.className='violet-flower-petal';
    petal.textContent=flowers[i%flowers.length];
    petal.style.left=(Math.random()*96+2)+'vw';
    petal.style.setProperty('--flower-drift',(Math.random()*170-85)+'px');
    petal.style.animationDuration=(3.2+Math.random()*2.5)+'s';
    petal.style.animationDelay=(Math.random()*.7)+'s';
    petal.style.fontSize=(16+Math.random()*17)+'px';
    document.body.append(petal);
    window.setTimeout(()=>petal.remove(),6900);
  }
}
