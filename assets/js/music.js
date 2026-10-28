import { $ } from './core.js';
/** Reproductor musical oficial. */
const music=$('musicToggle');
const musicDock=$('musicDock');
const youtubeMusicPlayer=$('youtubeMusicPlayer');
// Vídeo musical oficial de KISS OF LIFE. loop + playlist repiten el mismo vídeo.
// Al abrir el reproductor después del toque de la visitante, intentamos iniciar audio.
// Algunos navegadores exigen que la visitante pulse ▶ en el video.
const officialMusicVideo='dCBsFUnyXl0';
const youtubeMusicUrl='https://www.youtube-nocookie.com/embed/'+officialMusicVideo+
  '?autoplay=1&loop=1&playlist='+officialMusicVideo+'&playsinline=1&controls=1&rel=0';
export function openMusicDock(){
  musicDock.hidden=false;
  musicDock.classList.add('visible');
  youtubeMusicPlayer.src=youtubeMusicUrl;
  music.setAttribute('aria-expanded','true');
  music.setAttribute('aria-label','IGLOO: reproductor abierto');
  $('musicLabel').textContent='IGLOO ♪';
}
function closeMusicDock(){
  youtubeMusicPlayer.removeAttribute('src');
  musicDock.classList.remove('visible');
  musicDock.hidden=true;
  music.setAttribute('aria-expanded','false');
  music.setAttribute('aria-label','Reproducir IGLOO mientras navegas');
  $('musicLabel').textContent='IGLOO';
}
music.addEventListener('click',()=>{
  if(musicDock.hidden)openMusicDock();
  else musicDock.scrollIntoView({behavior:'smooth',block:'nearest'});
});
$('closeMusic').addEventListener('click',closeMusicDock);
const moveMusicDock=$('moveMusicDock');
if(moveMusicDock){
  moveMusicDock.addEventListener('click',()=>{
    const left=musicDock.classList.toggle('music-dock-left');
    moveMusicDock.setAttribute('aria-label',left?'Mover reproductor a la derecha':'Mover reproductor a la izquierda');
  });
}
