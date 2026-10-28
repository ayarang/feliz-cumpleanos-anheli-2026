import { $ } from './core.js';
import { openMusicDock } from './music.js';
import { wishBurst } from './effects.js';
/** Regalo, gatito y navegación. */
// Una presentación que se abre como un regalo. Intento de música en el primer toque.
const giftIntro=$('giftIntro');
const openBirthdayGift=$('openBirthdayGift');
const skipGiftIntro=$('skipGiftIntro');
const introMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(giftIntro && openBirthdayGift && skipGiftIntro){
  document.body.classList.add('gift-intro-active');
  openBirthdayGift.focus({preventScroll:true});
  let giftOpened=false;
  function finishGiftIntro(animate){
    if(giftOpened)return;
    giftOpened=true;
    if(animate&&!introMotion){
      giftIntro.classList.add('gift-opening');
      window.setTimeout(()=>{
        giftIntro.hidden=true;
        document.body.classList.remove('gift-intro-active');
        $('hero-title').focus({preventScroll:true});
        wishBurst();
      },950);
    }else{
      giftIntro.hidden=true;
      document.body.classList.remove('gift-intro-active');
      $('hero-title').focus({preventScroll:true});
    }
  }
  openBirthdayGift.addEventListener('click',()=>{
    // Se ejecuta directamente durante el toque para maximizar la posibilidad de autoplay con sonido.
    // Sin garantías: YouTube o el navegador aún pueden exigir pulsar ▶.
    openMusicDock();
    finishGiftIntro(true);
  });
  skipGiftIntro.addEventListener('click',()=>finishGiftIntro(false));
  giftIntro.addEventListener('keydown',e=>{
    if(e.key==='Escape'){e.preventDefault();finishGiftIntro(false)}
    if(e.key==='Tab'){
      const active=document.activeElement;
      if(!e.shiftKey&&active===skipGiftIntro){e.preventDefault();openBirthdayGift.focus()}
      else if(e.shiftKey&&active===openBirthdayGift){e.preventDefault();skipGiftIntro.focus()}
    }
  });
}

// Un solo gatito interactivo sobre la foto; conservamos el otro gatito decorativo.
const birthdayCat=$('birthdayCat');
if(birthdayCat){
  const catMessages=['¡Miau! Hoy toca sonreír, jijiji. 💜','¿Ya pediste tu deseo? 🎂','¡Qué bonito día para cumplir años! ✨','Yo también quiero un poquito de torta. 🐱','Miau, disfruta esta sorpresa, Anheli. ✿'];
  let catIndex=0;
  birthdayCat.addEventListener('click',()=>{
    $('birthdayCatMessage').textContent=catMessages[catIndex%catMessages.length];
    catIndex++;
    birthdayCat.classList.remove('cat-bounce');
    void birthdayCat.offsetWidth;
    birthdayCat.classList.add('cat-bounce');
  });
}

$('countdownText').textContent='Que este día te regale sonrisas 💜';

const navLinks=[...document.querySelectorAll('.nav-link')];
const observer=new IntersectionObserver(entries=>{
  for(const e of entries){
    if(e.isIntersecting){navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id));}
  }
},{rootMargin:'-22% 0px -65% 0px',threshold:0});
for(const s of document.querySelectorAll('main > section'))observer.observe(s);
