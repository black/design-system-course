// All study material, every level, with a level filter. Content comes from js/course-data.js.
(function () {
  var levels = window.COURSE.levels;
  var categories = window.COURSE.materials || [];
  var $ = function (id) { return document.getElementById(id); };

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  var arrow = '<span class="icon mt-0.5 flex-none text-[18px]" aria-hidden="true">arrow_outward</span>';

  var levelName = {};
  levels.forEach(function (l) { levelName[l.key] = l.name; });

  var all = [];
  categories.forEach(function (c) { all = all.concat(c.items); });
  function count(key) { return all.filter(function (it) { return !key || !it.level || it.level === key; }).length; }

  var filter = '';   // '' = all levels

  function renderFilter() {
    var opts = [{ key: '', name: 'All' }].concat(levels);
    $('level-filter').innerHTML = opts.map(function (o) {
      return '<button type="button" data-filter="' + o.key + '" aria-pressed="' + (o.key === filter) + '"' +
        ' class="rounded-md border border-line px-3.5 py-1.5 text-sm transition-colors hover:border-ink aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper">' +
        esc(o.name) + ' <span class="font-mono text-xs opacity-60">' + count(o.key) + '</span></button>';
    }).join('');
  }

  // One link: thumbnail, title and source, level tag, outward arrow
  function row(it) {
    var thumb = it.img
      ? '<img class="aspect-video w-full rounded-md bg-line object-cover" src="' + esc(it.img) + '" alt="" loading="lazy" width="640" height="360">'
      : '<span class="block aspect-video w-full rounded-md bg-line"></span>';
    var tag = it.level
      ? '<span class="rounded-md bg-blue-soft px-2.5 py-1 text-xs text-blue">' + esc(levelName[it.level] || it.level) + '</span>'
      : '<span class="text-xs text-muted">All levels</span>';
    return '<li><a class="group grid grid-cols-[112px_minmax(0,1fr)_auto] items-start gap-x-4 gap-y-2 border-b border-line py-4 sm:grid-cols-[176px_minmax(0,1fr)_120px_auto] sm:items-center" href="' + esc(it.url) + '" target="_blank" rel="noopener">' +
      '<span class="row-span-2 sm:row-span-1">' + thumb + '</span>' +
      '<span class="grid gap-0.5"><span class="text-[17px] leading-[1.35] group-hover:text-blue">' + esc(it.title) + '</span>' +
        (it.by ? '<span class="text-[13px] text-muted">' + esc(it.by) + '</span>' : '') + '</span>' +
      '<span class="col-start-2 row-start-2 justify-self-start sm:col-start-3 sm:row-start-1">' + tag + '</span>' +
      '<span class="col-start-3 row-start-1 sm:col-start-4">' + arrow + '</span>' +
      '</a></li>';
  }

  function renderList() {
    $('all-material').innerHTML = categories.map(function (c) {
      var items = c.items.filter(function (it) { return !filter || !it.level || it.level === filter; });
      var body = items.length
        ? '<ul class="border-t border-ink">' + items.map(row).join('') + '</ul>'
        : '<p class="border border-dashed border-line px-5 py-[18px] text-[15px] text-muted">' +
            (c.items.length ? 'Nothing at this level yet.' : 'Links coming soon.') + '</p>';
      return '<section class="grid gap-4">' +
        '<div class="flex items-baseline justify-between gap-3"><h2 class="text-[clamp(24px,2.4vw,32px)] tracking-[-0.03em]">' + esc(c.name) + '</h2>' +
          '<span class="eyebrow">' + items.length + (items.length === 1 ? ' link' : ' links') + '</span></div>' +
        body + '</section>';
    }).join('');
  }

  $('level-filter').addEventListener('click', function (e) {
    var b = e.target.closest('[data-filter]');
    if (!b) return;
    filter = b.getAttribute('data-filter');
    renderFilter();
    renderList();
  });

  renderFilter();
  renderList();
})();
