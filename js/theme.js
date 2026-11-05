// Light / dark theme. Loaded in <head> without defer so the saved theme applies before the page paints.
// Light is the default; the choice is remembered in this browser.
(function () {
  var KEY = 'ds-course-theme';
  var root = document.documentElement;

  function saved() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function apply(theme) {
    root.classList.toggle('dark', theme === 'dark');
    var btn = document.getElementById('theme-toggle');
    if (btn) {
      var dark = theme === 'dark';
      btn.setAttribute('aria-pressed', dark ? 'true' : 'false');
      btn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
      btn.title = btn.getAttribute('aria-label');
    }
  }

  apply(saved() === 'dark' ? 'dark' : 'light');

  document.addEventListener('DOMContentLoaded', function () {
    apply(root.classList.contains('dark') ? 'dark' : 'light');
    document.getElementById('theme-toggle').addEventListener('click', function () {
      var next = root.classList.contains('dark') ? 'light' : 'dark';
      apply(next);
      try { localStorage.setItem(KEY, next); } catch (e) {}
    });
  });
})();
