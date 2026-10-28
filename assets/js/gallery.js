import { $ } from './core.js';
import { publicPhotos } from './photos.js';
/** Galería, miniaturas y ampliación. */
let currentPhoto=0;
const stage=$('carouselStage');
let touchStart=null;

function showPhoto(index){
  currentPhoto=(index+publicPhotos.length)%publicPhotos.length;
  const p=publicPhotos[currentPhoto];
  const image=$('carouselImage');
  image.src=p.src;
  image.alt=p.title;
  // Transición suave por página sin recortar ni sustituir la fotografía original.
  stage.classList.remove('album-appear');
  void stage.offsetWidth;
  stage.classList.add('album-appear');
  $('albumPageLabel').textContent=`Página ${currentPhoto+1} de ${publicPhotos.length}`;
  $('albumProgress').setAttribute('aria-valuenow',String(currentPhoto+1));
  $('albumProgressFill').style.width=`${(currentPhoto+1)*100/publicPhotos.length}%`;
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
