import { $ } from './core.js';
import { wishBurst } from './effects.js';
/** Descifrado sin incluir la contraseña ni fotos privadas en claro. */
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
