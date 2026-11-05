// Course player. Shows one level at a time; the next level unlocks when every
// module in the previous one is marked complete. Progress is saved in this browser only.
(function () {
  var levels = window.COURSE.levels;
  var modules = window.COURSE.modules;
  var concepts = window.COURSE.concepts;
  var YT = 'https://www.youtube.com/watch?v=';
  var KEY = 'ds-course-progress';

  // n is a module's permanent id (progress, links); no is its position, shown to learners
  modules.forEach(function (m, i) { m.no = i + 1; });
  function byId(n) { for (var i = 0; i < modules.length; i++) if (modules[i].n === n) return modules[i]; return null; }

  var $ = function (id) { return document.getElementById(id); };
  var player = $('player'), lesson = $('lesson');

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  // Material Symbols icons (font loaded in index.html)
  function ic(name, cls) { return '<span class="icon ' + (cls || '') + '" aria-hidden="true">' + name + '</span>'; }
  var icon = {
    arrow: ic('arrow_outward', 'mt-0.5 flex-none text-[18px]'),
    play: ic('play_arrow', 'icon-fill text-[30px]'),
    lock: ic('lock', 'mr-1 text-[14px]'),
    next: ic('arrow_forward', 'text-[15px]'),
    back: ic('arrow_back', 'text-[15px]')
  };

  // Filled check circle, the same tick used in the sidebar
  function tick(color) { return ic('check_circle', 'icon-fill mr-1 text-[17px] ' + color); }

  // ---- Progress ----
  var done = {};
  try { (JSON.parse(localStorage.getItem(KEY)) || []).forEach(function (n) { done[n] = true; }); } catch (e) {}
  function save() { try { localStorage.setItem(KEY, JSON.stringify(Object.keys(done).map(Number))); } catch (e) {} }

  // ---- Levels ----
  function levelOf(m) { for (var i = 0; i < levels.length; i++) if (levels[i].key === m.level) return i; return 0; }
  function modsOf(i) { return modules.filter(function (m) { return m.level === levels[i].key; }); }
  function doneIn(i) { return modsOf(i).filter(function (m) { return done[m.n]; }).length; }
  function complete(i) { return doneIn(i) === modsOf(i).length; }
  function blocker(i) { for (var j = 0; j < i; j++) if (!complete(j)) return j; return -1; }
  function unlocked(i) { return blocker(i) === -1; }
  function range(i) { var ms = modsOf(i); return 'Modules ' + pad(ms[0].no) + '–' + pad(ms[ms.length - 1].no); }

  var current = 1, level = 0;

  // ---- Learning path: level tabs ----
  function renderTrack() {
    $('track').innerHTML = levels.map(function (l, i) {
      var open = unlocked(i), total = modsOf(i).length;
      var status = !open ? icon.lock + 'Locked' : complete(i) ? tick('text-blue') + 'Completed' : doneIn(i) + ' of ' + total + ' done';
      return '<button type="button" data-level="' + i + '" aria-current="' + (i === level) + '"' +
        ' class="flex flex-row-reverse items-baseline justify-between gap-4 border-t border-night-line py-3 text-left text-night-muted transition-colors hover:text-white aria-[current=true]:border-white aria-[current=true]:text-white sm:grid sm:content-start sm:gap-1.5 sm:pb-0 sm:pt-4">' +
        '<span class="font-mono text-xs tracking-[.02em] text-night-muted">' + range(i) + ' · ' + status + '</span>' +
        '<span class="text-lg tracking-[-0.02em] sm:text-xl">' + esc(l.name) + '</span></button>';
    }).join('');
  }

  // ---- Sidebar: modules of the current level only ----
  function renderIndex() {
    var ms = modsOf(level);
    // Group consecutive modules by topic, e.g. Foundations, Components
    var groups = [];
    ms.forEach(function (m) {
      var g = groups[groups.length - 1];
      if (!g || g.topic !== m.topic) groups.push(g = { topic: m.topic, mods: [] });
      g.mods.push(m);
    });
    $('index').innerHTML = groups.map(function (g) {
      return '<div class="contents md:mt-4 md:block md:first:mt-0">' +
        '<span class="eyebrow hidden px-3 pb-1.5 pt-3 md:block">' + esc(g.topic) + '</span>' +
        g.mods.map(moduleButton).join('') + '</div>';
    }).join('');
  }

  function moduleButton(m) {
        return '<button type="button" data-n="' + m.n + '" data-done="' + !!done[m.n] + '" aria-current="' + (m.n === current) + '" aria-label="Module ' + pad(m.no) + ': ' + esc(m.title) + '"' +
          ' class="group grid h-12 w-12 flex-none place-items-center rounded-md border border-line data-[done=true]:border-blue aria-[current=true]:bg-ink aria-[current=true]:text-paper' +
          ' md:h-auto md:w-full md:grid-cols-[24px_minmax(0,1fr)_18px] md:place-items-stretch md:items-center md:gap-2.5 md:rounded-md md:border-0 md:px-3 md:py-2.5 md:text-left md:text-[15px] md:leading-[1.3] md:[&:not([aria-current=true]):hover]:bg-card">' +
          '<span class="font-mono text-xs tabular-nums text-muted group-data-[done=true]:text-blue group-aria-[current=true]:text-night-muted">' + pad(m.no) + '</span>' +
          '<span class="hidden md:block">' + esc(m.title) + '</span>' +
          ic('check_circle', 'icon-fill hidden text-[18px] text-transparent group-data-[done=true]:text-blue md:inline-block') +
          '</button>';
  }

  // ---- One lesson ----
  function lessonHTML(m) {
    var ms = modsOf(level), pos = ms.indexOf(m), on = !!done[m.n];
    var prev = ms[pos - 1], next = ms[pos + 1];

    var videos = m.videos.length
      ? '<ul class="grid grid-cols-1 gap-6 sm:grid-cols-2">' + m.videos.map(function (v) {
          var id = v[1].split('&')[0];
          return '<li><a class="group grid gap-3" href="' + YT + v[1] + '" target="_blank" rel="noopener">' +
            '<span class="relative block aspect-video overflow-hidden bg-line">' +
              '<img class="block h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" src="thumbs/' + id + '.jpg" alt="" width="1280" height="720">' +
              '<span class="absolute bottom-4 left-4 grid h-[52px] w-[52px] place-items-center rounded-md bg-paper text-ink transition-colors group-hover:bg-blue group-hover:text-white" aria-hidden="true">' + icon.play + '</span>' +
            '</span>' +
            '<span class="flex justify-between gap-3 leading-[1.35] group-hover:text-blue"><span>' + esc(v[0]) + '</span>' + icon.arrow + '</span></a></li>';
        }).join('') + '</ul>'
      : '<p class="border border-dashed border-line px-5 py-[18px] text-[15px] text-muted">Videos for this module will be added soon.</p>';

    var navBtn = 'grid gap-1 rounded-md border border-line px-5 py-4 text-left hover:border-ink';
    var nextBtn = navBtn + ' sm:col-start-2 sm:text-right';
    var nextHTML;
    if (next) {
      nextHTML = '<button type="button" class="' + nextBtn + '" data-go="' + next.n + '"><span class="eyebrow">Next ' + icon.next + '</span><span class="text-[17px] tracking-[-0.01em]">' + pad(next.no) + ' ' + esc(next.title) + '</span></button>';
    } else if (level < levels.length - 1) {
      var nl = levels[level + 1];
      nextHTML = unlocked(level + 1)
        ? '<button type="button" class="' + nextBtn + ' border-blue bg-blue text-white hover:border-blue hover:bg-ink" data-level="' + (level + 1) + '"><span class="font-mono text-xs tracking-[.02em] text-white/70">Next level ' + icon.next + '</span><span class="text-[17px] tracking-[-0.01em]">Start ' + esc(nl.name) + '</span></button>'
        : '<div class="grid gap-1 rounded-md border border-dashed border-line px-5 py-4 text-muted sm:col-start-2 sm:text-right"><span class="eyebrow">' + icon.lock + esc(nl.name) + ' is locked</span><span class="text-[15px]">Mark all ' + ms.length + ' ' + esc(levels[level].name) + ' modules complete to unlock it.</span></div>';
    } else {
      nextHTML = '<a class="' + nextBtn + '" href="#final"><span class="eyebrow">Next ' + icon.next + '</span><span class="text-[17px] tracking-[-0.01em]">Final project</span></a>';
    }

    return '<header class="grid gap-4 border-b border-line pb-9">' +
        '<p class="eyebrow">' + esc(levels[level].name) + ' · Module ' + pad(m.no) +
          (on ? '<span class="ml-2.5 rounded-md bg-blue-soft px-2.5 py-[3px] font-sans text-xs text-blue">Completed</span>' : '') + '</p>' +
        '<h3 class="text-[clamp(32px,4vw,54px)] leading-[1.04] tracking-[-0.04em]">' + esc(m.title) + '</h3>' +
        '<p class="max-w-[56ch] text-lg text-muted">' + esc(m.desc) + '</p>' +
      '</header>' +
      videos +
      '<div class="grid grid-cols-1 items-start gap-8 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:gap-12">' +
        '<div class="grid gap-3.5"><p class="eyebrow">In this module</p><ul class="border-t border-ink">' +
          m.topics.map(function (t) { return '<li class="border-b border-line py-[13px]">' + esc(t) + '</li>'; }).join('') + '</ul></div>' +
        '<aside class="grid justify-items-start gap-5 rounded-md bg-night p-6 text-white sm:p-7">' +
          '<p class="eyebrow text-night-muted">' + (m.exercise ? 'Try it in Figma' : 'Think about it') + '</p>' +
          '<p class="text-[clamp(22px,2vw,26px)] leading-[1.2] tracking-[-0.025em]">' + esc(m.exercise || 'Where could a Design System help the products you work on?') + '</p>' +
          '<button type="button" class="complete mt-1 inline-flex items-center gap-2 whitespace-nowrap rounded-md border border-white px-[18px] py-2.5 text-sm text-white hover:bg-white hover:text-night aria-pressed:border-blue aria-pressed:bg-blue aria-pressed:text-white" aria-pressed="' + on + '">' +
            (on ? tick('text-white') + 'Completed' : 'Mark as complete') + '</button>' +
        '</aside>' +
      '</div>' +
      '<nav class="grid grid-cols-1 gap-4 border-t border-line pt-8 sm:grid-cols-2" aria-label="Lesson">' +
        (prev ? '<button type="button" class="' + navBtn + '" data-go="' + prev.n + '"><span class="eyebrow">' + icon.back + ' Previous</span><span class="text-[17px] tracking-[-0.01em]">' + pad(prev.no) + ' ' + esc(prev.title) + '</span></button>' : '') +
        nextHTML +
      '</nav>';
  }

  // ---- Practice: exercises of the current level ----
  function renderPractice() {
    $('practice-title').textContent = levels[level].name + ' exercises';
    $('practice-list').innerHTML = modsOf(level).filter(function (m) { return m.exercise; }).map(function (m, i) {
      var on = !!done[m.n];
      return '<li><a class="group flex h-full flex-col gap-4 rounded-md border border-line bg-card p-[22px] transition-colors hover:border-ink data-[done=true]:bg-paper sm:min-h-[210px]" href="#m' + m.n + '" data-open="' + m.n + '" data-done="' + on + '">' +
        '<span class="flex items-center justify-between gap-2"><span class="eyebrow text-blue">Exercise ' + pad(i + 1) + '</span>' +
          (on ? '<span class="inline-flex items-center text-xs text-blue">' + tick('text-blue') + 'Done</span>' : '') + '</span>' +
        '<span class="text-xl leading-[1.25] tracking-[-0.02em]">' + esc(m.exercise.replace(/\.$/, '')) + '</span>' +
        '<span class="mt-auto flex justify-between gap-2 border-t border-line pt-3.5 text-[13px] text-muted group-hover:text-ink"><span>Module ' + pad(m.no) + ' · ' + esc(m.title) + '</span>' + ic('arrow_forward', 'flex-none text-[16px]') + '</span>' +
        '</a></li>';
    }).join('');
    $('final').setAttribute('data-show', level === levels.length - 1 ? 'true' : 'false');
  }

  // ---- Concepts ----
  $('concept-list').innerHTML = concepts.map(function (c) {
    return '<div class="grid grid-cols-1 items-baseline gap-2 border-b border-line py-6 md:grid-cols-[minmax(0,4fr)_minmax(0,6fr)_minmax(0,2fr)] md:gap-8">' +
      '<h3 class="text-[clamp(20px,2vw,26px)] tracking-[-0.025em]">' + esc(c.title) + '</h3>' +
      '<p class="max-w-[52ch] text-muted">' + esc(c.text) + '</p>' +
      '<a class="justify-self-start whitespace-nowrap text-sm hover:text-blue md:justify-self-end" href="#m' + c.module + '" data-open="' + c.module + '">Module ' + pad(byId(c.module).no) + ' ' + icon.next + '</a></div>';
  }).join('');

  // ---- Study material: only the current level's links (plus links with no level) ----
  function renderMaterial() {
    var key = levels[level].key;
    $('material-intro').textContent = 'Reading for the ' + levels[level].name + ' level.';
    var cards = (window.COURSE.materials || []).map(function (c) {
      var items = c.items.filter(function (it) { return !it.level || it.level === key; });
      if (!items.length) return '';
      return '<div class="flex flex-col gap-4 rounded-md border border-line bg-card p-[22px]">' +
        '<div class="flex items-baseline justify-between gap-3"><h3 class="text-xl tracking-[-0.02em]">' + esc(c.name) + '</h3>' +
          '<span class="eyebrow">' + items.length + (items.length === 1 ? ' link' : ' links') + '</span></div>' +
        '<ul class="border-t border-line">' + items.map(function (it) {
          return '<li><a class="group flex items-start gap-3 border-b border-line py-3" href="' + esc(it.url) + '" target="_blank" rel="noopener">' +
            (it.img ? '<img class="aspect-video w-24 flex-none rounded-md bg-line object-cover" src="' + esc(it.img) + '" alt="" loading="lazy" width="640" height="360">' : '') +
            '<span class="grid min-w-0 flex-1 gap-0.5"><span class="leading-[1.35] group-hover:text-blue">' + esc(it.title) + '</span>' +
              (it.by ? '<span class="text-[13px] text-muted">' + esc(it.by) + '</span>' : '') +
            '</span>' + icon.arrow + '</a></li>';
        }).join('') + '</ul></div>';
    }).join('');
    $('material-list').innerHTML = cards ||
      '<p class="border border-dashed border-line px-5 py-[18px] text-[15px] text-muted sm:col-span-2 md:col-span-3">No reading for this level yet. See the full list for other levels.</p>';
  }

  // ---- Render and navigation ----
  // ---- Progress code: completed modules as a short code, e.g. DS-1EKF ----
  // Each module is one bit (module 1 = lowest bit), written in base 36.
  function encodeProgress() {
    var bits = 0;
    modules.forEach(function (m) { if (done[m.n]) bits += Math.pow(2, m.n - 1); });
    return 'DS-' + bits.toString(36).toUpperCase();
  }
  function decodeProgress(code) {
    var s = String(code || '').trim().toUpperCase().replace(/^DS-?/, '');
    if (!/^[0-9A-Z]{1,11}$/.test(s)) return null;
    var v = parseInt(s, 36);
    if (!isFinite(v) || v >= Math.pow(2, modules.length)) return null;
    return modules.filter(function (m) { return Math.floor(v / Math.pow(2, m.n - 1)) % 2 === 1; }).map(function (m) { return m.n; });
  }
  function restoreProgress(list) {
    list.forEach(function (n) { done[n] = true; });
    save();
    goToStart();
  }

  function render() {
    $('hero-level').textContent = levels[level].name;
    $('sync-code').textContent = encodeProgress();
    renderTrack();
    renderIndex();
    lesson.innerHTML = lessonHTML(byId(current));
    renderPractice();
    renderMaterial();
  }

  function showLock(i) {
    var b = blocker(i), note = $('lock-note');
    note.innerHTML = icon.lock + esc(levels[i].name) + ' is locked. Mark all ' + esc(levels[b].name) + ' modules complete to unlock it.';
    note.classList.remove('hidden');
    $('path').scrollIntoView({ block: 'nearest' });
  }

  function selectModule(n, scroll) {
    var m = byId(+n) || modules[0];
    var i = levelOf(m);
    if (!unlocked(i)) { showLock(i); return; }
    $('lock-note').classList.add('hidden');
    current = m.n;
    level = i;
    render();
    try { history.replaceState(null, '', '#m' + current); } catch (e) {}
    var idx = $('index'), a = idx.querySelector('[aria-current="true"]');
    if (a && idx.scrollWidth > idx.clientWidth) idx.scrollLeft = a.offsetLeft - idx.clientWidth / 2 + a.offsetWidth / 2;
    if (scroll || lesson.getBoundingClientRect().top < 0) player.scrollIntoView();
  }

  function firstOpenModule(i) {
    var ms = modsOf(i);
    for (var k = 0; k < ms.length; k++) if (!done[ms[k].n]) return ms[k].n;
    return ms[0].n;
  }

  function selectLevel(i, scroll) {
    if (!unlocked(i)) { showLock(i); return; }
    selectModule(firstOpenModule(i), scroll);
  }

  document.addEventListener('click', function (e) {
    var t;
    if ((t = e.target.closest('[data-open]'))) { e.preventDefault(); selectModule(t.getAttribute('data-open'), true); return; }
    if ((t = e.target.closest('[data-level]'))) { selectLevel(+t.getAttribute('data-level'), t.closest('#lesson') !== null); return; }
    if ((t = e.target.closest('#index [data-n]'))) { selectModule(t.getAttribute('data-n'), false); return; }
    if ((t = e.target.closest('[data-go]'))) { selectModule(t.getAttribute('data-go'), true); return; }
    if (e.target.closest('.complete')) {
      if (done[current]) delete done[current]; else done[current] = true;
      save();
      render();
    }
  });

  $('sync-copy').addEventListener('click', function () {
    var btn = this, code = encodeProgress();
    function done_(msg) { btn.textContent = msg; setTimeout(function () { btn.textContent = 'Copy'; }, 2000); }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code).then(function () { done_('Copied'); }, function () { done_('Select and copy'); });
    } else done_('Select and copy');
  });

  $('sync-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var input = $('sync-input'), status = $('sync-status');
    var list = decodeProgress(input.value);
    if (!list) { status.textContent = "That code doesn't look right. Check it and try again."; return; }
    restoreProgress(list);
    input.value = '';
    status.textContent = 'Progress restored: ' + Object.keys(done).length + ' of ' + modules.length + ' modules complete.';
  });

  // ---- Start: linked module if allowed, otherwise the furthest unlocked level ----
  function goToStart() {
    var start = levels.length - 1;
    while (start > 0 && !unlocked(start)) start--;
    current = firstOpenModule(start);
    level = start;
    $('lock-note').classList.add('hidden');
    render();
  }

  // A code in the address (?progress=DS-1EKF) is restored on arrival, then removed from the address
  var params = new URLSearchParams(location.search);
  var fromLink = params.has('progress') && decodeProgress(params.get('progress'));
  if (fromLink) {
    fromLink.forEach(function (n) { done[n] = true; });
    save();
  }
  if (params.has('progress')) {
    try { history.replaceState(null, '', location.pathname + location.hash); } catch (e) {}
  }

  var hash = /^#m(\d+)$/.exec(location.hash);
  var linked = hash && byId(+hash[1]);
  if (linked && unlocked(levelOf(linked))) {
    selectModule(linked.n, false);
    window.addEventListener('load', function () { player.scrollIntoView(); });
  } else {
    goToStart();
  }
})();
