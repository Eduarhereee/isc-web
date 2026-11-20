(()=>{'use strict';
const $=(q,base=document)=>base.querySelector(q);
const $$=(q,base=document)=>Array.from(base.querySelectorAll(q));
const root=document.body.dataset.root||'';
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const head=$('#siteHeader'), progress=$('#scrollProgress');
const onScroll=()=>{const y=window.scrollY;head?.classList.toggle('is-scrolled',y>10);if(progress){const available=document.documentElement.scrollHeight-window.innerHeight;progress.style.width=(available>0?100*y/available:0)+'%';}};
window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('resize',onScroll,{passive:true});onScroll();
const toggle=$('#menuButton'),menu=$('#mobileNav');
if(toggle&&menu){const close=()=>{toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Abrir menú');menu.hidden=true;};toggle.addEventListener('click',()=>{const isOpen=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!isOpen));toggle.setAttribute('aria-label',isOpen?'Abrir menú':'Cerrar menú');menu.hidden=isOpen;});$$('a',menu).forEach(a=>a.addEventListener('click',close));document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});window.addEventListener('resize',()=>{if(window.innerWidth>970)close()});}
if(!reduced&&'IntersectionObserver'in window){document.documentElement.classList.add('js-reveal');const observer=new IntersectionObserver(entries=>{for(const ent of entries)if(ent.isIntersecting){ent.target.classList.add('is-visible');observer.unobserve(ent.target)}},{threshold:.1,rootMargin:'0px 0px -28px 0px'});$$('[data-reveal]').forEach(el=>observer.observe(el));}
// Expand only one service at a time. Separate action link never steals the toggle.
$$('[data-service-accordion]').forEach(group=>{$$('[data-service-panel]',group).forEach(panel=>{const button=$('.service-select',panel);if(!button)return;const activate=()=>{$$('[data-service-panel]',group).forEach(p=>{const active=p===panel;p.classList.toggle('is-active',active);$('.service-select',p)?.setAttribute('aria-expanded',String(active))})};button.addEventListener('click',activate);button.addEventListener('focus',activate);panel.addEventListener('mouseenter',()=>{if(window.matchMedia('(hover:hover)').matches)activate()})})});
// Project cards can be filtered independently of their bento ordering.
const projectGrid=$('#projectGrid');if(projectGrid){let group='all',query='';const cards=$$('[data-category]',projectGrid);const update=()=>{let count=0;cards.forEach(card=>{const groupOK=group==='all'||card.dataset.category===group;const q=(card.dataset.title+' '+card.dataset.client+' '+(card.dataset.keywords||'')).toLocaleLowerCase('es-MX');const searchOK=q.includes(query);card.hidden=!(groupOK&&searchOK);if(!card.hidden)count++});$('#projectEmpty').hidden=count>0;};$$('[data-project-filter]').forEach(btn=>btn.addEventListener('click',()=>{group=btn.dataset.projectFilter;$$('[data-project-filter]').forEach(b=>{b.classList.toggle('is-active',b===btn);b.setAttribute('aria-pressed',String(b===btn))});update()}));$('#projectSearch')?.addEventListener('input',e=>{query=e.target.value.toLocaleLowerCase('es-MX').trim();update()});}
// Portfolio photo filter.
const gFilters=$('#galleryFilters'),allGallery=$('#allGallery');if(gFilters&&allGallery){const pictures=$$('[data-category]',allGallery);$$('[data-gallery-filter]',gFilters).forEach(btn=>btn.addEventListener('click',()=>{const name=btn.dataset.galleryFilter;let count=0;pictures.forEach(p=>{p.hidden=name!=='all'&&p.dataset.category!==name;if(!p.hidden)count++});$$('[data-gallery-filter]',gFilters).forEach(b=>{b.classList.toggle('is-active',b===btn);b.setAttribute('aria-pressed',String(b===btn))});$('#photoResults').textContent=`${count} ${count===1?'fotografía':'fotografías'}`}))}
// Shared lightbox for all gallery grids, activated only if a gallery exists.
if($('[data-gallery]')){
 const dlg=document.createElement('dialog');dlg.className='lightbox';dlg.setAttribute('aria-label','Visor de fotografías');dlg.innerHTML=`<div class="lightbox-head"><span id="lightboxSection">REGISTRO FOTOGRÁFICO</span><button type="button" id="lightboxClose" aria-label="Cerrar fotografía">×</button></div><div class="lightbox-display"><img id="lightboxPhoto" alt=""><div class="lightbox-nav"><button id="lightboxPrev" aria-label="Foto anterior" type="button">‹</button><button id="lightboxNext" aria-label="Foto siguiente" type="button">›</button></div></div><div class="lightbox-caption"><span id="lightboxCaption"></span><span id="lightboxCounter"></span></div>`;
 document.body.appendChild(dlg);
 let current=0,photos=[],trigger=null;
 const show=()=>{if(!photos.length)return;const b=photos[current];const image=$('#lightboxPhoto');image.src=b.dataset.image;image.alt=b.dataset.alt||'Fotografía del trabajo';$('#lightboxCaption').textContent=b.dataset.alt||'';$('#lightboxSection').textContent=(b.dataset.caption||'TRABAJO EN CAMPO').toUpperCase();$('#lightboxCounter').textContent=`${current+1} / ${photos.length}`;const many=photos.length>1;$('#lightboxPrev').hidden=!many;$('#lightboxNext').hidden=!many;};
 const move=step=>{current=(current+step+photos.length)%photos.length;show()};
 $$('[data-gallery]').forEach(gallery=>gallery.addEventListener('click',event=>{const b=event.target.closest('[data-image]');if(!b||b.hidden)return;photos=$$('[data-image]',gallery).filter(x=>!x.hidden);current=photos.indexOf(b);trigger=b;show();dlg.showModal()}));
 $('#lightboxClose').addEventListener('click',()=>dlg.close());$('#lightboxPrev').addEventListener('click',()=>move(-1));$('#lightboxNext').addEventListener('click',()=>move(1));
 dlg.addEventListener('close',()=>trigger?.focus());dlg.addEventListener('click',e=>{if(e.target===dlg)dlg.close()});dlg.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')move(-1);if(e.key==='ArrowRight')move(1)});
}
// Quote form: explicit handoff to user's mail application or WhatsApp. No fake success.
const form=$('#contactForm');if(form){const wa=$('#contactWA'),err=$('#formError');const sel=$('select[name=servicio]',form);const q=new URLSearchParams(location.search).get('servicio');if(q){const opt=$$('[data-slug]',sel).find(x=>x.dataset.slug===q);if(opt)sel.value=opt.value}
 const data=()=>new FormData(form);
 const valid=()=>form.checkValidity()&&String(data().get('mensaje')||'').trim().length>0;
 const build=()=>{const d=data();return [`Nueva solicitud de cotización — ISC`,'',`Nombre / empresa: ${d.get('nombre')}`,`Correo: ${d.get('correo')}`,`Teléfono: ${d.get('telefono')||'No indicado'}`,`Especialidad: ${d.get('servicio')}`,'',`Descripción del proyecto:`,`${d.get('mensaje')}`].join('\n')};
 const update=()=>{wa.disabled=!valid();if(valid())err.hidden=true};form.addEventListener('input',update);form.addEventListener('change',update);update();
 const check=()=>{if(!valid()){err.hidden=false;form.reportValidity();return false}err.hidden=true;return true};
 form.addEventListener('submit',e=>{e.preventDefault();if(!check())return;const subject='Solicitud de cotización | ISC';window.location.href='mailto:inservcam.sas@gmail.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(build())});
 wa.addEventListener('click',()=>{if(!check())return;window.open('https://wa.me/522727087984?text='+encodeURIComponent(build()),'_blank','noopener,noreferrer')});
}
})();
// Curated visual archive: 19 stable series, filterable cards and a single accessible viewer.
(()=>{
 const cards=[...document.querySelectorAll('[data-folio-group]')];
 if(!cards.length)return;
 const buttons=[...document.querySelectorAll('[data-folio-filter]')];
 const search=document.getElementById('folioSearch');
 const stage=document.getElementById('folioStage'),stageTitle=document.getElementById('folioStageTitle');
 const stageInfo=document.getElementById('folioStageDescription'),stageCount=document.getElementById('folioStageCount');
 const stagePosition=document.getElementById('folioStagePosition'),stageImages=document.getElementById('folioStageImages');
 const empty=document.getElementById('folioEmpty');
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 let kind='all',term='';
 const select=(card,shouldScroll)=>{
  if(!card||!stageImages)return;
  const n=card.dataset.series;
  const template=document.querySelector(`[data-folio-template="${n}"]`);
  if(!template)return;
  cards.forEach(el=>{el.classList.toggle('is-selected',el===card);el.setAttribute('aria-pressed',String(el===card))});
  stageTitle.textContent=card.querySelector('strong')?.textContent||'Registro fotográfico';
  const count=template.content.querySelectorAll('[data-image]').length;
  stageInfo.textContent=`${count} ${count===1?'fotografía':'fotografías'} de esta serie. Selecciona una imagen para ampliarla.`;
  stageCount.textContent=`${String(count).padStart(2,'0')} ${count===1?'FOTOGRAFÍA':'FOTOGRAFÍAS'}`;
  stagePosition.textContent=`${String(Number(n)+1).padStart(2,'0')} / ${String(cards.length).padStart(2,'0')}`;
  stageImages.replaceChildren(template.content.cloneNode(true));
  stageImages.classList.toggle('is-single',count===1);
  if(shouldScroll){stage.scrollIntoView({behavior:reduced?'instant':'smooth',block:'start'});}
 };
 const update=()=>{
  let visible=0;
  for(const card of cards){
   const matching=(kind==='all'||card.dataset.kind===kind)&&(card.dataset.keywords||'').toLocaleLowerCase('es-MX').includes(term);
   card.hidden=!matching;if(matching)visible++;
  }
  empty.hidden=visible>0;
  const selected=cards.find(x=>x.getAttribute('aria-pressed')==='true'&&!x.hidden);
  if(!selected){const first=cards.find(x=>!x.hidden);if(first)select(first,false);else stage.hidden=true;}
  if(visible>0)stage.hidden=false;
 };
 cards.forEach(card=>card.addEventListener('click',()=>select(card,true)));
 buttons.forEach(b=>b.addEventListener('click',()=>{
  kind=b.dataset.folioFilter;
  buttons.forEach(x=>{x.classList.toggle('is-active',x===b);x.setAttribute('aria-pressed',String(x===b))});
  update();
 }));
 search?.addEventListener('input',()=>{term=search.value.trim().toLocaleLowerCase('es-MX');update()});
 select(cards[0],false);
})();


// Home: grounded sector explorer. Native buttons, roving focus and a single visible panel.
(()=>{
 const host=document.querySelector('[data-sector-explorer]');if(!host)return;
 const tabs=[...host.querySelectorAll('[data-sector-tab]')];
 const panels=[...host.querySelectorAll('[data-sector-panel]')];
 const activate=(index,focus=false)=>{
  tabs.forEach((tab,i)=>{const active=i===index;tab.classList.toggle('is-active',active);tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;if(active&&focus)tab.focus({preventScroll:true});});
  panels.forEach((panel,i)=>{const active=i===index;panel.hidden=!active;panel.classList.toggle('is-active',active);});
 };
 tabs.forEach((tab,index)=>{
  tab.addEventListener('click',()=>activate(index));
  tab.addEventListener('keydown',event=>{let next=null;if(event.key==='ArrowDown'||event.key==='ArrowRight')next=(index+1)%tabs.length;
   else if(event.key==='ArrowUp'||event.key==='ArrowLeft')next=(index-1+tabs.length)%tabs.length;
   else if(event.key==='Home')next=0;else if(event.key==='End')next=tabs.length-1;
   if(next!==null){event.preventDefault();activate(next,true);}
  });
 });
 activate(0);
})();

/* Fallback for external illustrative photography if CDN unavailable. */
document.querySelectorAll('img[data-fallback]').forEach(function (img) {
  img.addEventListener('error', function () {
    var backup=img.getAttribute('data-fallback');
    if(backup && !img.dataset.backupUsed){img.dataset.backupUsed='true';img.src=backup;}
  });
  if(img.complete && img.naturalWidth === 0) {
    var backup=img.getAttribute('data-fallback');
    if(backup){img.dataset.backupUsed='true';img.src=backup;}
  }
});
