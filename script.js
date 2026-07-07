/* ══════════════════════════════════════════════════════════
   ZLATA — logique boutique
   Portique d'âge · catalogue · panier (localStorage) · UI
   ══════════════════════════════════════════════════════════ */

/* ── Logo monogramme DB (triangle inversé, or) ────────── */
function dbLogo(){
  return `<svg viewBox="0 0 100 92" xmlns="http://www.w3.org/2000/svg" fill="none">
    <path d="M7 9 H93 L50 87 Z" stroke="#c9a24d" stroke-width="2.4"/>
    <text x="50" y="50" text-anchor="middle" font-family="Fraunces, Georgia, serif"
          font-weight="600" font-size="38" letter-spacing="-3" fill="#c9a24d">DB</text>
  </svg>`;
}

/* ── Bouteille SVG paramétrable (couleur du liquide) ──── */
function bottleSVG(liquid){
  return `<svg viewBox="0 0 80 220" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g${liquid.slice(1)}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${liquid}" stop-opacity=".55"/>
        <stop offset="1" stop-color="${liquid}"/>
      </linearGradient>
      <linearGradient id="glass" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#fff" stop-opacity=".14"/>
        <stop offset=".5" stop-color="#fff" stop-opacity="0"/>
        <stop offset="1" stop-color="#000" stop-opacity=".2"/>
      </linearGradient>
    </defs>
    <!-- bouchon cire -->
    <rect x="32" y="2" width="16" height="16" rx="2" fill="#3a2a1c"/>
    <path d="M31 16h18l-1 8H32z" fill="#4a3524"/>
    <!-- col + corps -->
    <path d="M35 24h10v26c0 3 12 8 12 20v140a8 8 0 0 1-8 8H31a8 8 0 0 1-8-8V70c0-12 12-17 12-20z"
          fill="url(#g${liquid.slice(1)})" stroke="rgba(255,255,255,.12)" stroke-width="1"/>
    <path d="M35 24h10v26c0 3 12 8 12 20v140a8 8 0 0 1-8 8H31a8 8 0 0 1-8-8V70c0-12 12-17 12-20z"
          fill="url(#glass)"/>
    <!-- étiquette -->
    <rect x="24" y="118" width="32" height="60" rx="2" fill="#171310" opacity=".96" stroke="#c9a24d" stroke-width=".5"/>
    <path d="M33 132 h14 l-7 13 Z" fill="none" stroke="#c9a24d" stroke-width="1"/>
    <text x="40" y="141" font-family="Georgia, serif" font-size="6" fill="#c9a24d" text-anchor="middle" font-weight="700">DB</text>
    <line x1="29" y1="158" x2="51" y2="158" stroke="#c9a24d" stroke-width=".5"/>
    <text x="40" y="169" font-family="Georgia, serif" font-size="4" fill="#b9a88f" text-anchor="middle" letter-spacing=".5">BUTLER</text>
  </svg>`;
}

/* ── Catalogue ────────────────────────────────────────── */
const PRODUCTS = [
  { id:'jabuka',   type:'Pomme · Jabuka',    name:'Eau-de-vie de cidre de pomme', liquid:'#d9a24e',
    notes:'Le cidre distillé — pomme fraîche, fleur, finale nette. Notre signature.',
    abv:'42%', vol:'700 ml', age:'Millésime 2020', price:58, badge:'Signature' },
  { id:'dunja',    type:'Coing · Dunja',     name:'Rakija de coing',   liquid:'#c8a94a',
    notes:'Coing mûr, poire pochée, cire d\'abeille. Non vieillie en fût.',
    abv:'42%', vol:'700 ml', age:'Non boisée', price:55, badge:'' },
  { id:'sljiva',   type:'Prune · Šljiva',    name:'Rakija de prune',   liquid:'#c9861f',
    notes:'La šljivovica classique — prune mûre, noyau, chaleur ronde.',
    abv:'42%', vol:'700 ml', age:'Traditionnelle', price:52, badge:'' },
  { id:'kruska',   type:'Poire · Kruška',    name:'Rakija de poire',   liquid:'#d7c56a',
    notes:'Poire Williams éclatante, fleur blanche. Vive et parfumée.',
    abv:'42%', vol:'700 ml', age:'Vive', price:56, badge:'' },
  { id:'kajsija',  type:'Abricot · Kajsija', name:'Rakija d\'abricot', liquid:'#d99a2b',
    notes:'Abricot sec, amande, miel de montagne. Ronde et florale.',
    abv:'42%', vol:'700 ml', age:'Florale', price:56, badge:'' },
  { id:'coffret',  type:'Coffret · Poklon',  name:'Coffret Découverte',liquid:'#d9a24e',
    notes:'Trois eaux-de-vie en fioles — pomme, coing, prune. Écrin gravé.',
    abv:'—', vol:'3×20cl', age:'Assortiment', price:79, badge:'Cadeau' },
];

/* ── État panier ──────────────────────────────────────── */
const STORE = 'butler_cart';
let cart = JSON.parse(localStorage.getItem(STORE) || '{}');
const CHF = n => 'CHF ' + n.toFixed(0) + '.–';
const save = () => localStorage.setItem(STORE, JSON.stringify(cart));
const totalQty = () => Object.values(cart).reduce((a,b)=>a+b,0);
const totalSum = () => Object.entries(cart).reduce((s,[id,q])=>{
  const p = PRODUCTS.find(x=>x.id===id); return s + (p ? p.price*q : 0);
},0);

/* ── Rendu catalogue ──────────────────────────────────── */
function renderGrid(){
  document.getElementById('productGrid').innerHTML = PRODUCTS.map(p => `
    <article class="card">
      ${p.badge ? `<span class="card__badge">${p.badge}</span>` : ''}
      <div class="card__bottle">${bottleSVG(p.liquid)}</div>
      <p class="card__type">${p.type}</p>
      <h3 class="card__name">${p.name}</h3>
      <p class="card__notes">${p.notes}</p>
      <div class="card__meta"><span>${p.abv}</span><span>${p.vol}</span><span>${p.age}</span></div>
      <div class="card__foot">
        <p class="card__price">${CHF(p.price)}</p>
        <button class="card__add" data-add="${p.id}">Ajouter</button>
      </div>
    </article>`).join('');
}

/* ── Rendu panier ─────────────────────────────────────── */
function renderCart(){
  const body = document.getElementById('drawerBody');
  const ids = Object.keys(cart);
  if(!ids.length){
    body.innerHTML = '<p class="drawer__empty">Votre panier est vide.<br>La Šumadija vous attend.</p>';
  } else {
    body.innerHTML = ids.map(id=>{
      const p = PRODUCTS.find(x=>x.id===id); if(!p) return '';
      const q = cart[id];
      return `<div class="line">
        <div class="line__bottle">${bottleSVG(p.liquid)}</div>
        <div class="line__info">
          <div class="line__name">${p.name}</div>
          <div class="line__price">${CHF(p.price)} · ${p.vol}</div>
        </div>
        <div class="qty">
          <button data-dec="${id}" aria-label="Retirer un">−</button>
          <span>${q}</span>
          <button data-inc="${id}" aria-label="Ajouter un">+</button>
        </div>
        <div class="line__sub">${CHF(p.price*q)}</div>
      </div>`;
    }).join('');
  }
  // total + livraison
  document.getElementById('drawerTotal').textContent = CHF(totalSum());
  const q = totalQty();
  const ship = document.getElementById('drawerShip');
  if(q === 0) ship.textContent = '';
  else if(q >= 3) ship.textContent = '✓ Livraison offerte incluse';
  else ship.textContent = `Plus que ${3-q} bouteille${3-q>1?'s':''} pour la livraison offerte`;
  // badge header
  const count = document.getElementById('cartCount');
  count.textContent = q;
  count.classList.toggle('show', q>0);
}

/* ── Actions panier ───────────────────────────────────── */
function add(id){ cart[id] = (cart[id]||0)+1; save(); renderCart(); toast('Ajouté au panier'); }
function inc(id){ cart[id]++; save(); renderCart(); }
function dec(id){ cart[id]--; if(cart[id]<=0) delete cart[id]; save(); renderCart(); }

/* ── Toast ────────────────────────────────────────────── */
let toastTimer;
function toast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>t.classList.remove('show'), 2200);
}

/* ── Tiroir ───────────────────────────────────────────── */
const drawer = document.getElementById('drawer');
const scrim  = document.getElementById('scrim');
function openCart(){ drawer.classList.add('open'); scrim.classList.add('open'); }
function closeCart(){ drawer.classList.remove('open'); scrim.classList.remove('open'); }

/* ── Portique d'âge ───────────────────────────────────── */
function initAgeGate(){
  const gate = document.getElementById('ageGate');
  const deny = document.getElementById('ageDeny');
  if(sessionStorage.getItem('butler_age') === 'ok'){
    gate.remove(); return;
  }
  document.body.classList.add('locked');
  document.getElementById('ageYes').addEventListener('click', ()=>{
    sessionStorage.setItem('butler_age','ok');
    gate.style.opacity='0'; gate.style.transition='opacity .5s';
    setTimeout(()=>{ gate.remove(); document.body.classList.remove('locked'); }, 500);
  });
  document.getElementById('ageNo').addEventListener('click', ()=>{
    gate.remove(); deny.hidden = false;
  });
}

/* ── Révélations au scroll ────────────────────────────── */
function initReveal(){
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold:.12, rootMargin:'0px 0px -60px 0px' });
  document.querySelectorAll('.reveal').forEach((el,i)=>{
    el.style.transitionDelay = (i % 4 * 0.08) + 's';
    io.observe(el);
  });
}

/* ── Init ─────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', ()=>{
  initAgeGate();
  renderGrid();
  renderCart();
  initReveal();

  // injecte la bouteille du héros + les logos DB
  const heroBottle = document.querySelector('.bottle--hero');
  if(heroBottle) heroBottle.innerHTML = bottleSVG('#d9a24e');
  const brandLogo = document.getElementById('brandLogo');
  if(brandLogo) brandLogo.innerHTML = dbLogo();
  const ageLogo = document.getElementById('ageLogo');
  if(ageLogo) ageLogo.innerHTML = dbLogo();

  // délégation clics (catalogue + panier)
  document.addEventListener('click', (e)=>{
    const a = e.target.closest('[data-add]'); if(a){ add(a.dataset.add); }
    const i = e.target.closest('[data-inc]'); if(i){ inc(i.dataset.inc); }
    const d = e.target.closest('[data-dec]'); if(d){ dec(d.dataset.dec); }
  });

  // ouverture / fermeture panier
  document.getElementById('cartBtn').addEventListener('click', openCart);
  document.getElementById('drawerClose').addEventListener('click', closeCart);
  scrim.addEventListener('click', closeCart);
  document.getElementById('cartBtn').addEventListener('click', ()=>{ /* ouvre déjà */ });
  document.getElementById('checkoutBtn').addEventListener('click', ()=>{
    if(totalQty()===0){ toast('Votre panier est vide'); return; }
    toast('Démo — paiement à connecter (Stripe/Twint)');
  });

  // header au scroll
  const header = document.getElementById('header');
  const onScroll = ()=> header.classList.toggle('scrolled', window.scrollY > 40);
  onScroll(); window.addEventListener('scroll', onScroll, { passive:true });

  // menu mobile
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  burger.addEventListener('click', ()=> nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(l=> l.addEventListener('click', ()=> nav.classList.remove('open')));

  // newsletter (démo)
  document.getElementById('letterForm').addEventListener('submit', (e)=>{
    e.preventDefault();
    document.getElementById('letterNote').textContent = 'Merci — bienvenue dans le carnet de la maison ✦';
    e.target.reset();
  });

  // Échap ferme le tiroir
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeCart(); });
});
