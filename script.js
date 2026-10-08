// ===== HELPERS =========================================================
var revealObserver = null;
if('IntersectionObserver' in window){
  revealObserver = new IntersectionObserver(function(entries){
    for(var i = 0; i < entries.length; i++){
      if(entries[i].isIntersecting){
        entries[i].target.classList.add('in');
        revealObserver.unobserve(entries[i].target);
      }
    }
  }, { threshold: 0.12 });
}
function observeReveal(root){
  var els = root.querySelectorAll('.card, .club-card, .why-card, .tl');
  for(var i = 0; i < els.length; i++){
    els[i].style.transitionDelay = (i * 80) + 'ms';
    if(revealObserver){ revealObserver.observe(els[i]); } else { els[i].classList.add('in'); }
  }
  addTilt(root);
}
function observeList(selector){
  var els = document.querySelectorAll(selector);
  for(var i = 0; i < els.length; i++){
    els[i].style.transitionDelay = (i * 90) + 'ms';
    if(revealObserver){ revealObserver.observe(els[i]); } else { els[i].classList.add('in'); }
  }
}
function setupImgFallback(box, img){
  img.addEventListener('error', function(){
    var fb = img.getAttribute('data-fallback');
    if(fb && !img.getAttribute('data-tried')){
      img.setAttribute('data-tried', '1');
      img.src = fb;
    } else {
      box.classList.add('img-missing');
    }
  });
}

// 3D tilt on cards (desktop only)
function addTilt(root){
  if(window.matchMedia && window.matchMedia('(pointer:coarse)').matches) return;
  var cards = root.querySelectorAll('.card, .club-card');
  for(var i = 0; i < cards.length; i++){
    (function(c){
      if(c.getAttribute('data-tilt')) return;
      c.setAttribute('data-tilt', '1');
      c.addEventListener('mousemove', function(e){
        var r = c.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        c.style.transition = 'transform .1s, box-shadow .3s';
        c.style.transform = 'perspective(700px) rotateX(' + (-y * 8) + 'deg) rotateY(' + (x * 8) + 'deg) translateY(-6px)';
      });
      c.addEventListener('mouseleave', function(){
        c.style.transition = 'transform .5s, box-shadow .3s';
        c.style.transform = '';
      });
    })(cards[i]);
  }
}

// ===== RENDER ==========================================================
function renderTicker(){
  var el = document.getElementById('tickerTrack');
  if(!el) return;
  var html = '';
  for(var r = 0; r < 2; r++){
    for(var i = 0; i < NOTICES.length; i++){
      html += '<a href="' + NOTICES[i].url + '" target="_blank" rel="noopener">' + NOTICES[i].text + '</a>';
    }
  }
  el.innerHTML = html;
}

function renderWhy(){
  var grid = document.getElementById('whyGrid');
  if(!grid) return;
  var html = '';
  for(var i = 0; i < WHY.length; i++){
    html += '<div class="why-card"><div class="ic">' + WHY[i].icon + '</div>';
    html += '<div><h3>' + WHY[i].title + '</h3><p>' + WHY[i].text + '</p></div></div>';
  }
  grid.innerHTML = html;
  observeReveal(grid);
}

function renderServices(list){
  var grid = document.getElementById('serviceGrid');
  if(!grid) return;
  if(list.length === 0){ grid.innerHTML = '<p class="empty">No services match your search.</p>'; return; }
  var html = '';
  for(var i = 0; i < list.length; i++){
    var s = list[i];
    html += '<div class="card"><div class="meta">' + s.category + '</div>';
    html += '<h3>' + s.name + '</h3><p>' + s.desc + '</p>';
    html += '<div class="contact">' + s.contact + '</div></div>';
  }
  grid.innerHTML = html;
  observeReveal(grid);
}

function renderEvents(list){
  var grid = document.getElementById('eventGrid');
  if(!grid) return;
  if(list.length === 0){ grid.innerHTML = '<p class="empty">No events match your search.</p>'; return; }
  var html = '';
  for(var i = 0; i < list.length; i++){
    var e = list[i];
    html += '<div class="card card--event"><div class="ev-img">' + e.emoji + '<img src="' + e.img + '" alt="' + e.name + '" loading="lazy" decoding="async" data-fallback="' + e.imgBackup + '" /></div>';
    html += '<div class="ev-body"><div class="meta">' + e.venue + '</div>';
    html += '<h3>' + e.name + '</h3><p>' + e.desc + '</p></div></div>';
  }
  grid.innerHTML = html;
  var boxes = grid.querySelectorAll('.ev-img');
  for(var j = 0; j < boxes.length; j++){ setupImgFallback(boxes[j], boxes[j].querySelector('img')); }
  observeReveal(grid);
}

function renderUpcoming(){
  var wrap = document.getElementById('upcomingList');
  if(!wrap) return;
  var now = new Date();
  var html = '';
  for(var i = 0; i < UPCOMING.length; i++){
    var u = UPCOMING[i];
    var done = new Date(u.end + 'T23:59:59') < now;
    html += '<a class="tl" href="' + u.url + '" target="_blank" rel="noopener">';
    html += '<div class="tl__date"><b>' + u.day + '</b><span>' + u.mon + '</span></div>';
    html += '<div class="tl__info"><h4>' + u.name + '</h4><p>By ' + u.by + '</p></div>';
    html += '<span class="tl__badge' + (done ? ' tl__badge--done' : '') + '">' + (done ? 'Completed' : 'Upcoming') + '</span></a>';
  }
  wrap.innerHTML = html;
  observeReveal(wrap);
}

function renderClubs(list){
  var grid = document.getElementById('clubGrid');
  if(!grid) return;
  if(list.length === 0){ grid.innerHTML = '<p class="empty">No clubs match your search.</p>'; return; }
  var html = '';
  for(var i = 0; i < list.length; i++){
    var c = list[i];
    html += '<div class="club-card"><div class="club-top"><div class="club-av">' + c.name.charAt(0) + '</div><h3>' + c.name + '</h3></div><dl>';
    html += '<dt>Student Convener</dt><dd>' + c.convener + '</dd>';
    html += '<dt>Faculty In-charge</dt><dd>' + c.faculty + '</dd></dl>';
    html += '<a class="club-link" href="https://miet.ac.in/clubs-societies-detail.php?page=' + encodeURIComponent(c.name) + '" target="_blank" rel="noopener">View official page &rarr;</a></div>';
  }
  grid.innerHTML = html;
  observeReveal(grid);
}

function renderClubMarquee(){
  var el = document.getElementById('clubMarquee');
  if(!el) return;
  var html = '';
  for(var r = 0; r < 2; r++){
    for(var i = 0; i < CLUBS.length; i++){ html += '<span>' + CLUBS[i].name + '</span>'; }
  }
  el.innerHTML = html;
}

function renderServiceFilters(){
  var wrap = document.getElementById('serviceFilters');
  if(!wrap) return;
  var cats = ['All'];
  for(var i = 0; i < SERVICES.length; i++){
    if(cats.indexOf(SERVICES[i].category) === -1) cats.push(SERVICES[i].category);
  }
  var html = '';
  for(var j = 0; j < cats.length; j++){
    html += '<button data-filter="' + cats[j] + '" class="' + (j === 0 ? 'is-active' : '') + '">' + cats[j] + '</button>';
  }
  wrap.innerHTML = html;
  wrap.addEventListener('click', function(e){
    var btn = e.target.closest('button');
    if(!btn) return;
    var all = wrap.querySelectorAll('button');
    for(var k = 0; k < all.length; k++) all[k].classList.remove('is-active');
    btn.classList.add('is-active');
    var cat = btn.getAttribute('data-filter');
    if(cat === 'All'){ renderServices(SERVICES); }
    else { renderServices(SERVICES.filter(function(s){ return s.category === cat; })); }
  });
}

function renderStats(){
  var wrap = document.getElementById('statsInner');
  if(!wrap) return;
  var years = new Date().getFullYear() - 1997;
  var items = [
    { n: years, label: 'Years of MIET (since 1997)' },
    { n: CLUBS.length, label: 'Clubs & Societies' },
    { n: SERVICES.length, label: 'Student Services' },
    { n: EVENTS.length, label: 'Flagship Events' }
  ];
  var html = '';
  for(var i = 0; i < items.length; i++){
    html += '<div class="stat"><div class="stat__num" data-target="' + items[i].n + '">0</div><div class="stat__label">' + items[i].label + '</div></div>';
  }
  wrap.innerHTML = html;
}

function animateCounters(){
  var nums = document.querySelectorAll('.stat__num');
  var started = false;
  function run(){
    if(started) return;
    started = true;
    for(var i = 0; i < nums.length; i++){
      (function(el){
        var target = parseInt(el.getAttribute('data-target'), 10);
        var t0 = null;
        function step(ts){
          if(!t0) t0 = ts;
          var p = Math.min((ts - t0) / 1400, 1);
          el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
          if(p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      })(nums[i]);
    }
  }
  var stats = document.getElementById('stats');
  if(!stats) return;
  if('IntersectionObserver' in window){
    var o = new IntersectionObserver(function(entries){
      if(entries[0].isIntersecting){ run(); o.disconnect(); }
    }, { threshold: 0.4 });
    o.observe(stats);
  } else { run(); }
}

// ===== SEARCH ==========================================================
function runSearch(query){
  var q = query.trim().toLowerCase();
  if(!q){ renderServices(SERVICES); renderEvents(EVENTS); renderClubs(CLUBS); return; }
  renderServices(SERVICES.filter(function(s){ return (s.name + s.category + s.desc).toLowerCase().indexOf(q) !== -1; }));
  renderEvents(EVENTS.filter(function(e){ return (e.name + e.venue + e.desc).toLowerCase().indexOf(q) !== -1; }));
  renderClubs(CLUBS.filter(function(c){ return (c.name + c.convener + c.faculty).toLowerCase().indexOf(q) !== -1; }));
}
var searchForm = document.getElementById('searchForm');
var searchInput = document.getElementById('searchInput');
if(searchForm){
  searchForm.addEventListener('submit', function(e){
    e.preventDefault();
    runSearch(searchInput ? searchInput.value : '');
    var t = document.getElementById('services');
    if(t) t.scrollIntoView({ behavior: 'smooth' });
  });
}
if(searchInput){ searchInput.addEventListener('input', function(e){ runSearch(e.target.value); }); }

// ===== SCROLL EFFECTS ==================================================
window.addEventListener('scroll', function(){
  var nav = document.getElementById('nav');
  var bar = document.getElementById('progress');
  var top = document.getElementById('toTop');
  var y = window.scrollY || window.pageYOffset;
  var max = document.documentElement.scrollHeight - window.innerHeight;
  if(nav){ if(y > 60){ nav.classList.add('scrolled'); } else { nav.classList.remove('scrolled'); } }
  if(bar && max > 0){ bar.style.width = (y / max * 100) + '%'; }
  if(top){ if(y > 600){ top.classList.add('show'); } else { top.classList.remove('show'); } }
});
var toTopBtn = document.getElementById('toTop');
if(toTopBtn){ toTopBtn.addEventListener('click', function(){ window.scrollTo({ top: 0, behavior: 'smooth' }); }); }

// cursor glow (cheap: transform only, one update per frame)
var glowEl = document.getElementById('glow');
if(glowEl && !(window.matchMedia && window.matchMedia('(pointer:coarse)').matches)){
  var gx = -500, gy = -500, gTick = false;
  document.addEventListener('mousemove', function(e){
    gx = e.clientX; gy = e.clientY;
    if(!gTick){
      gTick = true;
      requestAnimationFrame(function(){
        glowEl.style.transform = 'translate3d(' + (gx - 190) + 'px,' + (gy - 190) + 'px,0)';
        gTick = false;
      });
    }
  });
}

// rotating hero word
function initRotWord(){
  var el = document.getElementById('rotWord');
  if(!el) return;
  var words = ['Connect.', 'Collaborate.', 'Create.', 'Grow.'];
  var i = 0;
  setInterval(function(){
    el.classList.add('out');
    setTimeout(function(){
      i = (i + 1) % words.length;
      el.textContent = words[i];
      el.classList.remove('out');
    }, 350);
  }, 2400);
}

// ===== HERO SLIDESHOW (shows the first photo as soon as it loads) ======
function initSlideshow(){
  var wrap = document.getElementById('heroSlides');
  if(!wrap) return;
  var slides = [];
  var idx = 0;
  var timer = null;

  function addSlide(src){
    var div = document.createElement('div');
    div.className = 'slide';
    div.style.backgroundImage = "url('" + src + "')";
    wrap.appendChild(div);
    slides.push(div);
    if(slides.length === 1){
      requestAnimationFrame(function(){ div.classList.add('active'); });
    }
    if(slides.length === 2 && !timer){
      timer = setInterval(function(){
        slides[idx].classList.remove('active');
        idx = (idx + 1) % slides.length;
        slides[idx].classList.add('active');
      }, 5500);
    }
  }

  function loadOne(entry){
    var im = new Image();
    im.onload = function(){ addSlide(entry.local); };
    im.onerror = function(){
      var im2 = new Image();
      im2.onload = function(){ addSlide(entry.remote); };
      im2.src = entry.remote;
    };
    im.src = entry.local;
  }

  // first photo right away, the rest only after the page has finished loading
  loadOne(HERO_IMAGES[0]);
  function loadRest(){
    for(var i = 1; i < HERO_IMAGES.length; i++){ loadOne(HERO_IMAGES[i]); }
  }
  if(document.readyState === 'complete'){ setTimeout(loadRest, 100); }
  else { window.addEventListener('load', function(){ setTimeout(loadRest, 100); }); }
}

// ===== HERO CANVAS (lighter: no per-frame blur, pauses when off-screen) =
function initHeroCanvas(){
  var canvas = document.getElementById('heroCanvas');
  if(!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext('2d');
  var w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  var dots = [], floaters = [];
  var running = false;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resize(){
    var r = canvas.getBoundingClientRect();
    w = r.width; h = r.height;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener('resize', resize);

  for(var i = 0; i < 90; i++){ dots.push({ a: Math.PI + (i / 89) * Math.PI, off: Math.random() * 6.28, size: 1 + Math.random() * 2 }); }
  for(var j = 0; j < 28; j++){ floaters.push({ x: Math.random(), y: Math.random(), s: 0.5 + Math.random() * 1.4, v: 0.00006 + Math.random() * 0.0002 }); }

  function frame(t){
    if(!running) return;
    ctx.clearRect(0, 0, w, h);
    var cx = w / 2, cy = h * 0.94, R = Math.min(w * 0.46, h * 0.64);

    var g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.95);
    var pulse = 0.55 + 0.25 * Math.sin(t / 900);
    g.addColorStop(0, 'rgba(92,200,255,' + (0.38 * pulse) + ')');
    g.addColorStop(1, 'rgba(31,79,224,0)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);

    // glow without shadowBlur: three strokes, wide and faint to thin and bright
    ctx.strokeStyle = 'rgba(92,200,255,0.10)'; ctx.lineWidth = 12;
    ctx.beginPath(); ctx.arc(cx, cy, R, Math.PI, Math.PI * 2); ctx.stroke();
    ctx.strokeStyle = 'rgba(92,200,255,0.22)'; ctx.lineWidth = 5;
    ctx.beginPath(); ctx.arc(cx, cy, R, Math.PI, Math.PI * 2); ctx.stroke();
    ctx.strokeStyle = 'rgba(160,225,255,0.75)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(cx, cy, R, Math.PI, Math.PI * 2); ctx.stroke();
    ctx.strokeStyle = 'rgba(255,176,32,0.35)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(cx, cy, R * 0.82, Math.PI, Math.PI * 2); ctx.stroke();

    for(var i = 0; i < dots.length; i++){
      var d = dots[i];
      var wave = Math.sin(t / 700 + d.off + i * 0.08);
      var rr = R + wave * 14;
      ctx.fillStyle = 'rgba(255,255,255,' + (0.35 + 0.4 * (wave + 1) / 2) + ')';
      ctx.fillRect(cx + Math.cos(d.a) * rr, cy + Math.sin(d.a) * rr, d.size + 1, d.size + 1);
    }

    var sweep = Math.PI + ((t / 4000) % 1) * Math.PI;
    var sx = cx + Math.cos(sweep) * R, sy = cy + Math.sin(sweep) * R;
    var sg = ctx.createRadialGradient(sx, sy, 0, sx, sy, 56);
    sg.addColorStop(0, 'rgba(255,255,255,0.95)'); sg.addColorStop(1, 'rgba(92,200,255,0)');
    ctx.fillStyle = sg; ctx.beginPath(); ctx.arc(sx, sy, 56, 0, 6.28); ctx.fill();

    ctx.fillStyle = 'rgba(255,255,255,0.45)';
    for(var j = 0; j < floaters.length; j++){
      var f = floaters[j];
      f.y -= f.v * 16;
      if(f.y < 0){ f.y = 1; f.x = Math.random(); }
      ctx.beginPath(); ctx.arc(f.x * w, f.y * h, f.s, 0, 6.28); ctx.fill();
    }
    requestAnimationFrame(frame);
  }

  function start(){ if(!running && !reduce){ running = true; requestAnimationFrame(frame); } }
  function stop(){ running = false; }

  if('IntersectionObserver' in window){
    new IntersectionObserver(function(entries){
      if(entries[0].isIntersecting){ start(); } else { stop(); }
    }, { threshold: 0.05 }).observe(canvas);
  } else { start(); }
}

// ===== INIT ============================================================
renderTicker();
renderStats();
renderWhy();
renderServiceFilters();
renderServices(SERVICES);
renderEvents(EVENTS);
renderUpcoming();
renderClubMarquee();
renderClubs(CLUBS);
observeList('.section__head, .quick__item, .filters, .sub, .marquee, .cta');
animateCounters();
initRotWord();
initSlideshow();
initHeroCanvas();