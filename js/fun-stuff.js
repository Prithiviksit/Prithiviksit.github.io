(function () {
  'use strict';
  var list = document.querySelector('.fun-tabs');
  if (!list) return;
  var tabs = Array.prototype.slice.call(list.querySelectorAll('.fun-tab'));
  var panels = tabs.map(function (tab) { return document.querySelector(tab.getAttribute('href')); });
  list.setAttribute('role', 'tablist');
  tabs.forEach(function (tab, i) {
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', panels[i].id);
    panels[i].setAttribute('role', 'tabpanel');
    panels[i].setAttribute('aria-labelledby', tab.id);
    panels[i].tabIndex = 0;
  });
  function select(index, focus) {
    tabs.forEach(function (tab, i) {
      tab.setAttribute('aria-selected', String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
      panels[i].hidden = i !== index;
    });
    if (focus) tabs[index].focus();
  }
  function fromHash() {
    var index = panels.findIndex(function (panel) { return '#' + panel.id === window.location.hash; });
    if (index >= 0) select(index, false);
  }
  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function (event) { event.preventDefault(); select(i, false); });
    tab.addEventListener('keydown', function (event) {
      var next;
      if (event.key === 'ArrowRight') next = (i + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (i + tabs.length - 1) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (event.key === ' ') next = i;
      if (next !== undefined) { event.preventDefault(); select(next, true); }
    });
  });
  select(0, false);
  fromHash();
  window.addEventListener('hashchange', fromHash);
}());
