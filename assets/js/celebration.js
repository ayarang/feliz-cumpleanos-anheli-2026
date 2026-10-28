import { $ } from './core.js';
import { wishBurst, showerVioletFlowers } from './effects.js';
/** Velitas y despedida. */
const finalSurpriseButton=$('finalSurpriseButton');
const finalSurpriseReveal=$('finalSurpriseReveal');
if(finalSurpriseButton && finalSurpriseReveal){
  finalSurpriseButton.addEventListener('click',()=>{
    finalSurpriseReveal.hidden=false;
    finalSurpriseButton.hidden=true;
    wishBurst();
    showerVioletFlowers();
    finalSurpriseReveal.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'nearest'});
  });
}

const cakeCard=$('birthdayCakeCard');
const wishButton=$('wishButton');
const wishReveal=$('wishReveal');
const resetCandles=$('resetCandles');
if(cakeCard && wishButton && wishReveal && resetCandles){
  wishButton.addEventListener('click',()=>{
    cakeCard.classList.add('candles-out');
    wishReveal.hidden=false;
    resetCandles.hidden=false;
    wishButton.disabled=true;
    wishButton.textContent='¡Deseo pedido! 💜';
    wishBurst();
  });
  resetCandles.addEventListener('click',()=>{
    cakeCard.classList.remove('candles-out');
    wishReveal.hidden=true;
    resetCandles.hidden=true;
    wishButton.disabled=false;
    wishButton.textContent='Pide un deseo ✨';
  });
}
