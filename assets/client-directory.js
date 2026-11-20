/* Focused filtering for the Clients directory. No effects on Home or the global marquee. */
(()=>{const root=document.getElementById('cldSectorList');if(!root)return;
const groups=[...root.querySelectorAll('[data-cld-sector]')],buttons=[...document.querySelectorAll('[data-cld-filter]')],status=document.getElementById('cldFilterStatus');
const totals={all:16,calzado:3,alimentos:6,industria:4,instituciones:3};
const apply=(key)=>{groups.forEach(group=>{group.hidden=key!=='all'&&group.dataset.cldSector!==key});buttons.forEach(btn=>{const active=btn.dataset.cldFilter===key;btn.classList.toggle('is-current',active);btn.setAttribute('aria-pressed',String(active))});if(status)status.textContent=key==='all'?'Mostrando 16 organizaciones de 4 sectores':`Mostrando ${totals[key]} ${totals[key]===1?'organización':'organizaciones'} del sector seleccionado`;};
buttons.forEach(btn=>btn.addEventListener('click',()=>apply(btn.dataset.cldFilter)));
apply('all');
})();
