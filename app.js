'use strict';

// Cumpleaños de Anheli: primera edición.
// No se incluye ninguna contraseña en este archivo ni se publican fotos secretas en claro.
const publicPhotos = [
  {src:'assets/fotos/recuerdo-01.jpg',title:'Un instante inesperado',description:'Tu cabello es hermoso, aunque siempre dices que no te gusta porque se engrasa. La verdad, aquí se te ve muy bien, jijiji. ¡Espero que hayas encontrado el shampoo perfecto!'},
  {src:'assets/fotos/recuerdo-02.jpg',title:'Pequeños detalles',description:'No me acuerdo por qué me mirabas así, jijiji.'},
  {src:'assets/fotos/recuerdo-03.jpg',title:'Compartir y aprender',description:'Ese día la pasé bien y conocí nuevos lugares. Espero que tú también la hayas pasado bien. Fuimos a recoger tu pedido que se había perdido en Salom; estabas desesperada, jijiji.'},
  {src:'assets/fotos/recuerdo-04.jpg',title:'Un día diferente',description:'Aquí también estuvimos con Lidea. Después te invitó varias veces, pero no accediste. De todas formas, fueron buenos momentos de risas y de hacer hora, jijiji.'},
  {src:'assets/fotos/recuerdo-05.jpg',title:'Una parada especial',description:'Ese día me dijiste que no me reconocías. No sé si fue por el cabello o por la barba, jijiji. Creo que querías hablar, pero no sé por qué te quedaste callada. Estábamos en el museo y tú estabas feliz porque te iban a entregar tu polo, pero nunca llegó, jijiji.'},
  {src:'assets/fotos/recuerdo-06.jpg',title:'En buena compañía',description:'Creo que esto fue cuando fuimos a ver el video. Llegamos casi una hora tarde, jijiji. Estabas como loca por regresar rápido, no sé qué habría pasado. En fin, me divertí jugando.'},
  {src:'assets/fotos/recuerdo-07.jpg',title:'Una sonrisa espontánea',description:'Ese día fue tu examen de Matemática y no me dejaste dormir, jijiji. Pero tú estabas como si nada. Creo que en un ejercicio restaste mal y en otro te confundiste de signo, pero estabas feliz. ¿Sería porque no me dejaste dormir? Jijiji.'}
];

const $ = id => document.getElementById(id);
let currentPhoto=0;
const stage=$('carouselStage');
let touchStart=null;

function showPhoto(index){
  currentPhoto=(index+publicPhotos.length)%publicPhotos.length;
  const p=publicPhotos[currentPhoto];
  const image=$('carouselImage');
  image.src=p.src;
  image.alt=p.title;
  $('photoTitle').textContent=p.title;
  $('photoDescription').textContent=p.description;
  $('photoCounter').textContent=`${String(currentPhoto+1).padStart(2,'0')} / 07`;
  for(const thumb of $('galleryThumbs').children){
    const active=Number(thumb.dataset.index)===currentPhoto;
    thumb.classList.toggle('active',active);
    thumb.setAttribute('aria-current',active?'true':'false');
  }
}

const thumbs=$('galleryThumbs');
for(let i=0;i<publicPhotos.length;i++){
  const thumb=document.createElement('button');
  thumb.type='button';thumb.className='thumb';thumb.dataset.index=String(i);
  thumb.setAttribute('aria-label',`Ver foto ${i+1}: ${publicPhotos[i].title}`);
  const img=document.createElement('img');img.src=publicPhotos[i].src;img.alt='';img.loading='lazy';
  thumb.append(img);thumb.addEventListener('click',()=>showPhoto(i));thumbs.append(thumb);
}
showPhoto(0);
$('prevPhoto').addEventListener('click',()=>showPhoto(currentPhoto-1));
$('nextPhoto').addEventListener('click',()=>showPhoto(currentPhoto+1));
stage.addEventListener('touchstart',ev=>{touchStart=ev.touches[0]?.clientX??null},{passive:true});
stage.addEventListener('touchend',ev=>{
  if(touchStart===null)return;
  const diff=ev.changedTouches[0].clientX-touchStart;touchStart=null;
  if(Math.abs(diff)>45)showPhoto(currentPhoto+(diff<0?1:-1));
},{passive:true});

const lightbox=$('lightbox');
function openLightbox(src,caption){
  $('lightboxImage').src=src;
  $('lightboxImage').alt=caption;
  $('lightboxCaption').textContent=caption;
  if(typeof lightbox.showModal==='function')lightbox.showModal();
}
$('expandPhoto').addEventListener('click',()=>openLightbox(publicPhotos[currentPhoto].src,publicPhotos[currentPhoto].title));
$('closeLightbox').addEventListener('click',()=>lightbox.close());
lightbox.addEventListener('click',event=>{if(event.target===lightbox)lightbox.close()});
lightbox.addEventListener('close',()=>{ $('lightboxImage').removeAttribute('src') });
window.addEventListener('keydown',ev=>{
  if(!lightbox.open && (ev.key==='ArrowRight'||ev.key==='ArrowLeft') && document.activeElement?.tagName!=='INPUT'){
    showPhoto(currentPhoto+(ev.key==='ArrowRight'?1:-1));
  }
});

function birthdayMessage(){
  // Calendario fijado a Lima, independientemente de la zona del visitante.
  const parts=new Intl.DateTimeFormat('en-US',{timeZone:'America/Lima',year:'numeric',month:'numeric',day:'numeric'}).formatToParts(new Date());
  const get=type=>Number(parts.find(x=>x.type===type).value);
  const y=get('year'),m=get('month'),d=get('day');
  if(m===10&&d===31)return '¡Hoy es tu día! Que la pases increíble 🎂';
  const today=Date.UTC(y,m-1,d);
  const target=Date.UTC(m<10||m===10&&d<31?y:y+1,9,31);
  const days=Math.round((target-today)/86400000);
  return days===1?'¡Falta 1 día para tu cumpleaños! ✨':`Faltan ${days} días para el 31 de octubre ✨`;
}
$('countdownText').textContent=birthdayMessage();

const navLinks=[...document.querySelectorAll('.nav-link')];
const observer=new IntersectionObserver(entries=>{
  for(const e of entries){
    if(e.isIntersecting){navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id));}
  }
},{rootMargin:'-22% 0px -65% 0px',threshold:0});
for(const s of document.querySelectorAll('main > section'))observer.observe(s);

const audio=$('birthdayMusic');
audio.volume=.35;
const music=$('musicToggle');
music.addEventListener('click',async()=>{
  if(audio.paused){
    try{await audio.play();music.setAttribute('aria-pressed','true');$('musicLabel').textContent='Sonando';$('musicIcon').textContent='❚❚';music.setAttribute('aria-label','Pausar música');}
    catch(err){$('musicLabel').textContent='Sin audio';console.warn('No se pudo iniciar la música',err)}
  }else{
    audio.pause();music.setAttribute('aria-pressed','false');$('musicLabel').textContent='Música';$('musicIcon').textContent='♫';music.setAttribute('aria-label','Activar música');
  }
});

function wishBurst(){
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

// Derivación de clave en el navegador. La clave NO está incluida en código HTML, JS ni texto.
async function decryptPrivateAlbum(password){
  if(!window.crypto?.subtle)throw new Error('requires-https');
  const response=await fetch('assets/solo-para-ti.dat',{cache:'no-store'});
  if(!response.ok)throw new Error('missing-album');
  const bytes=new Uint8Array(await response.arrayBuffer());
  if(bytes.length<45)throw new Error('invalid-album');
  const salt=bytes.slice(0,16),nonce=bytes.slice(16,28),ciphertext=bytes.slice(28);
  const encoder=new TextEncoder();
  const baseKey=await crypto.subtle.importKey('raw',encoder.encode(password),'PBKDF2',false,['deriveKey']);
  const key=await crypto.subtle.deriveKey({name:'PBKDF2',hash:'SHA-256',salt,iterations:400000},baseKey,{name:'AES-GCM',length:256},false,['decrypt']);
  const decoded=await crypto.subtle.decrypt({name:'AES-GCM',iv:nonce,additionalData:encoder.encode('ANHELI-BIRTHDAY-v1'),tagLength:128},key,ciphertext);
  return JSON.parse(new TextDecoder().decode(decoded));
}

// Notas adicionales cifradas: las descripciones y la carta no se publican en texto abierto.
async function decryptPrivateNotes(password){
  if(!window.crypto?.subtle)throw new Error('requires-https');
  if(typeof DecompressionStream!=='function')throw new Error('requires-modern-browser');
  const response=await fetch('assets/notas-secretas.enc',{cache:'no-store'});
  if(!response.ok)throw new Error('missing-patch');
  const encoded=(await response.text()).trim();
  const bytes=Uint8Array.from(atob(encoded),c=>c.charCodeAt(0));
  if(bytes.length<45)throw new Error('invalid-patch');
  const salt=bytes.slice(0,16),nonce=bytes.slice(16,28),ciphertext=bytes.slice(28);
  const encoder=new TextEncoder();
  const baseKey=await crypto.subtle.importKey('raw',encoder.encode(password),'PBKDF2',false,['deriveKey']);
  const key=await crypto.subtle.deriveKey({name:'PBKDF2',hash:'SHA-256',salt,iterations:400000},baseKey,{name:'AES-GCM',length:256},false,['decrypt']);
  const compressed=await crypto.subtle.decrypt({name:'AES-GCM',iv:nonce,additionalData:encoder.encode('ANHELI-BIRTHDAY-PATCH-v3'),tagLength:128},key,ciphertext);
  const inflated=new Blob([compressed]).stream().pipeThrough(new DecompressionStream('gzip'));
  return JSON.parse(await new Response(inflated).text());
}

$('showPassword').addEventListener('click',()=>{
  const input=$('secretPassword');const show=input.type==='password';
  input.type=show?'text':'password';
  $('showPassword').setAttribute('aria-pressed',String(show));
  $('showPassword').setAttribute('aria-label',show?'Ocultar contraseña':'Mostrar contraseña');
});

$('secretForm').addEventListener('submit',async event=>{
  event.preventDefault();
  const input=$('secretPassword');const password=input.value.trim();
  const err=$('secretError');const btn=$('unlockButton');
  if(!password){err.textContent='Escribe la clave para abrir este rincón.';input.focus();return;}
  btn.disabled=true;btn.textContent='Abriendo la sorpresa…';err.textContent='';
  try{
    const album=await decryptPrivateAlbum(password);
    const newNotes=await decryptPrivateNotes(password);
    input.value='';
    $('secretFormWrapper').hidden=true;
    $('secretPanel').classList.add('opened');
    $('secretContentTitle').textContent=album.title;
    $('secretLetter').textContent=album.letter;
    const grid=$('privateGrid');grid.replaceChildren();
    album.images.forEach((p,index)=>{
      const item=document.createElement('article');item.className='private-item';
      const img=document.createElement('img');img.src=p.src;img.alt=p.title;img.loading=index<2?'eager':'lazy';
      const h=document.createElement('h4');h.textContent=p.title;
      const description=document.createElement('p');description.textContent=newNotes.images[index]?.description??p.description;
      item.append(img,h,description);grid.append(item);
    });
    $('secretFinalTitle').textContent=newNotes.finalTitle;
    $('secretFinalText').textContent=newNotes.finalNote;
    $('secretFinalLetter').hidden=false;
    $('secretUnlocked').hidden=false;
    wishBurst();
  }catch(error){
    if(error.message==='requires-https')err.textContent='Para abrir las fotos, publica la página con HTTPS o ejecútala con el servidor local indicado en las instrucciones.';
    else if(error.message==='missing-album')err.textContent='Falta el álbum cifrado. Revisa que subiste toda la carpeta assets.';
    else if(error.message==='missing-patch')err.textContent='Falta el archivo de notas cifradas. Revisa la carpeta assets.';
    else if(error.message==='requires-modern-browser')err.textContent='Abre esta sorpresa en un navegador actualizado.';
    else err.textContent='Esa todavía no es la clave. Revisa la pista e inténtalo de nuevo 💜';
  }finally{btn.disabled=false;btn.innerHTML='Abrir mi sorpresa <span aria-hidden="true">✧</span>';}
});

$('lockAgain').addEventListener('click',()=>{
  $('secretUnlocked').hidden=true;
  $('privateGrid').replaceChildren();
  $('secretLetter').textContent='';
  $('secretFinalLetter').hidden=true;
  $('secretFinalText').textContent='';
  $('secretFormWrapper').hidden=false;
  $('secretPanel').classList.remove('opened');
  $('secretPassword').value='';
  $('secretError').textContent='';
  $('secretPassword').focus();
});
